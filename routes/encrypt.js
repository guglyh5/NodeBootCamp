const { Router } = require('express');
const express = require('express');
const {
    encryptData
} = require('../controllers/encrypt');

const router = express.Router();

router
    .route('/')
    .post(encryptData);

module.exports = router;