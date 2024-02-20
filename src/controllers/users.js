import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { createUserDb, getUserByIdDb } from "../domain/users.js"
import { constructResponse } from "../helper/response.js"

export const registerUser = (req, res) => {
	const { email, password } = req.body

	if ( !email || !password ) {
		return constructResponse(res, 400)
	}

	try {
		const user = createUserDb(email, password)
		return constructResponse(res, 201, user)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("Known Prisma error", error)
		}
		return constructResponse(res, 500, "Something went wrong.")
	}
}

export const getUserById = (req, res) => {
	const { id } = req.body
	const user = getUserByIdDb(id)
	return res.status(200).json({ user })
}
