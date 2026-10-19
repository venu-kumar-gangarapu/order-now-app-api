const router = require('express').Router();
const { userMiddlware } = require('../middlewares/authMiddleware');
const { generatePayment, acceptPayment } = require('../controllers/payment');

// POST /payment/generate  —  body: { amount }
router.post('/generate', userMiddlware, generatePayment);

// POST /payment/accept  —  body: { paymentId }
router.post('/accept', userMiddlware, acceptPayment);

module.exports = router;
