import {
  IModelFactory,
  TData,
  TIdentifier,
  TModelFactoryResponse
} from './@types'
import { getDuplicateObjectMsg } from './utils'

export class ModelFactory implements IModelFactory {
  public model: any
  private responseObj: TModelFactoryResponse

  constructor(model: any) {
    this.model = model
    this.responseObj = {
      success: false,
      statusCode: null,
      errors: {},
      data: undefined
    }
  }

  serverError(error: any, errorType: string) {
    const message =
      error.code && error.code === 11000
        ? getDuplicateObjectMsg(error)
        : error.message
    console.log(message)
    this.responseObj.errors[errorType] = message
    this.responseObj.data = undefined
    return this.responseObj
  }
  success(doc: any) {
    this.responseObj.data = doc
    this.responseObj.success = true
    this.responseObj.statusCode = 200
    this.responseObj.errors = undefined
    return this.responseObj
  }

  doesNotExists() {
    this.responseObj.data = undefined
    this.responseObj.success = false
    this.responseObj.statusCode = 404
    this.responseObj.errors.NotFound = 'Requested resource does not exists.'
    return this.responseObj
  }

  async createOne(data: TData): Promise<TModelFactoryResponse> {
    try {
      const newDoc = await this.model.create(data)

      this.responseObj.data = newDoc
      this.responseObj.success = true
      this.responseObj.statusCode = 201
      this.responseObj.errors = undefined
      return this.responseObj
    } catch (err) {
      return this.serverError(err, 'createError')
    }
  }

  async getOne(identifier: TIdentifier, identifierFieldName: string) {
    try {
      const query = {
        [identifierFieldName]: identifier,
        isDeleted: false
      }
      console.log('q', query)
      const doc = await this.model.findOne(query)
      if (doc) {
        this.responseObj.data = doc
        this.responseObj.success = true
        this.responseObj.statusCode = 200
        this.responseObj.errors = undefined
        return this.responseObj
      } else {
        return this.doesNotExists()
      }
    } catch (err) {
      return this.serverError(err, 'unknown')
    }
  }

  async updateOne(
    identifier: TIdentifier,
    identifierFieldName: string,
    data: TData
  ) {
    try {
      const filter = { [identifierFieldName]: identifier }
      const doc = await this.model.findOneAndUpdate(filter, data, {
        new: true
      })
      if (doc) {
        // doc.save()
        return this.success(doc)
      }
      return this.doesNotExists()
    } catch (err) {
      return this.serverError(err, 'unknown')
    }
  }

  async deleteOne(identifier: TIdentifier, identifierFieldName: string) {
    try {
      const filter = {
        [identifierFieldName]: identifier,
        isDeleted: false
      }
      const update = { isDeleted: true }
      const doc = await this.model.findOneAndUpdate(filter, update)
      if (doc) {
        return this.success(undefined)
      }
      return this.doesNotExists()
    } catch (err) {
      return this.serverError(err, 'unknown')
    }
  }
}
