const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/postsController');
const { getComments, deleteComment } = require('../controllers/commentsController');
const { getUser } = require("../controllers/usersController");
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    const user_id = req.query.userId;
    if (!user_id) {
        res.send(await getPosts());
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await getPost(id);
    res.send(post)
});

router.post("/", async (req, res) => {
    try {
        if (getUser(req.body.user_id) === null)
            throw new Error("user doesn't exist");
        const response = await createPost(req.body.user_id, req.body.title, req.body.body)
        res.send(await getPost(response.insertId));
    } catch (err) {
        return err;
    }
});

router.put("/:id", async (req, res) => {
    if (getUser(req.body.user_id) === null)
        throw new Error("user doesn't exist");
    const id = req.params.id;
    await updatePost(id, req.body.user_id, req.body.title, req.body.body)
    res.send(await getPost(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const comments = await getComments(id);
    const postsComments = comments.filter(comment => comment.post_id === parseInt(id));
    for (const comment of postsComments) {
        await deleteComment(comment.id);
    }
    await deletePost(id);
    res.send();
});

module.exports = router