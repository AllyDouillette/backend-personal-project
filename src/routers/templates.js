import { Router } from "express";
import { checkToken } from "../middleware/auth.js";
import path from "path";

const router = new Router();

const getTemplate = async (req, res) => {
	const file = path.format({
		root: "src/assets/",
		base: "ImportTemplate.xlsx",
		ext: "ignored",
	})
	res.download(file)
}

router.get("/", checkToken, getTemplate)

export default router
