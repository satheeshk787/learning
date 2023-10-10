const express = require('express');
const router = express.Router();
const { validate } = require('../validations/validationMiddleware');
const listController = require('../controller/listController');
const { createValidation, editValidation, deleteValidation } = require('../validations/schema/listValidationSchema');
const userController = require('../controller/userController');




router.route('/userInfo')
    .get(
        userController.userInfo
    );

router.route('/list/create')
    .post(
        validate(createValidation),
        listController.create
    );

router.route('/list/edit')
    .post(
        validate(editValidation),
        listController.edit
    );

router.route('/list/delete')
    .post(
        validate(deleteValidation),
        listController.delete
    );

router.route('/list')
    .get(        
        listController.list
    );

module.exports = router;
