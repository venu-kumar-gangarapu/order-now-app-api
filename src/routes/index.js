const router = require('express').Router();
const auth =  require('./auth');
const user =  require('./user');
const resuturant = require('./restaurant');
const { userMiddlware } = require('../middlewares/authMiddleware');


router.use('/auth',auth);
router.use('/user',user);
router.use('/',resuturant);
module.exports = router;