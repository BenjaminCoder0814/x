
require('dotenv').config();
const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API Marketplace Enxuto' });
});

// Prefixo /api
app.use('/api/user', usuarioRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/product', productRoutes);

// Handler básico de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});