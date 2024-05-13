const express = require("express");
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { logIn, getUser } = require('../controllers/usersController');
router.use(cors());

router.post("/", async (req, res) => {
    try {
        const userName = req.body.username;
        const password = req.body.password;
        let user = await logIn(userName, password);
        userLogIn = await getUser(user.id);
        delete userLogIn.address_id;
        res.send(userLogIn);
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ error: err });    }

});

module.exports = router;