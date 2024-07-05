import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./routers/auth.js"
import userRouter from "./routers/user.js"
import profileRouter from "./routers/profile.js"
import categoryRouter from "./routers/category.js"
import cardRouter from "./routers/card.js"
import statisticRouter from "./routers/statistic.js"
import templateRouter from "./routers/template.js"

const app = express()
app.disable("x-powered-by")
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use("/", authRouter)
app.use("/users", userRouter)
app.use("/profile", profileRouter)
app.use("/categories", categoryRouter)
app.use("/cards", cardRouter)
app.use("/statistics", statisticRouter)
app.use("/templates", templateRouter)

app.get("/hello", (_, res) => {
	res.status(200).json({
		message: "Hello! I am your local server!",
		data: { name: "Sir ServeALot" }})
})

// catch-all
app.get("*", (_, res) => {
	res.status(404).json({
		status: "fail",
		data: {
			resource: "not found"
		}
	})
})

export default app
