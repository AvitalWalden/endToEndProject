const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createComment, getComments, getComment, deleteComment, updateComment } = require('../controllers/commentsController');

router.get("/", async (req, res) => {
    res.send(await getComments());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getComment(id);
    res.send(comment)
});

router.post("/", async (req, res) => {
    try {
        const response = await createComment(req.body.post_id, req.body.name,req.body.email, req.body.body)
        res.send(await getComment(response.insertId));
    } catch (err) {
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await updateComment(id, req.body.post_id, req.body.name,req.body.email, req.body.body)
    res.send(await getComment(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteComment(id);
    res.send();
});

module.exports = router