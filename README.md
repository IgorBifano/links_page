# Igor Bifano Hub

Hub premium de links pessoais construído com Next.js, TypeScript, Tailwind CSS e Framer Motion.

## Como rodar

1. Instale as dependências com `npm install`
2. Inicie o ambiente local com `npm run dev`
3. Acesse `http://localhost:3000`

## Como editar conteúdo

Todo o conteúdo principal está em `data/site-content.ts`.

Você pode alterar:

- dados do perfil
- CTA principal
- grupos de links
- itens de autoridade
- links do rodapé

## Como trocar imagem

O bloco visual do hero está em `components/hero.tsx`.

Atualmente ele usa um avatar tipográfico com as iniciais `IB`. Para trocar por uma imagem real:

1. adicione a imagem na pasta `public/`
2. substitua o avatar atual por `next/image`
3. ajuste tamanho e bordas no card visual

## Como alterar cores

As cores principais estão centralizadas em `tailwind.config.ts`.

Os gradientes e overlays complementares ficam em:

- `app/globals.css`
- `components/page-background.tsx`

## Estrutura

- `app/`: layout e página principal
- `components/`: componentes reutilizáveis
- `data/`: conteúdo separado da apresentação
