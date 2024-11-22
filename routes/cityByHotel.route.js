const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');

const cityByHotelController = require('../controllers/cityByHotel.controller');
const validationMiddleware = require('../middlewares/validationMiddleware');
const cityByHotelValidation = require('../validations/cityByHotel.validation');

// Define routes
router.post(
    '/create',
    upload.array('images', 5),
    validationMiddleware(cityByHotelValidation),
    cityByHotelController.createCityByHotel
);
router.get('/', cityByHotelController.getAllCityByHotels);
router.get('/:id', cityByHotelController.getCityByHotelById);
router.get('/city/:cityId', cityByHotelController.getHotelsByCityId);
router.put(
    '/update/:id',
    upload.array('images', 5),
    validationMiddleware(cityByHotelValidation),
    cityByHotelController.updateCityByHotelById
);
router.delete('/:id', cityByHotelController.deleteCityByHotelById);

module.exports = router; // Correct export
