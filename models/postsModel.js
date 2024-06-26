const pool = require('../DB.js');

async function getPostsByUserID(id) {
    try {
      const sql = 'SELECT * FROM posts where user_id =?';
      const result = await pool.query(sql,[id]);
      return result[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function getPosts() {
    try {
      const sql = 'SELECT * FROM posts';
      const [rows, fields] = await pool.query(sql);  
      return rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  
  }
  
  async function getPost(id) {
    try {
      const sql = 'SELECT * FROM posts where id=?';
      const result = await pool.query(sql, [id]);
      return result[0][0];
    } catch (err) {
      console.log(err); 
      throw err;
    }
  }
  
  async function createPost(user_id, title, body) {
    try {
      const sql = "INSERT INTO posts (`user_id`, `title`,`body`) VALUES(?, ?, ?)";
      const result = await pool.query(sql,[user_id, title, body]);
      return result[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function deletePost(id) {
    try {
      const sql = `DELETE FROM posts WHERE id = ?`;
      await pool.query(sql, [id]);
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  }
  async function updatePost(id, user_id, title, body) {
    try {
      const sql = `UPDATE posts SET user_id = ?, title = ?, body = ? WHERE id = ?`;
      const result = await pool.query(sql, [user_id, title, body, id]);
      return result;
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  }

  module.exports = {updatePost, getPosts, getPost, deletePost, createPost,getPostsByUserID} 