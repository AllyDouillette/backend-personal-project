import bcrypt from "bcrypt"
export const hashString = (string) => bcrypt.hash(string, 12)
export const comparePasswords = (password, hash) => bcrypt.compare(password, hash)
