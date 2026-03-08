const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const orderController = require('./src/controller');
const authMiddleware = require('./src/authMiddleware');

const app = express();
const JWT_SECRET = 'jitterbit_secret_2024';

app.use(express.json());

// Configuração Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jitterbit API - Pedidos',
      version: '1.0.0',
      description: 'API com Mapping, SQLite e Autenticação JWT',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica o usuário e gera um Token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: jitterbit123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'jitterbit123') {
    const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ auth: true, token });
  }

  res.status(401).json({ message: 'Login inválido' });
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido com mapping de dados
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *               valorTotal:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: number
 *                     valorItem:
 *                       type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro na validação ou ID duplicado
 */
app.post('/order', authMiddleware, orderController.createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos cadastrados
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 */
app.get('/order/list', authMiddleware, orderController.listOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Busca um pedido específico pelo ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do pedido
 *       404:
 *         description: Pedido não encontrado
 */
app.get('/order/:orderId', authMiddleware, orderController.getOrder);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Documentação em http://localhost:3000/api-docs');
});