/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction,Request,Response} from "express"
import * as TodosService from '../services/todos.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

//GET todos by id
export const getTodos =async (req:Request,res:Response,next:NextFunction)=>{
    const response =await TodosService.getTodos(req.params.id)
    res.json(response)
}

//POST todos 
export const postTodos =async (req:Request,res:Response,next:NextFunction)=>{
    const response =await TodosService.createPost(req.body)
    res.json(response)
}

//DELETE todos by id
export const deleteTodos =async (req:Request,res:Response,next:NextFunction)=>{
    const response = await TodosService.deletePost(req.params.id)
    res.json(response)
}
//UPDATE by id
export const updateTodo = async ( req: Request,res: Response,next: NextFunction) => {
    const response = await TodosService.updateTodo(req.params.id, req.body)
    res.json(response)
}

