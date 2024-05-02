const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../controllers/todosController');

router.get("/", async (req, res) => {
    res.send(await getTodos());
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await getTodo(id);
    res.send(todo)
});

router.post("/", async (req, res) => {
    try {
        if (getUser(req.body.user_id) === null)
            throw new Error("user doesn't exist");

        const response = await createTodo(req.body.user_id, req.body.title, req.body.completed)
        res.send(await getTodo(response.insertId));
    } catch (err) {
        //res.sendFile(path.join(__dirname, '../public', 'error.html'));
    }
});

router.put("/:id", async (req, res) => {
    if (getUser(req.body.user_id) === null)
        throw new Error("user doesn't exist");

    const id = req.params.id;
    const response = await updateTodo(id, req.body.user_id, req.body.title, req.body.completed)
    res.send(await getTodo(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await deleteTodo(id);
    res.send();
});

module.exports = router