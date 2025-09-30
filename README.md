{
  "name": "av2---benjamin-maciel",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@prisma/client": "^6.16.1",
    "bcrypt": "^6.0.0",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "mysql2": "^3.14.5",
    "prisma": "^6.16.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}

# API Marketplace Enxuto

## Como rodar o projeto

1. Instale as dependências:
   ```
npm install
   ```
2. Configure o arquivo `.env` com sua URL do banco AlwaysData (já está pronto):
   ```
DATABASE_URL="mysql://429466:d17m0299@mysql-benjaminmaciel.alwaysdata.net/benjaminmaciel_dsw"
   ```
3. Crie as tabelas no banco:
   ```
npx prisma migrate deploy
   ```
4. Gere o client do Prisma:
   ```
npx prisma generate
   ```
5. Inicie a API:
   ```
npm start
   ```

## Endpoints principais

### Usuários
- `POST /api/usuarios` — Cadastrar usuário
- `GET /api/usuarios` — Listar usuários
- `POST /api/login` — Login

### Lojas
- `POST /api/stores` — Cadastrar loja
- `GET /api/stores/:id` — Ver loja (com produtos e usuário)
- `PUT /api/stores/:id` — Editar loja
- `DELETE /api/stores/:id` — Excluir loja

### Produtos
- `POST /api/products` — Cadastrar produto
- `GET /api/products` — Listar produtos (com loja e usuário dono)
- `PUT /api/products/:id` — Editar produto
- `DELETE /api/products/:id` — Excluir produto

## Exemplos de requisição

### Cadastro de usuário
```json
POST /api/usuarios
{
  "name": "Benjamin",
  "email": "benjamin@email.com",
  "senha": "123456"
}
```

### Login
```json
POST /api/login
{
  "email": "benjamin@email.com",
  "senha": "123456"
}
```

### Cadastro de loja
```json
POST /api/stores
{
  "name": "Loja do Benjamin",
  "userId": 1
}
```

### Cadastro de produto
```json
POST /api/products
{
  "name": "Produto X",
  "price": 99.99,
  "storeId": 1
}
```

## Observações
- O projeto está conectado ao banco do AlwaysData.
- Todas as operações podem ser testadas com Postman, Insomnia ou outro cliente HTTP.
- Prints do funcionamento e do banco podem ser enviados para o professor.

---

Qualquer dúvida, só pedir!
