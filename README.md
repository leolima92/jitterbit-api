Desafio Técnico - API de Pedidos Jitterbit
Esta API foi desenvolvida como parte do processo seletivo da Jitterbit. O objetivo do projeto é receber pedidos em um formato JSON específico, realizar a transformação dos dados (Mapping) e persistir as informações em um banco de dados relacional.

🚀 Tecnologias Utilizadas
Node.js: Plataforma de execução do servidor.

Express: Framework para criação das rotas da API.

Sequelize: ORM para gerenciamento e modelagem do banco de dados.

SQLite: Banco de dados relacional que roda em arquivo local.

JWT (JSON Web Token): Autenticação para proteção dos endpoints.

Swagger: Documentação interativa da API.

🛠️ Como Rodar o Projeto
Instale as dependências:

Bash

npm install
Inicie o servidor:

Bash

npm run dev
O servidor iniciará na porta 3000 e o banco de dados será criado automaticamente no arquivo database.sqlite.

🔐 Autenticação e Endpoints
Para garantir a segurança, as rotas de pedidos exigem um token de acesso.

POST /login: Gera o token de acesso (Usuário: admin / Senha: jitterbit123).

POST /order: Recebe um pedido e realiza o mapeamento dos campos (Protegido).

GET /order/:orderId: Busca um pedido específico pelo ID (Protegido).

GET /order/list: Lista todos os pedidos cadastrados (Protegido).

🧪 Como Realizar os Testes
Utilize os comandos abaixo no PowerShell para validar o fluxo completo:

1. Obter Token de Acesso (Login)
PowerShell

$auth = Invoke-RestMethod -Uri 'http://localhost:3000/login' -Method Post -ContentType 'application/json' -Body '{"username": "admin", "password": "jitterbit123"}'
2. Criar um Pedido (POST)
PowerShell

Invoke-RestMethod -Uri 'http://localhost:3000/order' -Method Post -Headers @{Authorization="Bearer $($auth.token)"} -ContentType 'application/json' -Body '{"numeroPedido": "123", "valorTotal": 1000, "items": [{"idItem": "1", "quantidadeItem": 1, "valorItem": 1000}]}'
3. Buscar o Pedido Criado (GET)
PowerShell

Invoke-RestMethod -Uri 'http://localhost:3000/order/123' -Method Get -Headers @{Authorization="Bearer $($auth.token)"}
📖 Documentação Swagger
Acesse a interface interativa para testar os endpoints diretamente pelo navegador:
http://localhost:3000/api-docs

## 📸 Evidências de Teste

* **Inicialização**: Servidor rodando e banco SQLite pronto.
* <img width="926" height="271" alt="image" src="https://github.com/user-attachments/assets/ab53aaf7-5ae4-4b72-98da-456ad967472e" />

* **Mapping**: Sucesso na criação do pedido com a conversão de campos de entrada para o modelo de banco de dados.
* <img width="1357" height="114" alt="image" src="https://github.com/user-attachments/assets/74ae4724-02d0-41e5-bde5-01cffc66c278" />

* **Consulta**: Recuperação correta dos dados persistidos via parâmetro de URL.
* <img width="1074" height="114" alt="image" src="https://github.com/user-attachments/assets/be97c5c9-e5c3-4018-a333-61cb55c5899e" />

  
