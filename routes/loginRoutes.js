const express = require("express");
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { logIn, getUser} = require('../controllers/usersController');
router.use(cors());

router.post("/", async (req, res) => {
    console.log("gyjftjth");

    const userName = req.body.userName;
    const password = req.body.password;
    let user = await logIn(userName, password);
    if (!user) {
        res.setHeader('Content-Type', 'application/json');
        return res.json({});
    }
    userLogIn = await getUser(user.id);
    delete userLogIn.address_id;
    res.send(userLogIn);
    // else{
    //     res.status(404).send({});
    // }

});

module.exports = router;
