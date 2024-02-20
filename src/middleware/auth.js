import { constructMessageResponse } from "../helper/response.js"
import { verifyToken } from "../helper/authentication.js"

export const checkToken = async (req, res, next) => {
	const authentication = req.header("authorization")
	if (!authentication) {
		return constructMessageResponse(res, 400, "missing authorization in header")
	}

	const [_, token] = authentication.split(" ")
	if (!token) {
		return constructMessageResponse(res, 400, "missing authorization in header")
	}

	if (verifyToken(token)) {
		return next()
	}

	return constructMessageResponse(res, 500)
}
