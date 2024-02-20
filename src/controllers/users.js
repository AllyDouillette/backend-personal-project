import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { createUserDb, getUserByIdDb, getUserByEmail } from "../domain/users.js"
import { constructResponse } from "../helper/response.js"
import { comparePasswords } from "../helper/hashing.js"
import { generateToken } from "../helper/authentication.js"

export const registerUser = async (req, res) => {
	const { email, password } = req.body

	if ( !email || !password ) {
		return constructResponse(res, 400)
	}

	try {
		const user = await createUserDb(email, password)
		return constructResponse(res, 201, "", user)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return constructResponse(res, 403, "username already taken")
			}
			console.log("Known Prisma error", error)
		}
		return constructResponse(res, 500, "Something went wrong.")
	}
}

export const loginUser = async (req, res) => {
	const { email, password } = req.body

	if ( !email || !password ) {
		return constructResponse(res, 400)
	}

	try {
		const user = await getUserByEmail(email)

		if (!user) {
			constructResponse(res, 401)
		}

		if (await comparePasswords(password, user.password) === false) {
			return constructResponse(res, 401, "invalid login credentials")
		}

		const token = generateToken({ sub: user.id })
		return constructResponse(res, 200, "", { token })
	} catch (error) {
		console.log(error)
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
