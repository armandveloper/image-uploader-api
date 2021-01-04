const { Router } = require('express');
const { uploadImage } = require('../controllers/index.controller');

const router = Router();

router.post('/images', uploadImage);

module.exports = router;
