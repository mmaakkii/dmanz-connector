import { compare, hash } from 'bcrypt'
import { createHash, randomBytes } from 'crypto'
import { CreateToken } from './types'

export const hashPassword = (password: string): Promise<string> =>
  hash(password, 12)

export const comparePasswords = (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> => compare(candidatePassword, userPassword)

export const createHashedToken = (token: string): string =>
  createHash('sha256').update(token).digest('hex')

export const createToken = (): CreateToken => {
  const token = randomBytes(32).toString('hex')
  const hashedToken = createHashedToken(token)
  return { token, hashedToken }
}
