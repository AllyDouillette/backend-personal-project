import { getUserByIdDb } from "../domain/users"

export const getUserById = (req, res) => {
	const { id } = req.body
  const user = await getUserByIdDb(id)
	return res.status(200).json({ user })
}
