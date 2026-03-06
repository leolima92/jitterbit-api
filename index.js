require('dotenv').config();
const express = require('express');
const { sequelize } = require('./src/models');
const routes = require('./src/routes');

const app = express();
app.use(express.json());
app.use(routes);

// Sincroniza o banco e sobe o servidor
sequelize.sync().then(() => {
  console.log("Banco SQL (SQLite) pronto!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});