const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUsers, getUser, deleteUser, updateUser } = require('../controllers/usersController');

router.get("/", async (req, res) => {
    res.send(await getUsers());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user)
});

router.post("/", async (req, res) => {
    try {
        const response = await createUser(req.body.name, req.body.username, req.body.email, req.body.street, req.body.city, req.body.zipcode, req.body.phone)
        res.send(await getUser(response.insertId));
    } catch (err) {
        console.log("Error")
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, req.body.street, req.body.city, req.body.zipcode, req.body.phone)
    res.send(await getUser(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteUser(id);
    res.send();
});

module.exports = router