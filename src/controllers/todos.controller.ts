/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextFunction,Request,Response} from "express"
import * as TodosService from '../services/todos.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTodos =(req:Request,res:Response,next:NextFunction)=>{
    const response =TodosService.getTodos()
    res.send(response)
}

export const hari =(req:Request,res:Response,next:NextFunction)=>{
    const response =TodosService.createPost(req.body)
    res.send(response)
}

