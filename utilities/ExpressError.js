class ExpressError extends Error {
  constructor(message, statusCode) {
    //inherite from Error
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = ExpressError