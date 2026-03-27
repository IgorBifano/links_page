# Links Page Workspace

Workspace com frontend em Next.js e backend dedicado para captura de leads, automacao de e-mails e operacao da lista de espera.

## Pastas

- `frontend/`: hub premium e paginas de captura
- `backend/`: API, persistencia SQLite, automacoes de e-mail e endpoints admin
- `docs/`: instrucoes e tarefas
- `scripts/`: utilitarios de manutencao

## Como rodar localmente

1. Backend
   `cd backend`
   `copy .env.example .env`
   `npm install`
   `npm run dev`

2. Frontend
   `cd frontend`
   `npm install`
   `npm run dev`

O frontend espera a API em `NEXT_PUBLIC_API_BASE_URL` e, por padrao, usa `http://localhost:4000`.

## Variaveis de ambiente

Backend:
- `PORT`
- `FRONTEND_BASE_URL`
- `ALLOWED_ORIGINS`
- `LEAD_DB_PATH`
- `LEAD_SEQUENCE_DELAY_MINUTES`
- `EMAIL_PROVIDER`
- `EMAIL_FROM`
- `RESEND_API_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_SECURE`
- `ADMIN_API_KEY`

Frontend:
- `NEXT_PUBLIC_API_BASE_URL`

## Rotas principais

Frontend:
- `/`
- `/lista-espera`
- `/unsubscribe`

Backend:
- `POST /api/leads`
- `POST /api/leads/unsubscribe`
- `GET /api/admin/leads`
- `GET /api/admin/leads/:leadId/logs`

## Fluxo do lead

1. O visitante entra em `/lista-espera`
2. O formulario envia nome, e-mail, origem e consentimento para `POST /api/leads`
3. O backend valida, impede duplicidade e salva no SQLite
4. Dois jobs iniciais sao agendados
5. O worker em background envia o e-mail de entrada na lista e depois o de apresentacao da formacao
6. Cada envio gera log em `email_logs`
7. O link de descadastro marca o lead como `unsubscribed` e cancela novos envios pendentes

## Como testar manualmente

1. Suba backend e frontend
2. Acesse `http://localhost:3000/lista-espera`
3. Envie um cadastro
4. Confira o banco em `backend/storage/leads.sqlite`
5. Confira os logs no terminal se `EMAIL_PROVIDER=console`
6. Teste duplicidade reenviando o mesmo e-mail
7. Teste descadastro usando o link gerado no e-mail

## Observacao operacional

O frontend continua compativel com GitHub Pages, mas a API de leads precisa ficar hospedada separadamente para producao, porque GitHub Pages nao executa backend.
