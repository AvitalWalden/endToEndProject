const express = require("express");
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createUser, getUser, updateUser, getUserForSignup } = require('../controllers/usersController');
router.use(cors());

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    delete user.address_id;
    res.send(user);
});


router.post("/", async (req, res) => {
    try {
        const response = await createUser(req.body.username, req.body.password);
        const newUser = await getUserForSignup(response.insertId);
        res.send(newUser);
    } catch (err) {
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    const response = await updateUser(id, req.body.name, req.body.username, req.body.email, req.body.city , req.body.street, req.body.zipcode, req.body.phone);
    const userAfterChange = await getUser(id);
    delete userAfterChange.address_id;
    res.send(userAfterChange);
});

module.exports = router