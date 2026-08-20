const { getAllResuturants, postAllResuturants, postResuturantMenu, getResuturantMenu } = require('../controllers/restaurant');

const router = require('express').Router();


router.get('/restaurants',getAllResuturants);
router.post('/restaurants',postAllResuturants);
router.post('/:id/restaurantsMenuItem',postResuturantMenu);
router.get('/:id/restaurantsMenuItem',getResuturantMenu);

module.exports = router;