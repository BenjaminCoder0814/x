const express = require('express');
const { createUser, listUsers, login } = require('../controllers/usuarioController');

const router = express.Router();

router.post('/', createUser);
router.get('/', listUsers);
router.post('/login', login);

module.exports = router;
