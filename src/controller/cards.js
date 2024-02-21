import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCardsDb, getCardByIdDb } from "../domain/cards.js"

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
