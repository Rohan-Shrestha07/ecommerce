/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import { PrismaClient } from "@prisma/client";
//import Boom from '@hapi/Boom'

const prisma = new PrismaClient()

//GET todos
export const getTodos = async (id:any) => {
    return await prisma.todo.findUnique({
        where:{
            id: Number(id),
        },
    })
    
}

//POST todos
export const createPost = async (body: any)=>{
    const {title,status}=body
    return await prisma.todo.create({
        data:{
            title,
            status
        },
    })
}
//DELETE todos
export const deletePost = async (id: any)=>{
    return await prisma.todo.delete({
        where:{
            id:Number(id),
            
        },
    })
}

//UPDATE by id
export const updateTodo = async (id: any, body: any) => {
    const { title, status } = body
    return await prisma.todo.update({
        where: { id: Number(id) },
        data: {
            title: title,
            status: status,
        },
    })
}