export const scrubUserData = (user) => {
	delete user.password
	delete user.id
	return user
}

export const maxLevel = 10

export const randLevel = () => Math.min(parseInt(Math.random() * 11), 10)
export const randDate = () => {
	const milliSecondsInYear = 1000 * 60 * 60 * 24 * 365
	const randomTime = parseInt(Math.random() * milliSecondsInYear)
	const date = new Date(new Date().setTime(new Date().getTime() - randomTime))
	return date.toISOString()
}
export const randReps = (level) => level + parseInt(Math.random() * 5)
export const randInt = (lowerEnd, upperEnd) => parseInt(Math.random() * (upperEnd - lowerEnd)) + lowerEnd
