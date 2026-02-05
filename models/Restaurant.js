

const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurant_id:{
        type: String
    },
    address:{
        type:Object
    },
    cuisine:{
        type:String
    },
    name:{
        type:String
    },
    city:{
        type:String
    }
}, { 
    collection: 'restaurants',
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;