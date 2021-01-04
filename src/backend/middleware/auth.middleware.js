const jwt = require('../jwt');

const errorMessage = 'Нет авторизации';

module.exports = (request, response, next) => {
  let token;
  if (request === 'OPTIONS') {
    return next();
  }
  if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
    [, token] = request.headers.authorization.split(' ');
  }
  try {
    if (!token) {
      return response.status(401)
        .json({
          status: 401,
          error: errorMessage,
          description: 'Нет токена',
        });
    }
    request.user = jwt.verify(token);
    if (request.user === false) {
      return response.status(401)
        .json({
          status: 401,
          error: errorMessage,
          description: 'Невалидный токен',
        });
    }
    next();
  } catch (error) {
    response.status(401)
      .json({
        status: 401,
        error: errorMessage,
        description: error.message,
      });
  }
};
