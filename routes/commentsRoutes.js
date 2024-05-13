const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createComment, getComments, getComment, deleteComment, updateComment } = require('../controllers/commentsController');
const {getPost } = require('../controllers/postsController');
const cors = require('cors'); 
router.use(cors());

router.get("/", async (req, res) => {
    const post_id = req.query.postId;
    res.send(await getComments(post_id));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getComment(id);
    res.send(comment)
});

router.post("/", async (req, res) => {
    try {
        if (getPost(req.body.post_id) === null)
            throw new Error("post doesn't exist");
        const response = await createComment(req.body.post_id, req.body.name, req.body.email, req.body.body)
        res.send(await getComment(response.insertId));
    } catch (err) {
        return err;
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    await updateComment(id, req.body.name, req.body.body)
    res.send(await getComment(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await deleteComment(id);
    res.send();
});

module.exports = router