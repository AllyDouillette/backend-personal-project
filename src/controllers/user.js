import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { getUsersDb, getUserDb, createUserDb, getUserByUsername } from "../domain/user.js"
import { constructMessageResponse, constructDataResponse } from "../helper/response.js"
import { comparePasswords } from "../helper/hashing.js"
import { generateToken } from "../helper/authentication.js"
import { scrubUserData } from "../helper/helper.js"

export const registerUser = async (req, res) => {
	const { username, password } = req.body

	if ( !username || !password ) {
		return constructMessageResponse(res, 400)
	}

	try {
		const user = await createUserDb(username, password)
		const cleanUser = scrubUserData(user)
		const token = generateToken({ sub: user.id })
		return constructDataResponse(res, 201, { user: cleanUser, token })
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return constructMessageResponse(res, 403, "username already taken")
			}
			console.log("Known Prisma error", error)
		}
		return constructMessageResponse(res, 500, "Something went wrong.")
	}
}

export const loginUser = async (req, res) => {
	const { username, password } = req.body

	if ( !username || !password ) {
		return constructMessageResponse(res, 400)
	}

	try {
		const user = await getUserByUsername(username)

		if (!user) {
			return constructMessageResponse(res, 401)
		}
		
		if (await comparePasswords(password, user.password) === false) {
			return constructMessageResponse(res, 401, "invalid login credentials")
		}

		const token = generateToken({ sub: user.id })
		return constructDataResponse(res, 200, { token })
	} catch (error) {
		console.log(error)
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("Known Prisma error", error)
		}
		return constructMessageResponse(res, 500, "Something went wrong.")
	}
}

export const getUser = async (req, res) => {
	const { id } = req.params
	const user = await getUserDb(id)

	if (!user) {
		return constructMessageResponse(res, 404)
	}

	const cleanUser = scrubUserData(user)
	return constructDataResponse(res, 200, { user: cleanUser })
}

export const getSelf = async (req, res) => {
	const userId = req.params.user
	const user = await getUserDb(userId)
	// const cleanUser = scrubUserData(user)
	delete user.password
	return constructDataResponse(res, 200, { user })
}

export const getUsers = async (_, res) => {
	const users = await getUsersDb()
	const cleanedUsers = users.map((user) => scrubUserData(user))
	return constructDataResponse(res, 200, { users: cleanedUsers })
}
