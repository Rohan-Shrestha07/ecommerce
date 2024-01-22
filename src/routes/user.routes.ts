/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from 'express'
import * as UserController from '../controllers/user.controller'
import {
    authenticateToken,
    isAdmin,
} from '../middlewares/authentication.middleware'
import { validate } from '../utils/validate'
import {
    createUserSchema,
    updateUserSchema,
} from '../validators/user.validator'
const router = Router()

//get alldata by admin
router.get('/admin', authenticateToken, isAdmin, UserController.getUsers)

// router.get('/:id', authenticateToken, isAdmin, UserController.getUserById)

router.post(
    '/',
    validate(createUserSchema),
    authenticateToken,
    isAdmin,
    UserController.createUser
)

// router.put('/:id',validate(updateUserSchema),authenticateToken,isAdmin,UserController.updateUserById)

//delete by admin
router.delete('/admin/:id',authenticateToken,isAdmin,UserController.deleteUser)

export default router
