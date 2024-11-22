const cityByHotelService = require('../services/cityByHotel.service');
const { message } = require('../validations/cityByHotel.validation');

const createCityByHotel = async (req, res) => {
    try {
        const data = req.validatedData;

        // Base URL for images (adjust as per your server setup)
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

        // Prepare data for insertion
        const images = req.files
            ? req.files.map(file => `${baseUrl}/${file.filename}`)
            : [];

        const newCityByHotel = {
            ...data,
            images,
            facilities: data.facilities, // Already parsed as array
            roomTypes: data.roomTypes,   // Already parsed as array
        };

        // Insert into database
        const result = await cityByHotelService.createCityByHotel({
            ...newCityByHotel,
            images: JSON.stringify(images), // Save as JSON string
            facilities: JSON.stringify(data.facilities), // Save as JSON string
            roomTypes: JSON.stringify(data.roomTypes), // Save as JSON string
        });

        // Add the inserted ID to the response
        newCityByHotel.id = result.insertId;

        res.status(201).json({
            message: 'CityByHotel created successfully',
            data: newCityByHotel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllCityByHotels = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

        const result = await cityByHotelService.getAllCityByHotel();
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'CityByHotel not found' });
        }

        // Process result to include full image URLs and parse JSON fields
        const processedResult = result.map(item => ({
            ...item,
            images: JSON.parse(item.images).map(image => `${baseUrl}/${image}`), // Full URL for images
            facilities: JSON.parse(item.facilities), // Parse JSON string to array
            roomTypes: JSON.parse(item.roomTypes), // Parse JSON string to array
        }));

        res.status(200).json(processedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getCityByHotelById = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the data from the service
        const result = await cityByHotelService.getCityByHotelById(id);

        if (!result) {
            return res.status(404).json({ message: 'CityByHotel not found' });
        }

        // Process the result to format the images and remove unwanted characters
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`; // Construct full URL

        const processedResult = {
            ...result,
            images: JSON.parse(result.images).map(image => `${baseUrl}/${image}`), // Full URL for images
            facilities: JSON.parse(result.facilities), // Parse facilities array
            roomTypes: JSON.parse(result.roomTypes), // Parse room types array
        };

        res.status(200).json(processedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getHotelsByCityId = async (req, res) => {
    try {
        const { cityId } = req.params;

        const result = await cityByHotelService.getHotelsByCityId(cityId);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No hotels found for the given city ID' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;
        const processedResult = result.map(item => ({
            ...item,
            images: JSON.parse(item.images).map(image => `${baseUrl}/${image}`),
            facilities: JSON.parse(item.facilities),
            roomTypes: JSON.parse(item.roomTypes),
        }));

        res.status(200).json(processedResult);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: error.message });
    }
};


const updateCityByHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityId, hotelName, originalPrice, discountPercentage, rating, facilities, roomTypes, description } = req.body;
        const images = req.files ? req.files.map(file => file.filename) : [];

        const result = await cityByHotelService.updateCityByHotelById(id, {
            cityId,
            hotelName,
            images: JSON.stringify(images),
            originalPrice,
            discountPercentage,
            rating,
            facilities: JSON.stringify(facilities),
            roomTypes: JSON.stringify(roomTypes),
            description,
        });

        if (!result.affectedRows) {
            return res.status(404).json({ message: 'CityByHotel not found' });
        }

        const updatedData = await cityByHotelService.getCityByHotelById(id);

        const processedUpdatedData = {
            ...updatedData,
            images: JSON.parse(updatedData.images).map(image => `${req.protocol}://${req.get('host')}/uploads/${image}`),
            facilities: JSON.parse(updatedData.facilities),
            roomTypes: JSON.parse(updatedData.roomTypes),
        };

        res.status(200).json({
            message: 'CityByHotel updated successfully',
            data: processedUpdatedData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCityByHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cityByHotelService.deleteCityByHotelById(id);

        if (!result) {
            return res.status(404).json({ message: 'CityByHotel not found' });
        }

        res.status(200).json({ message: 'CityByHotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCityByHotel,
    getAllCityByHotels,
    getCityByHotelById,
    getHotelsByCityId,
    updateCityByHotelById,
    deleteCityByHotelById
}