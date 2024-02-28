import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCategoriesDb,
	getCategoriesFromOwnerDb,
	createCategoryDb,
	getCategoryDb,
	updateCategoryDb,
	deleteCategoryDb
} from "../domain/category.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"

export const getCategories = async (_, res) => {
	const categories = await getCategoriesDb()
	return constructDataResponse(res, 200, { categories })
}

export const getOwnCategories = async (req, res) => {
	const userId = req.params.user
	const withCardDetails = req.body.withCards === true
	try {
		const categories = await getCategoriesFromOwnerDb(userId, withCardDetails)
		return constructDataResponse(res, 200, { categories })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
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

export const getCategory = async (req, res) => {
	const id = Number(req.params.id)
	const { user } = req.params

	try {
		const category = await getCategoryDb(id)
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

export const updateCategory = async (req, res) => {
	const id = Number(req.params.id)

	try {
		const existingCategory = await getCategoryDb(id)
		const { user } = req.params
		if (user !== existingCategory.ownerId) {
			return constructMessageResponse(res, 403)
		}

		const { name } = req.body
		if (!name) return constructMessageResponse(res, 400)

		const category = await updateCategoryDb(id, name)
		return constructDataResponse(res, 200, { category })
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("prisma error", error)
		}
		console.log(error)
		return constructMessageResponse(res, 401 )
	}
}

export const deleteCategory = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400)

	try {
		const existingCategory = await getCategoryDb(id)
		const { user } = req.params
		if (user !== existingCategory.ownerId) {
			return constructMessageResponse(res, 403)
		}

		await deleteCategoryDb(id)
		return constructDataResponse(res, 204)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log("prisma error", error)
		}
		console.log(error)
		return constructMessageResponse(res, 500)
	}
}
