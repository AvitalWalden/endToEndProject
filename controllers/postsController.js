const model = require('../models/postsModel');

async function createPost(user_id, title, body) {
    try {
        return model.createPost(user_id, title, body);
    } catch (err) {
        throw err;
    }

}

async function getPostsByUserID(id) {
    try {
        console.log("ukjkgh")
        return model.getPostsByUserID(id);
    } catch (err) {
        throw err;
    }

}

async function getPosts() {
    try {
        return model.getPosts();
    } catch (err) {
        throw err;
    }

}
async function getPost(id) {
    try {
        return model.getPost(id);
    } catch (err) {
        throw err;
    }
}

async function deletePost(id) {
    try {
        return model.deletePost(id);
    } catch (err) {
        throw err;
    }
}
async function updatePost(id, user_id, title, body) {
    try {
        return model.updatePost(id, user_id, title, body);
    } catch (err) {
        throw err;
    }
}
module.exports = { createPost, getPosts, getPost , deletePost, updatePost,getPostsByUserID}