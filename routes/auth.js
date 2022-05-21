
const { Router } = require('express')
const { check } = require('express-validator');



const { login } = require('../controllers/auth');
const validateAtributes = require('../middlewares/validate-attributes');

const router = Router();

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateAtributes
],
login);

module.exports = router; 