import express from "express"
import dotenv from "dotenv"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFoundMiddleware from "./middleware/not-found.js"
import connectDB from "./db/connect.js"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"
import cors from 'cors';

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/api", routes)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)


const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
    connectDB(process.env.MONGODB_URI)
})