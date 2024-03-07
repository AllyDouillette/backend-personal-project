import { constructDataResponse, constructMessageResponse } from "../helper/response.js"
import { getCardsDb,
	getCardDb,
	getCardsFromCategoryDb,
	getCardsFromOwnerDb,
	createCardDb,
	updateCardDb,
	updateCardStatsDb,
	deleteCardDb
} from "../domain/card.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { getCategoryDb } from "../domain/category.js"
import { getUserDb } from "../domain/user.js"
import { maxLevel } from "../helper/helper.js"

export const getCards = async (req, res) => {
	try {
		const cards = await getCardsDb()
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getCardsFromCategory = async (req, res) => {
	const categoryId = Number(req.params.id)
	if (!categoryId) return constructMessageResponse(res, 400, "missing category id")

	const category = await getCategoryDb(categoryId)
	if (!category) return constructMessageResponse(res, 404)

	const userId = req.params.user
	if (userId !== category.ownerId) return constructMessageResponse(res, 403)

	try {
		const cards = await getCardsFromCategoryDb(categoryId)
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getOwnCards = async (req, res) => {
	const userId = req.params.user

	try {
		const cards = await getCardsFromOwnerDb(userId)
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getCardsFromUser = async (req, res) => {
	const ownerId = req.params.id

	const owner = await getUserDb(ownerId)
	if (!owner) return constructMessageResponse(res, 404, "user does not exist")

	try {
		const cards = await getCardsFromOwnerDb(ownerId)
		return constructDataResponse(res, 200, { cards })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const getCard = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400, "missing field in query")

	try {
		const card = await getCardDb(id)

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
		const existingCard = await getCardDb(id)
		if (!existingCard) return constructMessageResponse(res, 404)

		const userId = req.params.user
		if (existingCard.ownerId !== userId) return constructMessageResponse(res, 401)

		const { prompt, answer, hint, level, repetitions, categoryId, lastAskedAt } = req.body
		const card = await updateCardDb(id, prompt, answer, hint, level, repetitions, categoryId, lastAskedAt)
		return constructDataResponse(res, 200, { card })
	} catch (error) {
		console.log(error)
		return constructMessageResponse(res, 500)
	}
}

export const updateCardStats = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400)

	if (req.query.changeBy === undefined) return constructMessageResponse(res, 400, "missing query param of changeBy")

	const changeBy = Number(req.query.changeBy)
	if (isNaN(changeBy)) return constructMessageResponse(res, 400, "query param of changeBy is not a number")
	if (changeBy === 0) return constructMessageResponse(res, 400, "query param of changeBy is zero")

	try {
		const existingCard = await getCardDb(id)
		if (!existingCard) return constructMessageResponse(res, 404)

		const userId = req.params.user
		if (existingCard.ownerId !== userId) return constructMessageResponse(res, 401)

		const { level, repetitions } = existingCard
		// a level is only increased if it's a positive change
		const newLevel = level + Math.max(0, changeBy)
		// but never above the maxLevel
		const cappedLevel = Math.min(newLevel, maxLevel)
		// repetitions are ALL times a card was shown.
		const newRepetitions = repetitions + Math.abs(changeBy)
		const card = await updateCardStatsDb(id, cappedLevel, newRepetitions, new Date().toISOString())
		return constructDataResponse(res, 200, { card })
	} catch (error) {
		return constructMessageResponse(res, 500)
	}
}

export const deleteCard = async (req, res) => {
	const id = Number(req.params.id)
	if (!id) return constructMessageResponse(res, 400, "missing or invalid id")

	const userId = req.params.user
	try {
		const card = await getCardDb(id)
		if (!card) return constructMessageResponse(res, 404)
		if (card.ownerId !== userId) return constructMessageResponse(res, 403)

		await deleteCardDb(id)
		return constructMessageResponse(res, 204)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			console.log(error.code, "prisma error")
		}
		console.log(error.code, error)
		return constructMessageResponse(res, 500)
	}
}
