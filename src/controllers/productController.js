const { prisma } = require('../prisma/client');

// POST /api/products { name, price, storeId }
async function createProduct(req, res) {
  try {
    const { name, price, storeId } = req.body;

    if (!name || price === undefined || storeId === undefined) {
      return res.status(400).json({ error: 'Campos name, price e storeId são obrigatórios' });
    }

    const storeIdNum = Number(storeId);
    const priceNum = Number(price);

    if (isNaN(storeIdNum) || isNaN(priceNum)) {
      return res.status(400).json({ error: 'storeId e price devem ser números válidos' });
    }

    const store = await prisma.store.findUnique({ where: { id: storeIdNum } });
    if (!store) {
      return res.status(404).json({ error: 'Loja não encontrada' });
    }

    const product = await prisma.product.create({
      data: { name, price: priceNum, storeId: storeIdNum }
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({ error: 'Erro interno ao criar produto' });
  }
}

// GET /api/products -> inclui store e user dono
async function listProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });

    return res.json(products);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({ error: 'Erro interno ao listar produtos' });
  }
}

// PUT /api/products/:id { name?, price? }
async function updateProduct(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (price !== undefined) {
      const priceNum = Number(price);
      if (isNaN(priceNum)) {
        return res.status(400).json({ error: 'price deve ser um número válido' });
      }
      data.price = priceNum;
    }

    const product = await prisma.product.update({
      where: { id },
      data
    });

    return res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ error: 'Erro interno ao atualizar produto' });
  }
}

// DELETE /api/products/:id
async function deleteProduct(req, res) {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({ where: { id } });

    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar produto' });
  }
}

module.exports = {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct
};
