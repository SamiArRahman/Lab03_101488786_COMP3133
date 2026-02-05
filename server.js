require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose')
const restaurantRoutes = require('./routes/restaurants')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI,{
    
}).then(()=> {
    console.log("Connected to MongoDB Atlas");
}).catch((error) =>{
    console.log("Error",error);
    process.exit(1);
});


app.use('/restaurants', restaurantRoutes)


app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Restaurant API',
    endpoints: [
      'GET /restaurants - Get all restaurants',
      'GET /restaurants?sortBy=ASC - Get restaurants sorted by restaurant_id (ASC)',
      'GET /restaurants?sortBy=DESC - Get restaurants sorted by restaurant_id (DESC)',
      'GET /restaurants/cuisine/:cuisine - Get restaurants by cuisine',
      'GET /restaurants/:cuisine - Get restaurants by cuisine excluding Brooklyn'
    ]
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
