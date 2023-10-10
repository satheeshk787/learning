const express = require('express');
const router = express.Router();
const { validate } = require('../validations/validationMiddleware');
const { loginValidation } = require('../validations/schema/authValidationSchema');
const userController = require('../controller/userController');


router.route('/login')
    .post(
        validate(loginValidation),
        userController.login
    );

module.exports = router;
