const pool = require('../DB.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';

        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;

    } catch (err) {
        console.log(err);
    }

}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}

async function createUser(name, username, email, address_id, phone) {
    try {
        const sql = "INSERT INTO users (`name`, `username`, `email`,`address_id`, `phone`) VALUES(?, ?, ?, ?, ?)";

        const result = await pool.query(sql, [name, username, email, address_id, phone]);

        return result[0];

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

async function updateUser(id, name, username, email, address_id, phone) {
    try {
        const sql = `UPDATE users SET name = ?, username = ?, email = ?, address_id = ?, phone  = ? WHERE id = ?`;
        const result = await pool.query(sql, [name, username, email, address_id, phone, id]);
        return result;
    } catch (err) {
        console.error('Error updating branch:', err);
        throw err;
    }
}

module.exports = { updateUser, deleteUser, createUser, getUser, getUsers }