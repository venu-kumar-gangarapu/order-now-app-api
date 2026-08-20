const Restaurant = require('../models/restaurant.mode');
const RestaurantMenu = require('../models/resturantMenu.model');

exports.getAllResuturants = async (req, res) => {
    try {
        const restaurantList = await Restaurant.find();
        res.status(200).send(restaurantList);
    } catch (error) {
        res.status(200)
    }
}

exports.postAllResuturants = async (req, res) => {
    try {
        // await Restaurant.bulkSave();
        if (req.body) {
            if (Array.isArray(req.body.restaurants)) {
                const restaurantList = await Restaurant.insertMany(req.body.restaurants);
            } else {
                const isResturant = await Restaurant.findOne({ name: req.body.restaurants.name });
                if (isResturant) res.status(200).send("Resturants already present");
                result = await Restaurant.create(req.body.restaurants);
            }
            res.status(200).send("Resturants added");
        } else {
            res.status(500).send("Please add resturant details")
        }
    } catch (error) {
        res.status(200)
    }
}

exports.getResuturant = async (req, res) => {
    try {
        const restaurantList = await Restaurant.findOne({});
        res.status(200).send(restaurantList);
    } catch (error) {
        res.status(200)
    }
}

exports.getResuturantMenu = async (req, res) => {
    try {
        const restaurantList = await RestaurantMenu.findOne({ restaurantId : req.params.id });
        res.status(200).send(restaurantList);
    } catch (error) {
        res.status(200)
    }
}

exports.postResuturantMenu = async (req, res) => {
    try {
        // await Restaurant.bulkSave();
        if (req.body && req.params.id) {
           // const isResturant = await RestaurantMenu.findOne({ restaurantId : req.params.id });
           // if (isResturant) res.status(200).send("Item already present");
            // result =
             await RestaurantMenu.create(req.body.menuItem);
            res.status(201).send("Menu Item added");
        } else {
            res.status(500).send("Please add resturant details");
        }
    } catch (error) {
        res.status(200)
    }
}
