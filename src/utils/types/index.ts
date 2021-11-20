export type SerializableScalar = string | number | boolean | null

export type SerializableObject = {
  [key: string]: SerializableScalar | SerializableObject | SerializableArray
}

export type SerializableArray = Array<
  SerializableScalar | SerializableObject | SerializableArray
>

export type Serializable =
  | SerializableScalar
  | SerializableObject
  | SerializableArray

export interface CreateJWTOptions {
  payload: string | SerializableObject | Buffer
  privateKey: string
  expiresIn: number
}

export interface DecodeJWTCompleteResponse<T> {
  payload: T & Record<string, any>
  header: any
  signature: any
}

export type CreateToken = {
  token: string
  hashedToken: string
}
