/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import * as TodoController from '../controllers/todos.controller'
    const router=Router()
    
//import { validate } from '../utils/validate'
import { createPostTodo } from '../validators/createpost.validator'
import { getTodoById } from '../validators/createpost.validator'
import { deleteTodoById } from '../validators/createpost.validator'
import { updateTodoById  ,updateTodoByBody } from '../validators/createpost.validator'
import { validate, validateById } from '../utils/validate'


//POST todos 
router.post('/', validate(createPostTodo), TodoController.postTodos);

//GET todos by id
router.get("/:id",validateById(getTodoById), TodoController.getTodos )

//DELETE todos by id
router.delete('/:id',validateById(deleteTodoById),TodoController.deleteTodos)

//UPDATE todos
router.put('/:id',validateById(updateTodoById),validate(updateTodoByBody), TodoController.updateTodo)

export default router