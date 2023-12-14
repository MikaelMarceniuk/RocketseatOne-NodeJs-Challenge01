const removeUndefinedFromObject = (obj) => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key])
}

export default removeUndefinedFromObject
