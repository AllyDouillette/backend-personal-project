import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCardsDb,
	getCardByIdDb,
	createCardDb,
	updateCardDb,
	deleteCardDb
} from "../domain/cards.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"

export const getCards = async (req, res) => {
	try {
		const cards = await getCardsDb()
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getCardById = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400, "missing field in query")

	try {
		const card = await getCardByIdDb(id)

		const userId = req.params.user
		if (card.ownerId !== userId) return constructMessageResponse(res, 403)

		return constructDataResponse(res, 200, { card })
	} catch (error) {
		return constructMessageResponse(res, 404)
	}
}

export const createCard = async (req, res) => {
	const { prompt, answer, hint, categoryId } = req.body
	if (!prompt || !answer) return constructMessageResponse(res, 400, "missing fields in query")

	const userId = req.params.user
	try {
		const card = await createCardDb(prompt, answer, hint, categoryId, userId)
		return constructDataResponse(res, 201, { card })
	} catch (error) {
		console.log(error)
		return constructMessageResponse(res, 500)
	}
}

export const updateCard = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400)

	try {
		const existingCard = await getCardByIdDb(id)
		if (!existingCard) return constructMessageResponse(res, 404)

		const userId = req.params.user
		if (existingCard.ownerId !== userId) return constructMessageResponse(res, 401)

		const { prompt, answer, hint, level, categoryId } = req.body
		const card = await updateCardDb(id, prompt, answer, hint, level, categoryId)
		return constructDataResponse(res, 200, { card })
	} catch (error) {
		console.log(error)
		return constructMessageResponse(res, 500)
	}
}

export const deleteCard = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400, "missing or invalid id")

	const userId = req.params.user
	try {
		const card = await getCardByIdDb(id)
		if (!card) return constructMessageResponse(res, 404)
		if (card.ownerId !== userId) return constructMessageResponse(res, 403)

		await deleteCardDb(id)
		return constructMessageResponse(res, 200)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log(error.code, "prisma error")
		}
		console.log(error.code, error)
		return constructMessageResponse(res, 500)
	}
}
