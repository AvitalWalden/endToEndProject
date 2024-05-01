const model = require('../models/todosModel');

async function createTodo(user_id, title, completed) {
    try {
        return model.createTodo(user_id, title, completed);
    } catch (err) {
        throw err;
    }

}

async function getTodos() {
    try {
        return model.getTodos();
    } catch (err) {
        throw err;
    }

}

async function getTodo(id) {
    try {
        return model.getTodo(id);
    } catch (err) {
        throw err;
    }
}

async function deleteTodo(id) {
    try {
        return model.deleteTodo(id);
    } catch (err) {
        throw err;
    }
}
async function updateTodo(id, user_id, title, completed) {
    try {
        return model.updateTodo(id, user_id, title, completed);
    } catch (err) {
        throw err;
    }
}
module.exports = { createTodo, getTodos, getTodo , deleteTodo, updateTodo}