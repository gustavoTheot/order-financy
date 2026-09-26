import bcrypt from "bcryptjs"

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
