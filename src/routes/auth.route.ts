/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import { validate } from '../utils/validate'
import { signupSchema,loginSchema } from '../validators/auth.validator'
import * as AuthController from '../controllers/auth.controller'
import { refreshToken } from '../controllers/auth.controller'

const router = Router()

router.post('/login', validate(loginSchema), AuthController.loginUser)

router.post(`/signup`, validate(signupSchema), AuthController.registerUser)

router.post('/refresh', AuthController.refreshToken)

router.post('/logout', () => {
    console.log(
        'this method should store any session info if stored, or remove cookie from the header'
    )
})

router.post('/forgot-password', () => {
    console.log(
        'this method should send an email using sendgrid to the user with forgot password link'
    )
})

//delete


export default router