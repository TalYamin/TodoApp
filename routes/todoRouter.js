const express = require("express");
const router = express.Router()
const TodoService = require("../services/todoService");
const todoService = new TodoService();
const ValidationService = require("../services/validationService");
const validationService = new ValidationService();


router.get("/health", (req, res) => {
    res.status(200).send("OK");
});

router.post("/", (req, res) => {
    const todoInfo = req.body;
    const isExist = todoService.verifyIfTodoIsExistByTitle(todoInfo.title);
    const isValidDate = todoService.verifyIsValidDate(todoInfo.dueDate);
    if (!isExist && isValidDate) {
        const newId = todoService.createNewTodo(todoInfo);
        res.status(200).send({ result: newId });
    }
    else if (isExist) {
        res.status(409).send({ errorMessage: `Error: TODO with the title [${todoInfo.title}] already exists in the system` });
    } else if (!isValidDate) {
        res.status(409).send({ errorMessage: "Error: Can't create new TODO that its due date is in the past" });
    }
});


router.get("/size", (req, res) => {
    const filter = req.query.status;
    const isValid = validationService.validateFilter(filter);
    if (isValid) {
        const size = todoService.countTodoByFilter(filter);
        res.status(200).send({ result: size });
    }
    else {
        res.sendStatus(400);
    }
});


router.get("/content", (req, res) => {

    const filter = req.query.status;
    const sortBy = req.query.sortBy;

    const isValidFilter = validationService.validateFilter(filter);
    const isValidSortBy = validationService.validateSortBy(sortBy);

    if (isValidFilter && isValidSortBy) {
        const filteredTodos = todoService.getAllTodosByFilter(filter);
        const sortedTodos = todoService.sortTodosBy(filteredTodos, sortBy);
        res.status(200).send({result: sortedTodos});
    }
    else {
        res.sendStatus(400);
    }

});

router.put("/", (req, res) => {
    const todoId = Number(req.query.id);
    const statusToUpdate = req.query.status;

    const isExist = todoService.verifyIfTodoIsExistByID(todoId);
    const isValidStatus = validationService.validateStatus(statusToUpdate);


    if (isExist && isValidStatus) {
        const oldStatus = todoService.getStatusByTodoId(todoId);
        todoService.updateTodoStatusById(todoId, statusToUpdate);
        res.status(200).send({ result: oldStatus });
    } else if (!isExist) {
        res.status(404).send({ errorMessage: `Error: no such TODO with id ${req.query.id}` });
    } else if (!isValidStatus) {
        res.sendStatus(400);
    }
});


router.delete("/", (req, res) => {
    const todoId = Number(req.query.id);
    const isExist = todoService.verifyIfTodoIsExistByID(todoId);
    
    if (isExist) {
        const newSize = todoService.deleteTodoById(todoId);
        res.status(200).send({ result: newSize });
    } else if (!isExist) {
        res.status(404).send({ errorMessage: `Error: no such TODO with id ${req.query.id}` });
    }
});

module.exports = router