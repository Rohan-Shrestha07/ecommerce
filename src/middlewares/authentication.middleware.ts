/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Boom from '@hapi/boom'
import { Response, NextFunction } from 'express'
import { RequestWithUserObject, UserJWTPayload } from '../types'
import { verifyAccessToken } from '../utils/token.util'

export function authenticateToken(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!token) {
        throw Boom.badRequest('Missing authentication token')
    }

    try {
        const decodedToken = verifyAccessToken(token)
        req.user = decodedToken as UserJWTPayload
        next()
    } catch (error) {
        throw Boom.unauthorized('User is not logged in')
    }
}

export function isAdmin(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    const { user } = req //why user
    console.log(user)
    if (user && user.isAdmin === true) {
        next()
        console.log('hello')
    } else {
        console.log('hellow222')
        throw Boom.forbidden('User is not an admin')
    }
}

export function isUser(
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) {
    const { user } = req //why user

    if (user && user.isAdmin === false) {
        next()
    } else {
    
        throw Boom.forbidden('User is an admin')
    }
}
