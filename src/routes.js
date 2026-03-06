const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/order', controller.createOrder);        
router.get('/order/list', controller.listOrders);     
router.get('/order/:orderId', controller.getOrder);   

module.exports = router;