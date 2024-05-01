const pool = require('../DB.js');

async function getTodos() {
    try {
      const sql = 'SELECT * FROM todos';
  
      const [rows, fields] = await pool.query(sql);
      console.log(rows);
  
      return rows;
    } catch (err) {
      console.log(err);
    }
  
  }
  
  async function getTodo(id) {
    try {
      const sql = 'SELECT * FROM todos where id=?';
  
      const result = await pool.query(sql, [id]);
  
      return result[0][0];
  
    } catch (err) {
      console.log(err);
    }
  }
  

  async function createTodo(user_id, title, completed) {
    try {
      const sql = "INSERT INTO branches (`user_id`, `title`,`completed`) VALUES(?, ?, ?)";
      ;
  
      const result = await pool.query(sql,[user_id, title, completed]);
  
      return result[0];
  
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTodo(id) {
    try {
      const sql = `DELETE FROM todos WHERE id = ?`;
      const result = await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  }
  async function updateTodo(user_id, title, completed) {
    try {
      const sql = `UPDATE todos SET user_id = ?, title = ? WHERE completed = ?`;
      const result = await pool.query(sql, [user_id, title, completed]);
      return result;
    } catch (err) {
      console.error('Error updating todo:', err);
      throw err;
    }
  }

  module.exports = {updateTodo, getTodos, getTodo, deleteTodo, createTodo} 