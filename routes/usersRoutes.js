const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/usersController');
const { createAddress, getAddresses, getAddress, deleteAddress, updateAddress } = require('../controllers/addressesController');
const { getPosts, deletePost } = require('../controllers/postsController');
const { getTodos, deleteTodo } = require('../controllers/todosController');


router.get("/", async (req, res) => {
    const users = await getUsers();
    const addresses = await getAddresses();
    const usersWithAddress = users.map(user => {
        const userAddress = addresses.find(address => address.id === user.address_id);
        delete user.address_id;
        delete userAddress.id;

        return {
            ...user,
            address: { ...userAddress }
        };
    });
    res.send(usersWithAddress);
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    const address = await getAddress(user.address_id);
    delete user.address_id;
    delete address.id;
    res.send({ ...user, address: { ...address } });
});

router.post("/", async (req, res) => {
    try {
        const addressResponse = await createAddress(req.body.address.city, req.body.address.street, req.body.address.zipcode);
        const response = await createUser(req.body.name, req.body.username, req.body.email, addressResponse.insertId, req.body.phone);
        res.send(await getUser(response.insertId));
    } catch (err) {
        console.log("Error")
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {

    const id = req.params.id;
    const user = await getUser(id);
    const addressResponse = await updateAddress(user.address_id, req.body.address.city, req.body.address.street, req.body.address.zipcode);
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, user.address_id, req.body.phone);
    const userAfterChange = await getUser(id);
    const addressAfterChange = await getAddress(userAfterChange.address_id);
    delete userAfterChange.address_id;
    delete addressAfterChange.id;
    res.send({ ...userAfterChange, address: { ...addressAfterChange } });
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);

    //delete the todos of this user
    const todos = await getTodos();
    console.log(todos);

    const usersTodos = todos.filter(todo => todo.user_id === parseInt(id));
    console.log(usersTodos);
    for (const todo of usersTodos) {
        await deleteTodo(todo.id);
    }

    //delete the posts of this user
    const posts = await getPosts();
    const usersPosts = posts.filter(post => post.user_id === parseInt(id));
    for (const post of usersPosts) {
        await deletePost(post.id);
    }

    const response = await deleteUser(id);
    const responseAddress = await deleteAddress(user.address_id);
    res.send();
});

module.exports = router