import { constructMessageResponse } from "../helper/response.js"
import { verifyToken } from "../helper/authentication.js"

const extractAuthentication = (req) => {
	const authentication = req.header("authorization")
	if (!authentication) return false

	const [type, token] = authentication.split(" ")
	if (type !== "Bearer" || !!token === false ) return false

	return token
}

export const checkToken = async (req, res, next) => {
	const token = extractAuthentication(req)

	if (!token) {
		return constructMessageResponse(res, 400, "missing authorization in header")
	}

	if (verifyToken(token)) {
		return next()
	}

	return constructMessageResponse(res, 500)
}
