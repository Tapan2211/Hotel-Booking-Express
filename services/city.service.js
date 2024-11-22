const cityModel = require('../models/city.model');

const createCity = async (data) => {
    return await cityModel.createCity(data);
}

const getCities = async () => {
    return await cityModel.getCities();
}

const getCityById = async (id) => {
    return await cityModel.getCityById(id);
}

const updateCityById = async (id, data) => {
    console.log("CITY_SERVICE_UPDATE_ID", id)
    return await cityModel.updateCityById(id, data);
}

const deleteCityById = async (id) => {
    console.log("CITY_SERVICE_ID", id)
    return await cityModel.deleteCityById(id);
}

module.exports = {
    createCity,
    getCities,
    getCityById,
    updateCityById,
    deleteCityById,
}