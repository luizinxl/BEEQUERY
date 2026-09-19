# BeeQuery Backend 🐝

Backend da **BeeQuery Landing Page** — Node.js + Express com rotas de redirecionamento para WhatsApp e página do curso.

## Rotas disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Health check |
| `GET` | `/api/links` | Retorna os links configurados |
| `GET` | `/api/redirect/whatsapp` | Redireciona para o WhatsApp |
| `GET` | `/api/redirect/whatsapp?msg=Olá` | Redireciona com mensagem pré-preenchida |
| `GET` | `/api/redirect/curso` | Redireciona para a página do curso |

## Configuração

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o `.env` com seus links reais:
```env
PORT=3000
WHATSAPP_URL=https://wa.me/5511999999999?text=Olá!
COURSE_URL=https://hotmart.com/produto/beequery
```

### 3. Rodando

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## Deploy sugerido

- [Railway](https://railway.app) — deploy grátis com 1 clique via GitHub
- [Render](https://render.com) — plano free com sleep
- [Fly.io](https://fly.io) — containers globais

## Estrutura

```
beequery-backend/
├── src/
│   ├── index.js          # Entry point Express
│   └── routes/
│       └── redirect.js   # Rotas de redirecionamento
├── .env.example
├── .gitignore
└── package.json
```
