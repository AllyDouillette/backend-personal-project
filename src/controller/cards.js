import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCardsDb } from "../domain/cards.js"

export const getCards = async (req, res) => {
	try {
		const cards = await getCardsDb()
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}
