const bcrypt = require('bcrypt');
const { prisma } = require('../prisma/client');

// POST /api/usuarios  { name?, email, senha }
async function createUser(req, res) {
  try {
    const { name, email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios' });

    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) return res.status(409).json({ error: 'Email já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);
    const user = await prisma.user.create({
      data: { name: name ?? null, email, senha: hash },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// GET /api/usuarios
async function listUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true, store: true }
    });
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// POST /api/login { email, senha }
async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

    // Para AV2 não é necessário JWT; retornamos dados básicos
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = { createUser, listUsers, login };
