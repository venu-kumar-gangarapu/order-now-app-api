const router = require('express').Router();
const auth =  require('./auth');
const user =  require('./user');
const resuturant = require('./restaurant');
const orders = require('./orders');
const { userMiddlware } = require('../middlewares/authMiddleware');


router.use('/auth',auth);
router.use('/user',user);
router.use('/',resuturant);
router.use('/orders',orders);
module.exports = router;