import { constructDataResponse } from "../helper/response.js"
import { getCategoriesDb } from "../domain/category.js"

export const getCategories = async (_, res) => {
	const categories = await getCategoriesDb()
	return constructDataResponse(res, 200, { categories })
}
