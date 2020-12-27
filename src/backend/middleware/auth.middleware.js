const jwt = require('../jwt')

const errorMessage = 'Нет авторизации'

module.exports = (request, response, next) => {
  let token = ''
  if (request === 'OPTIONS') {
    return next()
  }
  try {
    if (request.headers.authorization) {
      token = request.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    }
    if (!token) {
      return response.status(401).json({
        status: 401,
        error: errorMessage,
        description: 'Нет токена',
      })
    }
    request.user = jwt.verify(token)
    if (request.user === false) {
      return response.status(401).json({
        status: 401,
        error: errorMessage,
        description: 'Невалидный токен',
      })
    }
    next()
  } catch (error) {
    response.status(401).json({
      status: 401,
      error: errorMessage,
      description: error.message,
    })
  }
}
