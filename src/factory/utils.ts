export const getDuplicateObjectMsg = (error: any): string => {
  const { keyPattern } = error
  const duplicateFields = Object.keys(keyPattern).join(',')
  return `An object with provided ${duplicateFields} already exists.`
}
