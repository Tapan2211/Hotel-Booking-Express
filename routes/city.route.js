const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const cityController = require('../controllers/city.controller');
const validationMiddleware = require('../middlewares/registrationMiddleware');
const cityValidation = require('../validations/city.validation');
const upload = require('../middlewares/upload.middleware');

// Route to create a new city with an image
router.post('/create', upload.single('image'), validationMiddleware(cityValidation), cityController.createCity);
router.get('/', cityController.getCities);
router.get('/:id', cityController.getCityById);
router.put('/update/:id', upload.single('image'), cityController.updateCityById);
router.delete('/:id', cityController.deleteCityById);

module.exports = router;
