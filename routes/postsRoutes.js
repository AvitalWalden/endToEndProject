const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/postsController');
const { getComments, deleteComment } = require('../controllers/commentsController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const user_id = req.query.userId;
        if (!user_id) {
            res.send(await getPosts());
        }
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await getPost(id);
        res.send(post);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await createPost(req.body.user_id, req.body.title, req.body.body)
        res.send(await getPost(response.insertId));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await updatePost(id, req.body.user_id, req.body.title, req.body.body)
        res.send(await getPost(id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const comments = await getComments(id);
        const postsComments = comments.filter(comment => comment.post_id === parseInt(id));
        for (const comment of postsComments) {
            await deleteComment(comment.id);
        }
        await deletePost(id);
        res.send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router