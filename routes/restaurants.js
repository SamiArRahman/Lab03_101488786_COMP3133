const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

router.get('/', async (req, res) => {
  try {
    const { sortBy } = req.query;
  
    if (sortBy) {
      const sortOrder = sortBy.toUpperCase() === 'ASC' ? 1 : -1;
      const restaurants = await Restaurant.find(
        {},
        { 
          _id: 1, 
          cuisine: 1, 
          name: 1, 
          city: 1, 
          restaurant_id: 1 
        }
      ).sort({ restaurant_id: sortOrder });
      
      return res.status(200).json(restaurants);
    }

    const restaurants = await Restaurant.find({});
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching restaurants', 
      error: error.message 
    });
  }
});

router.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const { cuisine } = req.params;
    const restaurants = await Restaurant.find({ cuisine: cuisine });
    
    if (restaurants.length === 0) {
      return res.status(404).json({ 
        message: `No restaurants found with cuisine: ${cuisine}` 
      });
    }
    
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching restaurants by cuisine', 
      error: error.message 
    });
  }
});

router.get('/:cuisine', async (req, res) => {
  try {
    const { cuisine } = req.params;
    
    const restaurants = await Restaurant.find(
      {
        cuisine: cuisine,
        city: { $ne: 'Brooklyn' }
      },
      {
        _id: 0,  
        cuisine: 1,
        name: 1,
        city: 1
      }
    ).sort({ name: 1 });  
    
    if (restaurants.length === 0) {
      return res.status(404).json({ 
        message: `No ${cuisine} restaurants found outside Brooklyn` 
      });
    }
    
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching restaurants', 
      error: error.message 
    });
  }
});

module.exports = router;