/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import express, { NextFunction } from 'express'
import express from 'express'
import todosRouter from './routes/todos.router'
import authRouter from './routes/auth.route'
import userRouter from './routes/user.routes'
import {NextFunction,Request,Response} from "express"
import buildError from './utils/build-errors'

const app = express()

app.use(express.json())

const PORT = 3000
app.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}`))

//Get way to todos
app.use('/todos',todosRouter)

app.use('/auth',authRouter)

app.use('/user',userRouter)


//Error checking
app.use((err:any ,req:Request,res:Response,next:NextFunction)=>{
   const error = buildError(err)
   res.status(error.code).send({error})

})
export default app
