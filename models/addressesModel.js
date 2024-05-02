const pool = require('../DB.js');

async function getAddresses() {
    try {
      const sql = 'SELECT * FROM addresses';
  
      const [rows, fields] = await pool.query(sql);
      console.log(rows);
  
      return rows;
    } catch (err) {
      console.log(err);
    }
  
  }
  
  async function getAddress(id) {
    try {
      const sql = 'SELECT * FROM addresses where id=?';
  
      const result = await pool.query(sql, [id]);
  
      return result[0][0];
  
    } catch (err) {
      console.log(err);
    }
  }
  

  async function createAddress(city, street, zipcode) {
    try {
      const sql = "INSERT INTO addresses (`city`, `street`,`zipcode`) VALUES(?, ?, ?)";
      ;
  
      const result = await pool.query(sql,[city, street, zipcode]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAddress(id) {
    try {
      const sql = `DELETE FROM addresses WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting address:', err);
      throw err;
    }
  }
  async function updateAddress(id, city, street, zipcode) {
    try {
      const sql = `UPDATE addresses SET city = ?, street = ?, zipcode = ? WHERE id = ?`;
      const result = await pool.query(sql, [city, street, zipcode, id]);
      return result;
    } catch (err) {
      console.error('Error updating address:', err);
      throw err;
    }
  }

  module.exports = {updateAddress, getAddresses, getAddress, deleteAddress, createAddress} 