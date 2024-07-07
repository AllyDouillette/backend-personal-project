import { Router } from "express";
import { checkToken } from "../middleware/auth.js";
import path from "path"
import { constructDataResponse } from "../helper/response.js";

const router = new Router()

const getTemplate = async (req, res) => {
	const file = path.format({
		root: "src/assets/",
		base: "ImportTemplate.xlsx",
		ext: "ignored",
	})
	res.download(file, "apprendio-template.xlsx")
}

router.get("/import", checkToken, getTemplate)

export default router
