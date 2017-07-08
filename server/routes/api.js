'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;

router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));

// try handling the error here

// router.use(function (req, res) {
//   res.status(404).end();
// });

