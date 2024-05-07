const model = require('../models/usersModel');
// const bcrypt = require('bcrypt');


async function createUser(name, username, email, city, street, zipcode, phone, password) {
    try {
        // bcrypt.hash(password, 10, function(err, hashedPassword) {
        //     if (err) {
        //         console.error("שגיאה בזמן הצפנת הסיסמה:", err);
        //         return;
        //     }
        //     return model.createUser(name, username, email, city, street, zipcode, phone, hashedPassword);
        // });
        return model.createUser(name, username, email, city, street, zipcode, phone, password);
    } catch (err) {
        throw err;
    }

}

async function logIn(userName,password) {
    try {
        return model.logIn(userName,password);
        
    } catch (err) {
        throw err;
    }

}

async function getUsers() {
    try {
        return model.getUsers();
    } catch (err) {
        throw err;
    }

}

async function getUser(id) {
    try {
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
}

async function deleteUser(id) {
    try {
        return model.deleteUser(id);
    } catch (err) {
        throw err;
    }
}
async function updateUser(id, name, username, email,address_id, city, street, zipcode, phone) {
    try {

        return model.updateUser(id, name, username, email, address_id, city, street, zipcode, phone);
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, getUsers, getUser , deleteUser, updateUser, logIn}