import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { createUserDb, getUserByIdDb } from "../domain/users.js"
import { constructResponse } from "../helper/response.js"

export const registerUser = async (req, res) => {
	const { email, password } = req.body

	if ( !email || !password ) {
		return constructResponse(res, 400)
	}

	try {
		const user = await createUserDb(email, password)
		return constructResponse(res, 201, user)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("Known Prisma error", error)
		}
		return constructResponse(res, 500, "Something went wrong.")
	}
}

export const getUserById = async (req, res) => {
	const { id } = req.params
	const user = await getUserByIdDb(id)
	return constructResponse(res, 200, "", user)
}
