const { getAllResuturants, postAllResuturants, postResuturantMenu, getResuturantMenu } = require('../controllers/restaurant');
const { userMiddlware } = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.get('/restaurants',getAllResuturants);
router.post('/restaurants',userMiddlware,postAllResuturants);
router.post('/:id/restaurantsMenuItem',userMiddlware,postResuturantMenu);
router.get('/:id/restaurantsMenuItem',getResuturantMenu);

module.exports = router;