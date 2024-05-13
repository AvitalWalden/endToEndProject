const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createComment, getComments, getComment, deleteComment, updateComment } = require('../controllers/commentsController');
const { getPost } = require('../controllers/postsController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const post_id = req.query.postId;
        res.send(await getComments(post_id));
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
        const comment = await getComment(id);
        res.send(comment);
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await createComment(req.body.post_id, req.body.name, req.body.email, req.body.body);
        res.send(await getComment(response.insertId));
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
        await updateComment(id, req.body.name, req.body.body);
        res.send(await getComment(id));
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
        await deleteComment(id);
        res.send();
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router