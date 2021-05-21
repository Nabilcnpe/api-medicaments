const express = require('express');
const router = express.Router();

const medocRoutes = require('./routes/medocRoutes.js');

//ROUTES
router.use('/medocs', medocRoutes);

module.exports = router;
