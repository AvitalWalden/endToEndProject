const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createPost, getPosts, getPost, deletePost, updatePost } = require('../controllers/postsController');

router.get("/", async (req, res) => {
    res.send(await getPosts());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await getPost(id);
    res.send(post)
});

router.post("/", async (req, res) => {
    try {
        const response = await createPost(req.body.user_id, req.body.title, req.body.body)
        res.send(await getPost(response.insertId));
    } catch (err) {
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await updatePost(id, req.body.user_id, req.body.title, req.body.body)
    res.send(await getPost(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deletePost(id);
    res.send();
});

module.exports = router