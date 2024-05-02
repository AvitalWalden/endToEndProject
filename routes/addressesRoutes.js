const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createAddress, getAddresses, getAddress, deleteAddress, updateAddress } = require('../controllers/addressesController');

router.get("/", async (req, res) => {
    res.send(await getAddresses());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const address = await getAddress(id);
    res.send(address)
});

router.post("/", async (req, res) => {
    try {
        const response = await createAddress(req.body.city, req.body.street, req.body.zipcode)
        res.send(await getAddress(response.insertId));
    } catch (err) {
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await updateAddress(id, req.body.city, req.body.street, req.body.zipcode)
    res.send(await getAddress(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteAddress(id);
    res.send();
});

module.exports = router