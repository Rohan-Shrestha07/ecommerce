/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction,Request,Response} from "express"
import * as TodosService from '../services/todos.service'

//POST todos 
export const postTodos =async (req:Request,res:Response,next:NextFunction)=>{
    const response =await TodosService.postTodo(req.body)
    res.send(response)
}

//GET todos by id
export const getTodos =async (req:Request,res:Response,next:NextFunction)=>{
   try{
    const response =await TodosService.getTodo(req.params.id)
    res.json(response)
   } 
   catch(err){
       next(err)
   }
}


//DELETE todos by id
export const deleteTodos =async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const response = await TodosService.deletePost(req.params.id)
        res.json(response)
    }
    catch(err){
        next(err)
    }
}

//UPDATE by id
export const updateTodo = async ( req: Request,res: Response,next: NextFunction) => {
   try{
    const response = await TodosService.updateTodo(req.params.id, req.body)
    res.json(response)
   } 
   catch(err){
    next(err)
   }
}

