export const scrubUserData = (user) => {
	delete user.password
	delete user.id
	return user
}

export const maxLevel = 10
