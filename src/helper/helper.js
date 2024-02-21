export const scrubUserData = (user) => {
	delete user.password
	delete user.id
	return user
}
