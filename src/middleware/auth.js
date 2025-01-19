import { constructMessageResponse } from "../helper/response.js"
import { verifyToken } from "../helper/authentication.js"
import { getUserDb } from "../domain/user.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { compareSync } from "bcrypt"

const extractAuthentication = (req) => {
	const authentication = req.header("authorization")
	if (!authentication) return false

	const [type, token] = authentication.split(" ")
	if (type !== "Bearer" || !!token === false ) return false

	return token
}

export const checkToken = async (req, res, next) => {
	const token = extractAuthentication(req)
	if (!token || token === "undefined") {
		return constructMessageResponse(res, 400, "missing authorization in header: " + req.header("Authorization"))
	}

	try {
		const decodedToken = verifyToken(token)
		if (decodedToken.sub) {
			// append info to params
			req.params.user = decodedToken.sub
			return next()
		}
	} catch (error) {
		return constructMessageResponse(res, 500, "weird or malformed token")
	}

}

export const checkAdminRole = async (req, res, next) => {
	const token = extractAuthentication(req)

	if (!token) {
		return constructMessageResponse(res, 400, "missing authorization in header")
	}

	const decodedToken = verifyToken(token)
	if (decodedToken) {
		const { sub } = decodedToken

		try {
			const user = await getUserDb(sub)

			if (user.role === "ADMIN") {
				next()
			} else {
				return constructMessageResponse(res, 403)
			}
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				console.log("prisma error", e.code, e.message)
			}
			console.log(e.code, "something went wrong")
			return  constructMessageResponse(res, 403)
		}
	}
}
