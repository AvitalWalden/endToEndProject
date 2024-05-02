const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/usersController');
const { createAddress, getAddresses, getAddress, deleteAddress, updateAddress } = require('../controllers/addressesController');
const { createPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/postsController');
const { createTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../controllers/todosController');



router.get("/", async (req, res) => {
    const users = await getUsers();
    const addresses = await getAddresses();
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
    const address = await getAddress(address_id);
    res.send({ ...user, ...address });
});

router.post("/", async (req, res) => {
    try {
        const addressResponse = await createAddress(req.body.city, req.body.street, req.body.zipcode);
        const response = await createUser(req.body.name, req.body.username, req.body.email, addressResponse.id, req.body.phone);

        res.send(await getUser(response.insertId));
    } catch (err) {
        console.log("Error")
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const addressResponse = await updateAddress(req.body.city, req.body.street, req.body.zipcode);
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, addressResponse.id, req.body.phone)
    res.send(await getUser(id));
});

router.delete("/:id", async (req, res) => {


    const id = req.params.id;

    const user = await getUser(id);

    //delete the posts of this user
    const posts = await getPosts();
    const usersPosts = posts.filter(post => post.user_id === id);

    for (const post of usersPosts) {
        await deletePost(post.id);
    }

    //delete the todos of this user
    const todos = await getTodos();
    const usersTodos = todos.filter(todo => todo.user_id === id);

    for (const todo of usersTodos) {
        await deleteTodo(todo.id);
    }


    const responseAddress = await deleteAddress(user.address_id);
    const response = await deleteUser(id);
    res.send();
});

module.exports = router