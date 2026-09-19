'use strict';

const express = require('express');
const router  = express.Router();

const DEFAULT_WHATSAPP = 'https://wa.me/5511999999999';
const DEFAULT_COURSE   = 'https://www.udemy.com/course/power-query-em-excel-aumente-sua-produtividade-no-excel/?instructorPreviewMode=guest&couponCode=KEEPLEARNING';

/**
 * GET /api/redirect/whatsapp
 * Redireciona o usuário para o WhatsApp configurado via env.
 *
 * Query params opcionais:
 *   ?msg=Olá, tenho interesse!  → pré-preenche a mensagem no WhatsApp
 */
router.get('/redirect/whatsapp', (req, res) => {
  const baseUrl = process.env.WHATSAPP_URL || DEFAULT_WHATSAPP;

  // Permite sobrescrever a mensagem via query string
  const customMsg = req.query.msg;
  let destination = baseUrl;

  if (customMsg) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    destination = `${baseUrl}${separator}text=${encodeURIComponent(customMsg)}`;
  }

  // Log simples para auditoria (sem dados sensíveis)
  console.log(`[${new Date().toISOString()}] Redirect → WhatsApp`);

  return res.redirect(302, destination);
});

/**
 * GET /api/redirect/curso
 * Redireciona o usuário para a página do curso.
 */
router.get('/redirect/curso', (_req, res) => {
  const destination = process.env.COURSE_URL || DEFAULT_COURSE;

  console.log(`[${new Date().toISOString()}] Redirect → Curso`);

  return res.redirect(302, destination);
});

/**
 * GET /api/links
 * Retorna os links configurados (sem expor variáveis de ambiente diretamente).
 * Útil para o frontend buscar os URLs via API.
 */
router.get('/links', (_req, res) => {
  return res.json({
    whatsapp: process.env.WHATSAPP_URL || DEFAULT_WHATSAPP,
    curso:    process.env.COURSE_URL    || DEFAULT_COURSE,
  });
});

module.exports = router;
