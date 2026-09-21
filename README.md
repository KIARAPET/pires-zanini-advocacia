# Pires &amp; Zanini Advocacia

Site institucional de página única reconstruído a partir do layout `SITE ADVOCACIA - modelo.pdf`.
Feito em HTML, CSS e JavaScript puros — sem build, sem dependências.

## Seções

1. **Hero** — chamada principal e CTA de contato
2. **Nossas Áreas de Atuação** — Trabalhista, Previdenciário, Família e Cível
3. **O que nos diferencia?** — atendimento personalizado, justiça e excelência, relacionamento duradouro
4. **Por que escolher nossos serviços?**
5. **Avaliações do Google** — carrossel com 12 avaliações reais
6. **Quem somos?**
7. **Contato** — endereço, telefone e mapa
8. **Rodapé**

## Avaliações

As 12 avaliações do carrossel estão escritas direto no `index.html`, na seção
`#avaliacoes`. São avaliações reais do perfil do escritório no Google, copiadas
manualmente — **não atualizam sozinhas**.

O escritório já tem conta no [Trustindex](https://www.trustindex.io), que sincroniza
as avaliações automaticamente. Se o código de incorporação daquele widget estiver
disponível, ele substitui o carrossel manual e passa a atualizar sozinho.

O total exibido no selo (`5,0` · `42 avaliações`) também é fixo e precisa ser
atualizado à mão de tempos em tempos.

## Como rodar localmente

Basta abrir o `index.html` no navegador. Para servir por HTTP:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>.

## Configuração

O número de WhatsApp e a mensagem pré-preenchida dos botões ficam no topo de
[`assets/js/main.js`](assets/js/main.js):

```js
const CONFIG = {
  whatsapp: '5500000000000', // 55 + DDD + número, só dígitos
  mensagem: 'Olá! Gostaria de falar com o escritório...'
};
```

Troque `5500000000000` pelo número real do escritório — todos os botões
(“Entre em contato”, “Contato” e o botão flutuante) usam esse valor.

As cores ficam nas variáveis CSS no início de
[`assets/css/style.css`](assets/css/style.css) (`--gold-700`, `--gold-300`, `--ink-900`…).

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O site fica disponível em `https://<usuario>.github.io/<repositorio>/`.

## Estrutura

```
.
├── index.html
├── assets
│   ├── css/style.css
│   ├── js/main.js
│   └── img/          # imagens extraídas do PDF original
└── README.md
```

## Créditos

Layout original: Mitra Marketing. As imagens em `assets/img/` foram extraídas do PDF do modelo.
