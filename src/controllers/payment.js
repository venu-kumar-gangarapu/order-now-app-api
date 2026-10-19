const crypto = require('crypto');
const Orders = require('../models/orders.model');

/**
 * POST /payment/generate
 * Body: { amount: Number }
 * Generates a unique payment ID for the given amount.
 */
exports.generatePayment = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            return res.status(400).send({ message: 'A valid amount is required', success: false });
        }
        // Generate a unique payment ID: PAY-<timestamp>-<random hex>
        const timestamp = Date.now();
        const randomPart = crypto.randomBytes(6).toString('hex').toUpperCase();
        const paymentId = `PAY-${timestamp}-${randomPart}`;
        res.status(201).send({
            success: true,
            paymentId,
            amount: Number(amount),
            message: 'Payment ID generated successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', success: false });
    }
};

/**
 * POST /payment/accept
 * Body: { paymentId: String }
 * Finds the matching pending order and marks it as confirmed.
 */
exports.acceptPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const userId = req.user;

        if (!paymentId) {
            return res.status(400).send({ message: 'Payment ID is required', success: false });
        }

        // Find pending order matching this paymentId and user
        const order = await Orders.findOne({ paymentId, userId, status: 'pending' });

        if (!order) {
            return res.status(404).send({ message: 'No pending order found for this payment ID', success: false });
        }

        // Confirm the order
        order.status = 'confirmed';
        await order.save();

        res.status(200).send({
            success: true,
            message: 'Payment accepted. Order confirmed.',
            order
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', success: false });
    }
};