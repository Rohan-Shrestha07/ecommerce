import { Request } from 'express'

export interface RequestWithUserObject extends Request {
    user: UserJWTPayload
}

export interface UserJWTPayload {
    isAdmin: boolean //why this
    userId: number
    email: string
    //why this
}
