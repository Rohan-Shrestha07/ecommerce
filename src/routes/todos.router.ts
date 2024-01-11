/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as TodoController from '../controllers/todos.controller'
    const router=Router()

//GET todos by id
router.get("/:id", TodoController.getTodos )

//POST todos 
router.post('/', TodoController.postTodos)

//DELETE todos by id
router.delete('/:id',TodoController.deleteTodos)

//UPDATE todos
router.put('/:id', TodoController.updateTodo)

export default router