const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    image:{type:String}
  },
  { _id: false }
);

const restaurantMenuSchema = new Schema(
  {
    restaurantId: { type: String, required: true, index: true },
    count: { type: Number, required: true },
    items: [menuItemSchema],
  }
);

module.exports = mongoose.model("RestaurantMenu", restaurantMenuSchema);