const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    rating: mongoose.Schema.Types.Double,
    priceForTwo: Number,
    location: String,
    distance: String,
    openingTime: String,
    offer: String,
    image: String
});

module.exports = mongoose.model("Restaurant",restaurantSchema);