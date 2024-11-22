const Joi = require('joi');

const cityByHotelSchema = Joi.object({
    cityId: Joi.number().required(),
    hotelName: Joi.string().required(),
    originalPrice: Joi.number().required(),
    discountPercentage: Joi.number().min(0).max(100).required(),
    rating: Joi.number().min(0).max(5).required(),
    facilities: Joi.array().items(Joi.string()).required(),
    roomTypes: Joi.array().items(Joi.string()).required(),
    description: Joi.string().optional(),
    images: Joi.array().items(Joi.string().required()),
});

module.exports = cityByHotelSchema;
