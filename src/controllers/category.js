import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCategoriesDb,
	createCategoryDb,
	getCategoryByIdDb,
	updateCategoryByIdDb
} from "../domain/category.js"

export const getCategories = async (_, res) => {
	const categories = await getCategoriesDb()
	return constructDataResponse(res, 200, { categories })
}

export const createCategory = async (req, res) => {
	const { name } = req.body

	if (!name) return constructMessageResponse(res, 400, "missing fields")

	// TODO: add option to supply ownerId different from own for admins
	const ownerId = req.params.user

	try {
		const category = await createCategoryDb(name, ownerId)
		return constructDataResponse(res, 201, { category })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getCategoryById = async (req, res) => {
	const id = Number(req.params.id)
	const { user } = req.params

	try {
		const category = await getCategoryByIdDb(id)
		if (!category) throw Error("no category found")

		//TODO: add complexities that admins are always allowed to see any category
		if (user !== category.ownerId) {
			return constructMessageResponse(res, 403)
		}

		return constructDataResponse(res, 200, { category })
	} catch (error) {
		return constructMessageResponse(res, 404)
	}
}
