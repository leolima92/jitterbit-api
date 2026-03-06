# Desafio Técnico - API de Pedidos Jitterbit

Esta API foi desenvolvida como parte do processo seletivo da Jitterbit. O objetivo do projeto é receber pedidos em um formato JSON específico, realizar a transformação dos dados (**Mapping**) e persistir as informações em um banco de dados relacional.

## Tecnologias Utilizadas

* **Node.js**: Plataforma de execução do servidor.
* **Express**: Framework para criação das rotas da API.
* **Sequelize**: ORM para gerenciamento e modelagem do banco de dados.
* **SQLite**: Banco de dados relacional que roda em arquivo local, facilitando a execução sem dependências externas.
* **Nodemon**: Ferramenta para reinicialização automática do servidor durante o desenvolvimento.

##  Como Rodar o Projeto

1. **Instale as dependências**: No terminal, dentro da pasta do projeto, execute:
```bash
npm install

```


2. **Inicie o servidor**:
```bash
npm run dev

```


*O servidor iniciará na porta **3000** e o banco de dados será criado automaticamente no arquivo **database.sqlite***.

## 📌 Endpoints da API

* **POST `/order**`: Recebe um pedido e realiza o mapeamento dos campos.
* **GET `/order/:orderId**`: Busca um pedido específico pelo ID informado.
* **GET `/order/list**`: Lista todos os pedidos cadastrados no sistema.

## Como Realizar os Testes

Para validar a API e o funcionamento do **Mapping** (transformação de campos como `numeroPedido` para `orderId`), utilize os comandos abaixo no **PowerShell**:

### 1. Criar um Pedido (POST)

```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/order' -Method Post -ContentType 'application/json' -Body '{"numeroPedido": "123", "valorTotal": 1000, "dataCriacao": "2024-01-01T10:00:00Z", "items": [{"idItem": "1", "quantidadeItem": 1, "valorItem": 1000}]}'

```

*(Você também pode utilizar o ID original do teste: `v10089015vdb-01`)*.

### 2. Buscar o Pedido Criado (GET)

```powershell
Invoke-RestMethod -Uri 'http://localhost:3000/order/123' -Method Get

```

## 📸 Evidências de Teste

* **Inicialização**: Servidor rodando e banco SQLite pronto.
* <img width="926" height="271" alt="image" src="https://github.com/user-attachments/assets/ab53aaf7-5ae4-4b72-98da-456ad967472e" />

* **Mapping**: Sucesso na criação do pedido com a conversão de campos de entrada para o modelo de banco de dados.
* <img width="1357" height="114" alt="image" src="https://github.com/user-attachments/assets/74ae4724-02d0-41e5-bde5-01cffc66c278" />

* **Consulta**: Recuperação correta dos dados persistidos via parâmetro de URL.
* <img width="1074" height="114" alt="image" src="https://github.com/user-attachments/assets/be97c5c9-e5c3-4018-a333-61cb55c5899e" />

  
