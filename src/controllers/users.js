import { getUserByIdDb } from "../domain/users.js"
import { constructResponse } from "../helper/response.js"

export const registerUser = (req, res) => {
	const { email, password } = req.body

	if ( !email || !password ) {
		return constructResponse(res, 400)
	}
}

export const getUserById = (req, res) => {
	const { id } = req.body
	const user = getUserByIdDb(id)
	return res.status(200).json({ user })
}
