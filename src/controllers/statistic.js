import {
	getStatisticDb,
	updateStatisticDb,
	getStatisticsDb,
	getStatisticsForUserDb,
	getStatisticsForDateDb,
	getStatisticForUserAndDateDb,
	getStatisticsForDateRangeDb,
	getStatisticsForUserInDateRangeDb,
	createStatisticDb
} from "../domain/statistic.js"
import { constructDataResponse, constructMessageResponse } from "../helper/response.js"

export const getStatistic = async (req, res) => {
	const id = Number(req.params.id)
	const statistic = await getStatisticDb(id)
	return constructDataResponse(res, 200, { statistic })
}

export const getStatistics = async (_, res) => {
	const statistics = await getStatisticsDb()
	return constructDataResponse(res, 200, { statistics })
}

export const getStatisticsForDay = async (req, res) => {
	const { date } = req.params
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistics = await getStatisticsForDateDb(ISOdate)
	return constructDataResponse(res, 200, { statistics })
}

export const createOwnStatisticForDate = async (req, res) => {
	const id = Number(req.params.id)
	const { date } = req.params
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistic = await createStatisticDb(id, ISOdate)
	return constructDataResponse(res, 200, { statistic })
}

export const updateOwnStatisticEntry = async (req, res) => {
	const id = Number(req.params.id)

	const existingStatistic = await getStatisticDb(id)
	const userId = req.params.user

	if (userId !== existingStatistic.userId) {
		return constructMessageResponse(res, 401)
	}

	const correct = req.query.correct === undefined ? 0 : Number(req.query.correct)
	const incorrect = req.query.incorrect === undefined ? 0 : Number(req.query.incorrect)
	const statistic = await updateStatisticDb(id, existingStatistic.correct + correct, existingStatistic.incorrect + incorrect)
	return constructDataResponse(res, 200, { statistic })
}

export const getStatisticsForDateRange = async (req, res) => {
	const { startDate, endDate } = req.params
	const ISOStartDate = new Date(`${startDate}T00:00:00.000Z`)
	const ISOEndDate = new Date(`${endDate}T00:00:00.000Z`)
	console.log(ISOStartDate, ISOEndDate)
	const statistics = await getStatisticsForDateRangeDb(ISOStartDate, ISOEndDate)
	return constructDataResponse(res, 200, { statistics })
}

export const getOwnStatistics = async (req, res) => {
	const userId = req.params.user
	const statistics = await getStatisticsForUserDb(userId)
	return constructDataResponse(res, 200, { statistics })
}

export const getOwnStatisticForDate = async (req, res) => {
	const { date } = req.params
	const userId = req.params.user
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistic = await getStatisticForUserAndDateDb(userId, ISOdate)
	return constructDataResponse(res, 200, { statistic })
}

export const getOwnStatisticsForDateRange = async (req, res) => {
	const { startDate, endDate } = req.params
	const userId = req.params.user
	const ISOStartDate = new Date(`${startDate}T00:00:00.000Z`)
	const ISOEndDate = new Date(`${endDate}T00:00:00.000Z`)
	console.log(ISOStartDate, ISOEndDate)
	const statistics = await getStatisticsForUserInDateRangeDb(userId, ISOStartDate, ISOEndDate)
	return constructDataResponse(res, 200, { statistics })
}
