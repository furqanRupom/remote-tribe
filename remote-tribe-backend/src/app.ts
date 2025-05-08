import express from "express"
import cors from "cors"
import router from "./app/routes/router"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", router)
app.use(globalErrorHandler)
app.get("/", (req, res) => {
    res.json({
        statusCode:200,
        success:true,
        message:"Remote tribe APIs"
    })
})
export default app