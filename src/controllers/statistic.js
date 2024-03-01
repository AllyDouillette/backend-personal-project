import { getStatisticsDb, getStatisticForDateDb, getStatisticForDateRangeDb } from "../domain/statistic.js"
import { constructDataResponse } from "../helper/response.js"

export const getStatistics = async (_, res) => {
	const statistics = await getStatisticsDb()
	return constructDataResponse(res, 200, { statistics })
}

export const getStatisticsForDay = async (req, res) => {
	const { date } = req.params
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistics = await getStatisticForDateDb(ISOdate)
	return constructDataResponse(res, 200, { statistics })
}

export const getStatisticsForDateRange = async (req, res) => {
	const { startDate, endDate } = req.params
	const ISOStartDate = new Date(`${startDate}T00:00:00.000Z`)
	const ISOEndDate = new Date(`${endDate}T00:00:00.000Z`)
	console.log(ISOStartDate, ISOEndDate)
	const statistics = await getStatisticForDateRangeDb(ISOStartDate, ISOEndDate)
	return constructDataResponse(res, 200, { statistics })
}
