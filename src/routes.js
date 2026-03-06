const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/order', controller.createOrder); // POST /order - Criar pedido com Mapping      
router.get('/order/list', controller.listOrders);  // GET /order/list - Listar todos os pedidos
router.get('/order/:orderId', controller.getOrder); // GET /order/:orderId - Obter pedido por parâmetro

module.exports = router;