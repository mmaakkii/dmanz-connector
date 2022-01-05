export interface IModelFactory {
  model: any
}

export type TData =
  | Record<string, any>
  | Array<Record<string, any>>
  | Array<string>
  | Array<number>
  | string
  | number
  | boolean

export type TIdentifier = string | number | boolean | null

export type TModelFactoryResponse = {
  success: boolean
  statusCode: number
  errors?: Record<string, any>
  data?: Record<string, any>
}
