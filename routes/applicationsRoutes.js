const express = require('express');
const router = express.Router();

const {getApp} = require('../controllers/applicationsControllers');

router.get('/', getApp);

module.exports = router;    