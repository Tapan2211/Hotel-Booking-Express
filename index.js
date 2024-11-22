const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const db = require('./config/db');
// require('dotenv').config();

const userRoute = require('./routes/user.route');
const cities = require('./routes/city.route');
const cityByHotelRouter = require('./routes/cityByHotel.route');

const app = express();

// Set up multer for file upload (temporary storage for the image)
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
// Enable CORS
app.use(cors());
app.options("*", cors());

app.use('/api/users', userRoute);
app.use('/api/cities', cities);
app.use('/api/cityByHotel', cityByHotelRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});