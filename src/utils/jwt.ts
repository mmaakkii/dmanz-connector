import jwt from 'jsonwebtoken'

import { CreateJWTOptions, DecodeJWTCompleteResponse } from './types'

/**
 * This will help to identify when errors were thrown decoding the JWT 
 * by checking the name property of the Error object: 
 * TokenExpiredError - Thrown error if the token is expired.
    err = {
      name: 'TokenExpiredError',
      message: 'jwt expired',
      expiredAt: 1408621000
    }
 * JsonWebTokenError - malformed, invalid signature, invalid issuer ....
    err = {
      name: 'JsonWebTokenError',
      message: 'jwt malformed'
    }
 * NotBeforeError - Thrown if current time is before the nbf claim.
    err = {
      name: 'NotBeforeError',
      message: 'jwt not active',
      date: 2018-10-04T16:10:44.000Z
    } 
 */

export const JWT_ERROR_NAMES_SET = new Set([
  'TokenExpiredError',
  'JsonWebTokenError',
  'NotBeforeError'
])

export const createJWT = ({
  payload,
  privateKey,
  expiresIn
}: CreateJWTOptions): string => {
  const token = jwt.sign(payload, privateKey, {
    expiresIn
  })
  return token
}

export const decodeJwt = <T>(
  token: string,
  privateKey: string
): DecodeJWTCompleteResponse<T> => {
  try {
    /**
     * We are having issues with TS throwing this error:
     * Type 'string | object' is not assignable to type 'T'.
     * 'T' could be instantiated with an arbitrary type which could be unrelated to 'string | object'.
     * As temp solution we did this type cast
     */
    return jwt.verify(token, privateKey, {
      complete: true
    }) as unknown as DecodeJWTCompleteResponse<T>
  } catch (e) {
    //TODO: implement logger here
    throw e
  }
}
