// central error handling middleware
// should be added after all routes in server.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  })
}

module.exports = errorHandler
