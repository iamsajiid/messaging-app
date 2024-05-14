import express from "express"
import dotenv from "dotenv"
import errorHandlerMiddleware from "./middleware/error-handler"
import routes from "./routes"
import notFoundMiddleware from "./middleware/not-found"

dotenv.config()
const app = express()

app.use(express.json())
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

app.use("/", routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})