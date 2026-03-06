# Desafio Técnico - API de Pedidos Jitterbit

Esta é uma API desenvolvida em **Node.js** para o processo seletivo da Jitterbit. A aplicação recebe pedidos em um formato JSON específico, realiza a transformação dos dados (**Mapping**) e os persiste em um banco de dados SQL.

## Tecnologias Utilizadas

* **Node.js** e **Express** (Servidor e Rotas)
* **Sequelize** (ORM para banco de dados)
* **SQLite** (Banco de dados SQL em arquivo, dispensa instalação externa)
* **Nodemon** (Ambiente de desenvolvimento)

## 🛠️ Como rodar o projeto

1. Clone o repositório.
2. No terminal, instale as dependências:
```bash
npm install

```


3. Inicie o servidor:
```bash
npm run dev

```


4. O servidor estará rodando em `http://localhost:3000`.

##  Endpoints

* **POST `/order**`: Recebe o pedido original e realiza o mapping para os campos `orderId`, `value`, `creationDate` e `items` (`productId`, `quantity`, `price`).
* **GET `/order/:orderId**`: Busca um pedido específico pelo ID.
* **GET `/order/list**`: Lista todos os pedidos cadastrados.

## Teste Realizado

O seguinte comando foi utilizado para validar a funcionalidade através do PowerShell:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/order' -Method Post -ContentType 'application/json' -Body '{"numeroPedido": "v10089015vdb-01", "valorTotal": 10000, "dataCriacao": "2023-07-19T12:24:11.5299601+00:00", "items": [{"idItem": "2434", "quantidadeItem": 1, "valorItem": 1000}]}'

```
