/*
  Rutas de Usuarios / Auth
  host:port/api/auth
  example: http://localhost:8080/api/auth
*/
const { Router } = require('express');
const router = Router();

const { postUser, loginUser, renewToken } = require('../controllers/auth');

router.post('/', loginUser);

router.post('/new', postUser);

router.get('/renew', renewToken);

module.exports = router;
