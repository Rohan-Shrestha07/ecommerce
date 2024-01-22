/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user.service'
import HttpStatusCode from 'http-status-codes'
import { User } from '@prisma/client'
import { RequestWithUserObject } from '../types'


 //get data
export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.get(next)
        res.json(users)
    } catch (e) {
        next(e)
    }
}

//post data
export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.create(req.body as User)
        res.status(HttpStatusCode.CREATED).json(user)
    } catch (e) {
        next(e)
    }
}
//delete data
export const deleteUser = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
const id:number = parseInt(req.params.id,10);
    try {
        await userService.remove(id)
        res.status(HttpStatusCode.NO_CONTENT).json({userService})
    } catch (e) {
        next(e)
    }
}

// export const getUserById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const response =await userService.getById(req.params.id)
//         res.json(response)
//     } catch (e) {
//         next(e)
//     }
// }
