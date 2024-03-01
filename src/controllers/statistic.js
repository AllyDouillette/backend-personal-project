import { getStatisticsDb } from "../domain/statistic.js"
import { constructDataResponse } from "../helper/response.js"

export const getStatistics = async (_, res) => {
	const statistics = await getStatisticsDb()
	return constructDataResponse(res, 200, { statistics })
}
