const mongoose = require("mongoose");


const OrdersModel = new mongoose.Schema({
    userId: String,
    productDetails: [{
        itemName: String,
        quantity:  Number,
        price:  Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
        default: "pending"
    },
}, {
    timestamps: true
}
);

module.exports = mongoose.model("Orders",OrdersModel)