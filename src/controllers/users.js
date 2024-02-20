import { getUserByIdDb } from "../domain/users"

export const getUserById = (req, res) => {
  const { id } = req.body
  return getUserByIdDb(id)
}
