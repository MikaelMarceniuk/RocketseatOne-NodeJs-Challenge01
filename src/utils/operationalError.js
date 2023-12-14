class OperationalError extends Error {
  constructor(description, isOperational, httpCode) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)

    this.description = description
    this.isOperational = isOperational
    this.httpCode = httpCode
  }
}

export default OperationalError
