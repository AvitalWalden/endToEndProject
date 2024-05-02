const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/usersController');
const { createAddress, getAddresses, getAddress, deleteAddress, updateAddress } = require('../controllers/addressesController');

router.get("/", async (req, res) => {
    const users = await getUsers();
    const addresses= await getAddress();
    const usersWithAddress = users.map(user => {
        const userAddress = addresses.find(address => address.id === user.address_id);
        return {
            ...user,
            address: userAddress ? userAddress.address : 'Address not found'
        };
    });
    res.send(usersWithAddress);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    const address= await getAddress(address_id);
    res.send({...user, ...address});
});

router.post("/", async (req, res) => {
    try {
        const addressResponse = await createAddress(req.body.street, req.body.city, req.body.zipcode);
        const response = await createUser(req.body.name, req.body.username, req.body.email, addressResponse.id, req.body.phone);

        res.send(await getUser(response.insertId));
    } catch (err) {
        console.log("Error")
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const addressResponse = await createAddress(req.body.street, req.body.city, req.body.zipcode);
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, addressResponse.id, req.body.phone)
    res.send(await getUser(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user=await getUser(id);
    const responseAddress = await deleteAddress(user.address_id);
    const response = await deleteUser(id);
    res.send();
});

module.exports = router