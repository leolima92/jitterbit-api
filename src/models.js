const { DataTypes } = require('sequelize');
const sequelize = require('./config');

// Definindo o modelo Order
const Order = sequelize.define('Order', {
  orderId: { type: DataTypes.STRING, primaryKey: true },
  value: { type: DataTypes.FLOAT },
  creationDate: { type: DataTypes.DATE }
}, { timestamps: false });

// Definindo o modelo Item
const Item = sequelize.define('Item', {
  productId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.FLOAT }
}, { timestamps: false });

// Relação entre Order e Item
Order.hasMany(Item, { as: 'items', foreignKey: 'orderId' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = { Order, Item, sequelize };