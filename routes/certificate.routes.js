const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificate.controller');

router.get('/', certificateController.fetchAllCertificates);

module.exports = router;