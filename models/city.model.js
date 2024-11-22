const db = require('../config/db');

const createCity = async (data) => {
    const { city, image } = data;
    const query = `INSERT INTO cities (city, image, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`;
    const [result] = await db.execute(query, [city, image]);
    if (result.affectedRows === 0) {
        throw new Error('City creation failed');
    }
    return {
        id: result.insertId,
        city,
        image,
    };
}

const getCities = async () => {
    const query = `SELECT * FROM cities`;
    const [results] = await db.execute(query);
    return results;
}

const getCityById = async (id) => {
    const query = `SELECT * FROM cities WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
}

const updateCityById = async (id, data) => {
    const { city, image } = data;
    console.log("CITY_MODEL_ID", city, image)
    const query = `UPDATE cities SET city = ?, image = ? WHERE id = ?`;
    const [result] = await db.execute(query, [city, image, id]);
    return result;
}

const deleteCityById = async (id) => {
    console.log("CITY_MODEL_ID", id)
    const query = `DELETE FROM cities WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    createCity,
    getCities,
    getCityById,
    updateCityById,
    deleteCityById
}