const router = require('express').Router();
const { userMiddlware } = require('../middlewares/authMiddleware');
const { postOrder, getOrders, getOrder, patchOrder, deleteOrder } = require('../controllers/orders.js');

router.get('/',userMiddlware,getOrders);
router.post('/',userMiddlware,postOrder);
router.get('/:id',userMiddlware,getOrder);
router.patch('/:id',userMiddlware,patchOrder);
router.delete('/:id',userMiddlware,deleteOrder);


module.exports = router;