/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Boom from '@hapi/boom'
import prisma from '../utils/prisma'
import { User } from '@prisma/client'
// import { exclude } from '../utils'
import { z } from 'zod'
import { updateUserSchema } from '../validators/user.validator'
import { NextFunction } from 'express'

//create by user
export const create = async (body: any) => {
    const { email, password, phone_number, is_admin } = body
    try {
        return await prisma.user.create({
            data: {
                email,
                password,
                phone_number,
                is_admin,
            },
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        }
        throw e
    }
}
//get by user
export const get = async (next: NextFunction) => {
    try {
        const users = await prisma.user.findMany()
        if (users.length > 0) {
            console.log('data found')
            return users
        } else {
            console.log('data not found')
        }
        // return users.map((user) => exclude(user, ['password']))
    } catch (err) {
        next(err)
    }
}
// export const get = async () => {
//     const users = await prisma.user.findMany()
//     return users.map((user) => exclude(user, ['password']))
// }

export const remove = async (id: number) => {
    try {
        await prisma.user.delete({
            where: { id: id },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}

// export const get = async (next: NextFunction) => {
//     try {
//         const users = await prisma.user.findMany()
//         if (users.length > 0) {
//             console.log('data found')
//             return users
//         } else {
//             console.log('data not found')
//         }
//         // return users.map((user) => exclude(user, ['password']))
//     } catch (err) {
//         next(err)
//     }
// }
