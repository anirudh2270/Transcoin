const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth_controller');

router.post('/login', Auth.login);
router.post('/signup', Auth.signup);
router.post('/logout', Auth.logout);

module.exports = router;
