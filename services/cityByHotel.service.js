const cityByHotelModel = require('../models/cityByHotel.model');

const createCityByHotel = async (data) => {
    console.log("SERVICE_CREATE", data)
    return await cityByHotelModel.createCityByHotel(data);
}

const getAllCityByHotel = async () => {
    return await cityByHotelModel.getAllCityByHotel();
}

const getCityByHotelById = async (id) => {
    return await cityByHotelModel.getCityByHotelById(id);
}

const getHotelsByCityId = async (cityId) => {
    return await cityByHotelModel.getHotelsByCityId(cityId);
};

const updateCityByHotelById = async (id, data) => {
    return await cityByHotelModel.updateCityByHotelById(id, data);
}

const deleteCityByHotelById = async (id) => {
    return await cityByHotelModel.deleteCityByHotelById(id);
}

module.exports = {
    createCityByHotel,
    getAllCityByHotel,
    getCityByHotelById,
    getHotelsByCityId,
    updateCityByHotelById,
    deleteCityByHotelById
}