const pool = require('../DB.js');

async function getComments(post_id) {
  try {
    const sql = 'SELECT * FROM comments where post_id=?';
    const result = await pool.query(sql, [post_id]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }

}

async function getComment(id) {
  try {
    const sql = 'SELECT * FROM comments where id=?';
    const result = await pool.query(sql, [id]);
    return result[0][0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createComment(post_id, name, email, body) {
  try {
    const sql = "INSERT INTO comments (`post_id`, `name`, `email`,`body`) VALUES(?, ?, ?, ?)";
    const result = await pool.query(sql, [post_id, name, email, body]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteComment(id) {
  try {
    const sql = `DELETE FROM comments WHERE id = ?`;
    await pool.query(sql, [id]);
  } catch (err) {
    console.error('Error deleting comment:', err);
    throw err;
  }
}

async function updateComment(id, name, body) {
  try {
    const sql = `UPDATE comments SET name = ?, body = ? WHERE id = ?`;
    const result = await pool.query(sql, [name, body, id]);
    return result;
  } catch (err) {
    console.error('Error updating comment:', err);
    throw err;
  }
}

module.exports = { updateComment, getComment, getComments, deleteComment, createComment } 