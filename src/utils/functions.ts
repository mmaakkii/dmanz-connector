import { randomBytes } from 'crypto'

export const isServer = typeof window === 'undefined'

export const capitalize = (value: any) => {
  if (isArray(value)) {
    return value.map((i) => capitalize(i))
  }
  return value[0].toUpperCase() + value.slice(1)
}

export const snakeCaseToCamelCase = (phrase = ''): string =>
  phrase.replace(/([-_][a-z]|[-_][1-9])/gi, (word: string) =>
    word.toUpperCase().replace(/(-|_)/, '')
  )

export const camelCaseToSnakeCase = (phrase = ''): string =>
  phrase
    .replace(/[\w]([A-Z])/g, (word: string) => `${word[0]}_${word[1]}`)
    .toLowerCase()

export const isArray = (a: any): boolean => Array.isArray(a)

export const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

export const isSystemError = (errors) => 'system' in Object.keys(errors)

export const parseErrorData = (errors) => {
  const obj = {}
  for (const i in Object.keys(errors)) {
    const key = Object.keys(errors)[i]
    let value = errors[key]
    value = isObject(value) ? value[0] : value
    value = isArray(value)
      ? ((value = capitalize(value)), value.join(','))
      : capitalize(value)
    obj[snakeCaseToCamelCase(key)] = value
  }
  return obj
}

export const parseFormData = (formData) => {
  const obj = {}
  for (const i in Object.keys(formData)) {
    const key = Object.keys(formData)[i]
    obj[camelCaseToSnakeCase(key)] = formData[key]
  }
  return obj
}

export const jsRange = (n) => Array.from(Array(n).keys())

export const createUIDWithPrefix = (prefix: string): string => {
  const token = randomBytes(10).toString('hex')
  return `${prefix}_${token}`
}
