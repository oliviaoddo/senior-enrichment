'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();


router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));
router.use('/auth/google', require('../routes/auth/google'));
router.use('/auth/me', require('../routes/auth/me'));

// try handling the error here

// router.use(function (req, res) {
//   res.status(404).end();
// });

module.exports = router;
