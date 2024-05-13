const pool = require('../DB.js');

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users natural join addresses where users.id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function getUserForSignup(id) {
    try {
        const sql = 'SELECT * FROM users where id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function createUser(username, password) {
    try {
        const sql = "INSERT INTO users (`username`) VALUES( ?)";
        const result = await pool.query(sql, [username]);
        const id = result[0].insertId;
        const sqlPassword = "INSERT INTO passwords (`id`,`password`) VALUES(?,?)";
        await pool.query(sqlPassword, [id, password]);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function logIn(userName) {
    try {
        const sql = 'SELECT * FROM users natural join passwords where username=?';
        const result = await pool.query(sql, [userName]);
        return result[0][0];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function updateUser(id, name, username, email, city, street, zipcode, phone) {
    try {
        const sqlAddress = "INSERT INTO addresses (`city`, `street`,`zipcode`) VALUES(?, ?, ?)";
        const resultAddress = await pool.query(sqlAddress, [city, street, zipcode]);
        const address_id = resultAddress[0].insertId;
        const sql = `UPDATE users SET name = ?, username = ?, email = ?, address_id = ?, phone  = ? WHERE id = ?`;
        const result = await pool.query(sql, [name, username, email, address_id, phone, id]);
        return result;
    } catch (err) {
        console.error('Error updating branch:', err);
        throw err;
    }
}

module.exports = { updateUser, createUser, getUser, logIn, getUserForSignup }