/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'

//POST
export const createPostTodo = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        status: z.string({
            required_error: 'status is required',
        }),
        
    }),
})

//GET
export const getTodoById = z.object({
    params: z.object({
        id: z.string().refine((value) => !isNaN(Number(value)), {
            message: 'ID must be a number',
        }),
    }),
})

//DELETE
export const deleteTodoById = z.object({
    params: z.object({
        id: z.string().refine((value) => !isNaN(Number(value)), {
            message: 'ID must be a number',
        }),
    }),
})

//UPDATE
export const updateTodoById = z.object({
    params: z.object({
        id: z.string().refine((value) => !isNaN(Number(value)), {
            message: 'ID must be a number',
        }),
    }),
})

export const updateTodoByBody = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title must be a string' }),
        status: z.enum(['completed', 'ongoing']),
    }),
})