import express from "express"
import dotenv from "dotenv"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import notFoundMiddleware from "./middleware/not-found.js"
import connectDB from "./db/connect.js"
import routes from "./routes/index.js"
import "express-async-errors"

dotenv.config()
const app = express()

app.use(express.json())

app.use("/", routes)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
    connectDB(process.env.MONGODB_URI)
})