const express = require('express');
const router = express.Router();

const applicationsControllers = require('../controllers/applicationsControllers');

router.get('/app', applicationsControllers.getApp);
router.get('/app/:id', applicationsControllers.getId);
router.post('/app', applicationsControllers.postApp);
router.put('/app/:id', applicationsControllers.putApp);

module.exports = router;    