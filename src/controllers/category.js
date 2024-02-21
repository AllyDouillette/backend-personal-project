import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCategoriesDb, getCategoryByIdDb } from "../domain/category.js"

export const getCategories = async (_, res) => {
	const categories = await getCategoriesDb()
	return constructDataResponse(res, 200, { categories })
}

export const getCategoryById = async (req, res) => {
	const id = Number(req.params.id)

	try {
		const category = await getCategoryByIdDb(id)
		if (!category) throw Error("no category found")
		//TODO: add constraint that the user is either the owner or an admin
		return constructDataResponse(res, 200, { category })
	} catch (error) {
		return constructMessageResponse(res, 404)
	}
}
