const express = require('express');
const router = express.Router();

const {
    getMedocs,
    searchMedocs
} = require('../controllers/medocController');

router.get('/', getMedocs);

router.get('/search?', searchMedocs);

module.exports = router;
