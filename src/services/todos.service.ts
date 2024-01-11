/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const getTodos =()=>{
    return [
        {
            id:232435,
            title:'do something'
        }
    ]
}


import { PrismaClient } from "@prisma/client";
//import Boom from '@hapi/Boom'

const prisma = new PrismaClient()

export const createPost = async (body: any)=>{
    const {title,status}=body
    return await prisma.todo.create({
        data:{
            title,
            status
        }
    })
}