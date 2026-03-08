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
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Jitterbit API - Pedidos',
            version: '1.0.0',
            description: 'API com Mapping, SQLite e Autenticação JWT',
        },
        components: {
            securitySchemes: {
                bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./index.js'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota de Login para gerar Token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'jitterbit123') {
        const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    res.status(401).json({ message: 'Login inválido' });
});

// Rotas Protegidas por JWT
app.post('/order', authMiddleware, orderController.createOrder);
app.get('/order/list', authMiddleware, orderController.listOrders);
app.get('/order/:orderId', authMiddleware, orderController.getOrder);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação em http://localhost:3000/api-docs');
});