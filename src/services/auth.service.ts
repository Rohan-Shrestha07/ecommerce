/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../utils/prisma'
//import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { signupBodySchema } from '../validators/auth.validator'
import { z } from 'zod'
import Boom from '@hapi/boom'
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from '../utils/token.util'

export const signup = async (user: z.infer<typeof signupBodySchema>) => {
    const { email, password, phone_number, is_admin } = user
    try {
        await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
                phone_number,
                is_admin,
            },
            select: {
                email: true,
                addresses: true,
                phone_number: true,
                id: true,
            },
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        } else {
            throw e
        }
    }
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const accessToken = createAccessToken(user.id, user.is_admin)

    const refreshToken = createRefreshToken(user.id, user.is_admin)

    return { accessToken, refreshToken }
}

export async function refresh(refreshToken: string) {
    try {
        const decodedToken: any = verifyRefreshToken(refreshToken)
        return createAccessToken(decodedToken.userId, decodedToken.isAdmin)
    } catch (error) {
        throw Boom.unauthorized('User is not logged in')
    }
}
