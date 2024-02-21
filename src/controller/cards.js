import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCardsDb, getCardByIdDb, createCardDb } from "../domain/cards.js"

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

		const user = req.params.user
		if (card.ownerId !== user.id) return constructMessageResponse(res, 403)

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
