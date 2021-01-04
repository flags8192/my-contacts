const { Router } = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const jwt = require('../jwt');

const router = Router();

// /api/auth/register
router.post('/register', async (request, response) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 8);
    await Users.create(request.body);
    response.json({
      result: 'success',
      message: 'Регистрация успешна',
    });
  } catch (error) {
    response.json({
      result: 'error',
      message: error.message,
    });
  }
})

// /api/auth/login
router.post('/login', async (request, response) => {
  const data = await Users.findOne({ email: request.body.email });
  if (data) {
    if (bcrypt.compareSync(request.body.password, data.password)) {
      const payload = {
        id: data._id,
        level: data.level,
        email: data.email,
      };
      const token = jwt.sign(payload);
      response.json({
        result: 'success',
        token,
        message: 'Авторизация успешна',
      });
    } else {
      response.json({
        result: 'error',
        message: 'Неверный пароль',
      });
    }
  } else {
    response.json({
      result: 'error',
      message: 'Данного пользователя не существует ! \r\nВведите верные данные или зарегистрируйтесь.',
    })
  }
})

module.exports = router
