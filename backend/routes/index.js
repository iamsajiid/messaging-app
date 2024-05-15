import authenticationMiddleware from '../middleware/authentication.js'
import errorHandlerMiddleware from '../middleware/error-handler.js'
import authRoute from './authRoute.js'
import express from 'express'

const router = express.Router()

router.use('/auth', errorHandlerMiddleware, authRoute)
// router.use('/job', authenticationMiddleware, jobRoute)

export default router