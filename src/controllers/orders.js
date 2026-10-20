const Orders = require("../models/orders.model");

exports.postOrder = async (req,res)=>{    
    try {
        const data = req.body;
        const user = req.user || data.userId || data.user;

        // Reject if no paymentId provided
        if (!data.paymentId) {
            return res.status(400).send({ message: 'Payment ID is required to place an order', success: false });
        }

        // Check if an order already exists for this paymentId
        const existingOrder = await Orders.findOne({ paymentId: data.paymentId, status: 'pending' });

        if (existingOrder) {
            // Same paymentId: add/append products to this existing order
            const updatedOrder = await Orders.findByIdAndUpdate(
                existingOrder._id,
                {
                    $push: { productDetails: { $each: data.productDetails } },
                    $inc: { totalAmount: data.totalAmount }
                },
                { new: true }
            );
            res.status(200).send({ message: 'Products added to existing order', order: updatedOrder });
        } else {
            // New paymentId: create a separate new order
            const saveOrder = await Orders.create({ ...req.body, userId: user, status: 'pending' });
            if (saveOrder) {
                res.status(201).send({ message: 'Order in pending state', order: saveOrder });
            } else {
                res.status(400).send({ message: 'Failed to create order' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

exports.getOrders = async (req,res)=>{
    try {
        const user = req.user;
        const saveOrder = await Orders.find({userId:user});
        if(saveOrder){
            res.status(201).send(saveOrder);
        }else{
           res.status(201).send("error");
        }
    } catch (error) {
        res.status(401)
    }
}

exports.getOrder = async (req,res)=>{
    try {
        const id = req.params.id;        
        const order = await Orders.findOne({_id:id});
        if(order){
            res.status(201).send(order);
        }else{
           res.status(201).send("error");
        }
    } catch (error) {
        res.status(401)
    }
}

exports.patchOrder = async (req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const order = await Orders.findOneAndUpdate({_id:id},{...req.body,userId:req.user});
        if(order && req.user){
            const orderUpdated = await Orders.findOne({_id:id});
            res.status(200).send({message : 'Order Updated'});
        }else{
           res.status(400).send("error");
        }
    } catch (error) {
        res.status(401) 
    }
}

exports.deleteOrder = async (req,res)=>{
    try {
        const id = req.params.id;
        const orderUpdated = await Orders.findOne({_id:id});
        if(req.user && orderUpdated){
            const order = await Orders.deleteOne({_id:id});
            if (order.acknowledged) {                
                res.status(200).send({message : 'Order Deleted'});
            }
        }else {
            res.status(400).send({message : 'Order Doesnt exists'});
        }
    } catch (error) {
        res.status(401)
    }
}