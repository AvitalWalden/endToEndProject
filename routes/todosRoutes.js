const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { createTodo, getTodos, getTodo, deleteTodo, updateTodo } = require('../controllers/todosController');
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const user_id = req.query.userId;
        res.send(await getTodos(user_id));
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
        const todo = await getTodo(id);
        res.send(todo)
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await createTodo(req.body.user_id, req.body.title, req.body.completed)
        res.send(await getTodo(response.insertId));
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
        await updateTodo(id, req.body.user_id, req.body.title, req.body.completed)
        res.send(await getTodo(id));
    } catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }

});

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        await deleteTodo(id);
        res.send();
    }catch (err) {
        const error = {
            message: err.message
        }
        res.status(500).send(error);
    }
});

module.exports = router