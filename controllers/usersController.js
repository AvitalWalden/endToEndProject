const model = require('../models/usersModel');

async function createUser(name, email, street, city, zipcode, phone) {
    try {
        return model.createUser(name, username, email, street, city, zipcode, phone);
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
async function updateUser(id, name, username, email, street, city, zipcode, phone) {
    try {
        return model.updateUser(id, name, username, email, street, city, zipcode, phone);
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, getUsers, getUser , deleteUser, updateUser}