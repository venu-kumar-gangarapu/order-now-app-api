const router = require('express').Router();
const auth =  require('./auth');
const user =  require('./user');
const resuturant = require('./restaurant');
const orders = require('./orders');
const payment = require('./payment');
const { userMiddlware } = require('../middlewares/authMiddleware');


router.use('/auth',auth);
router.use('/user',user);
router.use('/',resuturant);
router.use('/orders',orders);
router.use('/payment',payment);
module.exports = router;