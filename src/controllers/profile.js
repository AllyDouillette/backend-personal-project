import { getUserDb } from "../domain/user.js"
import { scrubUserData } from "../helper/helper.js"
import { constructDataResponse, constructMessageResponse } from "../helper/response.js"

export const getOwnProfile = async (req, res) => {
	const userId = req.params.user
	const user = await getUserDb(userId, true)
	if (!user) {
		return constructMessageResponse(res, 404)
	}

	scrubUserData(user)
	delete user.profile.id
	delete user.profile.userId
	return constructDataResponse(res, 200, { user })
}
