# Backend

API dedicada ao fluxo de captacao de leads e automacao inicial de e-mails.

## Responsabilidades

- persistir leads em SQLite
- validar cadastro e impedir duplicidade
- agendar e executar a sequencia inicial de e-mails
- registrar logs de envio
- permitir descadastro
- expor endpoints admin para consulta futura

## Como rodar

1. `copy .env.example .env`
2. `npm install`
3. `npm run dev`

## Provedores de e-mail

- `console`: desenvolvimento local
- `smtp`: servidor SMTP tradicional
- `resend`: integracao via API HTTP

## Estrutura

- `src/config`: leitura e validacao de ambiente
- `src/lib`: banco, logs e utilitarios
- `src/repositories`: persistencia
- `src/email`: campanhas, templates e provedores
- `src/services`: regras de negocio e automacao
- `src/routes`: rotas publicas e administrativas
