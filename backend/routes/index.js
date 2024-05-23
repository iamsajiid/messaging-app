import authenticationMiddleware from '../middleware/authentication.js'
import errorHandlerMiddleware from '../middleware/error-handler.js'
import authRoute from './authRoute.js'
import express from 'express'
import messageRoute from "./messageRoute.js"
import userRoute from "./userRoute.js"

const router = express.Router()

router.use('/auth', errorHandlerMiddleware, authRoute)
router.use('/message', authenticationMiddleware, errorHandlerMiddleware, messageRoute)
router.use('/user', authenticationMiddleware, errorHandlerMiddleware, userRoute)

export default router