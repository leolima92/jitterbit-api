const { Order, Item } = require('./models');

module.exports = {
  // POST /order - Criar pedido com Mapping 
  async createOrder(req, res) {
    try {
      const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

      // Realizando a transformação dos dados conforme o mapping solicitado 
      const newOrder = await Order.create({
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        items: items.map(item => ({
          productId: Number(item.idItem),
          quantity: item.quantidadeItem,
          price: item.valorItem
        }))
      }, { 
        include: [{ model: Item, as: 'items' }] 
      });

      return res.status(201).json(newOrder); // Resposta 201 Created 
    } catch (error) {
      // Tratamento de erros robusto 
      return res.status(400).json({ error: "Erro ao criar pedido", details: error.message });
    }
  },

  // GET /order/:orderId - Obter pedido por parâmetro 
  async getOrder(req, res) {
    try {
      const order = await Order.findOne({ 
        where: { orderId: req.params.orderId },
        include: [{ model: Item, as: 'items' }]
      });
      
      if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
      return res.json(order);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },


  async listOrders(req, res) {
    try {
      const orders = await Order.findAll({ 
        include: [{ model: Item, as: 'items' }] 
      });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar pedidos" });
    }
  }
};