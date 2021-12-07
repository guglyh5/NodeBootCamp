const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    UpdateBootcamp,
    DeleteBootcamp
} = require('../controllers/bootcamps');

const router = express.Router();

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(UpdateBootcamp)
    .delete(DeleteBootcamp)

// router
//     .route('/encrypt')
//     .post(encryptData)

module.exports = router;