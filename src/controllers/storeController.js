const { prisma } = require('../prisma/client');

// POST /api/stores { name, userId }
async function createStore(req, res) {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) return res.status(400).json({ error: 'name e userId são obrigatórios' });

    // Garante que o user existe e ainda não tem store (unique userId já ajuda)
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const store = await prisma.store.create({
      data: { name, userId: Number(userId) }
    });
    res.status(201).json(store);
  } catch (e) {
    // Unique constraint de userId -> uma loja por usuário
    res.status(400).json({ error: e.message });
  }
}

// GET /api/stores/:id -> inclui user e products
async function getStoreById(req, res) {
  try {
    const id = Number(req.params.id);
    const store = await prisma.store.findUnique({
      where: { id },
      include: { user: true, products: true }
    });
    if (!store) return res.status(404).json({ error: 'Loja não encontrada' });
    res.json(store);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// PUT /api/stores/:id { name }
async function updateStore(req, res) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const store = await prisma.store.update({
      where: { id },
      data: { name }
    });
    res.json(store);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// DELETE /api/stores/:id
async function deleteStore(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.store.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = { createStore, getStoreById, updateStore, deleteStore };
