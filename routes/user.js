const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const {loginValidator} = require('../middleware/loginValidator')

router.post('/signup', loginValidator, userCtrl.signup);
router.post('/login', loginValidator, userCtrl.login);

module.exports = router;