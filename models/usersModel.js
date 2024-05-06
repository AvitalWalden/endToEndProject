const pool = require('../DB.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users JOIN addresses ON users.address_id = addresses.id';
        const [rows, fields] = await pool.query(sql);
        return rows;

    } catch (err) {
        console.log(err);
    }

}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users JOIN addresses ON users.address_id = addresses.id  where users.id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}

async function createUser(name, username, email, city, street, zipcode, phone, password) {
    try {
        const sqlAddress = "INSERT INTO addresses (`city`, `street`,`zipcode`) VALUES(?, ?, ?)";
        const resultAddress = await pool.query(sqlAddress, [city, street, zipcode]);
        const address_id = resultAddress[0].insertId;
        const sqlPassword = "INSERT INTO passwords (password) VALUES(?)";
        const newPassword = await pool.query(sqlPassword, [password]);
        const sql = "INSERT INTO users (`name`, `username`, `email`,`address_id`, `phone`) VALUES(?, ?, ?, ?, ?)";
        const result = await pool.query(sql, [name, username, email, address_id, phone]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function logIn(userName, password) {
    try {
        const sql = 'SELECT * FROM users natural join passwords where username=? AND password=?';
        const result = await pool.query(sql, [userName, password]);
        //if(bcrypt.compare(password, result[0][0].password))
        // if (!result[0][0]) {
        //     return [];
        // }

        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}


async function deleteUser(id) {
    try {
        const sql = `DELETE FROM users WHERE id = ?`;
        const result = await pool.query(sql, [id]);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}

async function updateUser(id, name, username, email, address_id, city, street, zipcode, phone) {
    try {
        const sqlAddress = `UPDATE addresses SET city = ?, street = ?, zipcode = ? WHERE id = ?`;
        const resultAddress = await pool.query(sqlAddress, [city, street, zipcode, address_id]);
        const sql = `UPDATE users SET name = ?, username = ?, email = ?, address_id = ?, phone  = ? WHERE id = ?`;
        const result = await pool.query(sql, [name, username, email, address_id, phone, id]);
        return result;
    } catch (err) {
        console.error('Error updating branch:', err);
        throw err;
    }
}

module.exports = { updateUser, deleteUser, createUser, getUser, getUsers, logIn }