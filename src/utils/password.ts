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

export const createRandomPassword = (length = 10): string => {
  const charSet = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
  let value = ''
  const n = charSet.length
  for (let i = 0; i < length; ++i) {
    value += charSet.charAt(Math.floor(Math.random() * n))
  }
  const hasNumbers = /\d/.test(value)
  if (!hasNumbers) {
    value += Math.floor(Math.random() * n)
  }
  return value
}
