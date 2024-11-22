const cityService = require('../services/city.service');
const path = require('path');

const createCity = async (req, res) => {
    try {
        console.log("ID_PRODUCT", req.body)
        const { city } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!city) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const result = await cityService.createCity({
            city,
            image,
        });

        res.status(201).json({
            message: 'City created successfully',
            city: {
                city,
                image: imageUrl,
            },
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCities = async (req, res) => {
    try {
        const cities = await cityService.getCities();

        if (cities.length === 0) {
            return res.status(404).json({ message: 'Cities not found' });
        }

        const cityWithImageURL = cities.map(city => ({
            ...city,
            image: city.image ? `http://localhost:3000/uploads/${city.image}` : null
        }));

        res.status(200).json(cityWithImageURL);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await cityService.getCityById(id);

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        // Prepend the base URL to the image path if it exists
        city.image = city.image ? `http ://localhost:3000/uploads/${product[0].image}` : null;

        res.status(200).json({ city });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCityById = async (req, res) => {
    try {
        console.log("Request params (ID):", req.params);
        console.log("Request body (city):", req.body.city);
        console.log("Uploaded file:", req.file);

        const { id } = req.params;
        const city = req.body.city;
        const image = req.file ? req.file.filename : null;


        if (!city && !image) {
            console.log("Validation failed: Both fields are missing.");
            return res.status(400).json({ message: "At least one field is required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const updatedCityData = {};
        if (city) updatedCityData.city = city;
        if (image) updatedCityData.image = image;

        const result = await cityService.updateCityById(id, updatedCityData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "City not found" });
        }

        const updatedCity = {
            id,
            city: updatedCityData.city || null,
            image: imageUrl || null,
        };

        res.status(200).json({
            message: 'City updated successfully',
            city: updatedCity
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cityService.deleteCityById(id);

        if (!result) {
            return res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCity,
    getCities,
    getCityById,
    updateCityById,
    deleteCityById
}