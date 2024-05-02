const model = require('../models/commentsModel');

async function createComment(post_id, name, email, body) {
    try {
        return model.createComment(post_id, name, email, body);
    } catch (err) {
        throw err;
    }
}

async function getComments() {
    try {
        return model.getComments();
    } catch (err) {
        throw err;
    }

}

async function getComment(id) {
    try {
        return model.getComment(id);
    } catch (err) {
        throw err;
    }
}

async function deleteComment(id) {
    try {
        return model.deleteComment(id);
    } catch (err) {
        throw err;
    }
}
async function updateComment(id, post_id, name, email, body) {
    try {
        return model.updateComment(id, post_id, name, email, body);
    } catch (err) {
        throw err;
    }
}
module.exports = { createComment, getComments, getComment , deleteComment, updateComment}