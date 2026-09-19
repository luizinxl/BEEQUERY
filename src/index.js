'use strict';

const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const redirectRoutes = require('./routes/redirect');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Middlewares ──────────────────────────────── */
app.use(cors());
app.use(express.json());

/* ── Rotas ────────────────────────────────────── */
app.use('/api', redirectRoutes);

/* ── Arquivos Estáticos (Frontend) ────────────── */
app.use(express.static('public'));

/* ── Health check (API) ───────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'BeeQuery Backend', version: '1.0.0' });
});

/* ── 404 handler ──────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

/* ── Start ────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`🐝 BeeQuery Backend rodando em http://localhost:${PORT}`);
});

module.exports = app;
