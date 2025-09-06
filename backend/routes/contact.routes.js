const express = require('express');
const { handleContactSubmit } = require('../controllers/contact.controller');

const router = express.Router();

router.post('/', handleContactSubmit);

module.exports = router;