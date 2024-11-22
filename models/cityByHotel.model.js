const db = require('../config/db');

const createCityByHotel = async (data) => {
    const { cityId, hotelName, images, originalPrice, discountPercentage, rating, facilities, roomTypes, description } = data;
    console.log("MODEL_CREATE", data)
    const query = `INSERT INTO cityByHotel (cityId, hotelName, images, originalPrice, discountPercentage, rating, facilities, roomTypes, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    const [result] = await db.execute(query, [cityId, hotelName, images, originalPrice, discountPercentage, rating, facilities, roomTypes, description]);
    return result;
}

const getAllCityByHotel = async () => {
    const query = `
        SELECT cityByHotel.*, cities.city 
        FROM cityByHotel
        JOIN cities ON cityByHotel.cityId = cities.id`;
    const [results] = await db.execute(query);
    return results;
}

const getCityByHotelById = async (id) => {
    const query = `
        SELECT cityByHotel.*, cities.city 
        FROM cityByHotel
        JOIN cities ON cityByHotel.cityId = cities.id
        WHERE cityByHotel.id = ?`;
    const [result] = await db.execute(query, [id]);
    return result[0];
}

const getHotelsByCityId = async (cityId) => {
    const query = `
        SELECT cityByHotel.*, cities.city
        FROM cityByHotel
        JOIN cities ON cityByHotel.cityId = cities.id
        WHERE cityByHotel.cityId = ?`;
    const [results] = await db.execute(query, [cityId]);
    return results;
};


// const getAllCityByHotel = async () => {
//     const query = `SELECT * FROM cityByHotel`;
//     const [results] = await db.execute(query);
//     return results;
// }

// const getCityByHotelById = async (id) => {
//     const query = `SELECT * FROM cityByHotel WHERE id = ?`;
//     const [result] = await db.execute(query, [id]);
//     return result[0];
// }

// const getHotelsByCityId = async (cityId) => {
//     const query = `SELECT * FROM cityByHotel WHERE cityId = ?`;
//     const [results] = await db.execute(query, [cityId]);
//     return results;
// };

const updateCityByHotelById = async (id, data) => {
    const query = `
    UPDATE cityByHotel
    SET cityId = ?, hotelName = ?, images = ?, originalPrice = ?, discountPercentage = ?, rating = ?, facilities = ?, roomTypes = ?, description = ?, updatedAt = NOW()
    WHERE id = ?`;
    const [result] = await db.execute(query, [
        data.cityId,
        data.hotelName,
        data.images,
        data.originalPrice,
        data.discountPercentage,
        data.rating,
        data.facilities,
        data.roomTypes,
        data.description,
        id,
    ]);
    return result;
}

const deleteCityByHotelById = async (id) => {
    const query = `DELETE FROM cityByHotel WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
};

module.exports = {
    createCityByHotel,
    getAllCityByHotel,
    getCityByHotelById,
    getHotelsByCityId,
    updateCityByHotelById,
    deleteCityByHotelById
}