const model = require('../models/usersModel');
const bcrypt = require('bcrypt');


// async function createUser(username, password) {
//     try {
//         let newpassword = password;
//         await bcrypt.hash(password, 10, function (err, hashedPassword) {
//             newpassword = hashedPassword;
//             console.log("fdd          "+newpassword)
//             if (err) {
//                 console.error("שגיאה בזמן הצפנת הסיסמה:", err);
//                 return;
//             }
//         });
//         console.log(newpassword)
//         const user = await model.createUser(username, newpassword);
//         console.log(user);

//         return user;
//         // return model.createUser(name, username, email, city, street, zipcode, phone, password);
//     } catch (err) {
//         throw err;
//     }

// }


async function createUser(username, password) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await model.createUser(username, hashedPassword);

        console.log(user);
        return user;
    } catch (err) {
        throw err;
    }
}

async function logIn(userName, password) {
    try {
        const users = model.logIn(userName, password);
        for (const user of users) {
            if (bcrypt.compareSync(password, user.password)) {
                return user;
            }
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
async function updateUser(id, name, username, email, address_id, city, street, zipcode, phone) {
    try {

        return model.updateUser(id, name, username, email, address_id, city, street, zipcode, phone);
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, getUsers, getUser, deleteUser, updateUser, logIn, getUserForSignup }