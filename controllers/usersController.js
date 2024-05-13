const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function createUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await model.createUser(username, hashedPassword);
        return user;
    } catch (err) {
        throw err;
    }
}

async function logIn(userName, password) {
    try {
        const user = await model.logIn(userName, password);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return user;
            }
        }
        else {
            return null;
        }
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

async function getUserForSignup(id) {
    try {
        return model.getUserForSignup(id);
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
async function updateUser(id, name, username, email, city, street, zipcode, phone) {
    try {

        return model.updateUser(id, name, username, email, city, street, zipcode, phone);
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, getUsers, getUser, deleteUser, updateUser, logIn, getUserForSignup }