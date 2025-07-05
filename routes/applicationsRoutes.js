const express = require('express');
const router = express.Router();

const applicationsControllers = require('../controllers/applicationsControllers');

router.get('/app', applicationsControllers.getApp);
router.post('/app', applicationsControllers.postApp);

module.exports = router;    