const express = require("express");
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUsers, getUser, deleteUser, updateUser, logIn, getUserForSignup } = require('../controllers/usersController');
const { getPosts, deletePost } = require('../controllers/postsController');
const { getTodos, deleteTodo } = require('../controllers/todosController');
router.use(cors());

// router.get("/", async (req, res) => {
//     const users = await getUsers();
//     const usersWithOutAddress_id = users.map(user => {
//         delete user.address_id;
//         return {
//             ...user,
//         };
//     });
//     res.send(usersWithOutAddress_id);
// })

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    delete user.address_id;
    res.send(user);
});

// router.get("/", async (req, res) => {
//     const userName = req.query.userName;
//     const password = req.query.password;
//     let user = await logIn(userName, password);
//     if (!user) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.json({});
//     }
//     userLogIn = await getUser(user.id);
//     delete userLogIn.address_id;
//     res.send(userLogIn);
//     // else{
//     //     res.status(404).send({});
//     // }

// });


router.post("/", async (req, res) => {
    try {

        const response = await createUser(req.body.username, req.body.password);
        console.log(response.insertId);
        const newUser = await getUserForSignup(response.insertId);
        res.send(newUser);
    } catch (err) {
        console.log(err)
        res.status(500).send();
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, user.address_id, req.body.city, req.body.street, req.body.zipcode, req.body.phone);
    const userAfterChange = await getUser(id);
    delete userAfterChange.address_id;
    res.send(userAfterChange);
});

module.exports = router