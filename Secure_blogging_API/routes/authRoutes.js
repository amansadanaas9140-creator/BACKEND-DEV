const express = require('express');
const { register, login, refresh } = require('../controllers/authController');
const { registerSchema, loginSchema, validate } = require('../middleware/validate');
const limiter = require('../middleware/rateLimit');

const router = express.Router();

router.post('/register', limiter, validate(registerSchema), register);
router.post('/login', limiter, validate(loginSchema), login);
router.post('/refresh', refresh);

module.exports = router;
