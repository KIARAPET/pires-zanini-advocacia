/* =====================================================================
   Pires & Zanini Advocacia — interações do site
   ===================================================================== */

/* ---------------------------------------------------------------------
   CONFIGURAÇÃO — altere aqui os dados de contato do escritório
   --------------------------------------------------------------------- */
const CONFIG = {
  // Número no formato internacional, somente dígitos: 55 + DDD + número
  whatsapp: '5531988734938',
  mensagem: 'Olá! Gostaria de falar com o escritório Pires & Zanini Advocacia.'
};

/* ---------------------------------------------------------------------
   Links do WhatsApp
   --------------------------------------------------------------------- */
(function aplicarLinksWhatsApp() {
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
})();

/* ---------------------------------------------------------------------
   Header: fundo sólido ao rolar
   --------------------------------------------------------------------- */
(function headerAoRolar() {
  const header = document.getElementById('header');
  if (!header) return;

  const atualizar = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
})();

/* ---------------------------------------------------------------------
   Menu mobile
   --------------------------------------------------------------------- */
(function menuMobile() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  const fechar = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', fechar));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      fechar();
      toggle.focus();
    }
  });
})();

/* ---------------------------------------------------------------------
   Animação de entrada dos blocos
   --------------------------------------------------------------------- */
(function revelarAoRolar() {
  const alvos = document.querySelectorAll('.reveal');
  if (!alvos.length) return;

  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (semAnimacao || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observer.unobserve(entrada.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px' });

  alvos.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
    observer.observe(el);
  });
})();

/* ---------------------------------------------------------------------
   Item de menu ativo conforme a seção visível
   --------------------------------------------------------------------- */
(function menuAtivo() {
  const links = [...document.querySelectorAll('.nav__link')];
  const secoes = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!secoes.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === `#${entrada.target.id}`
        );
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secoes.forEach((secao) => observer.observe(secao));
})();

/* ---------------------------------------------------------------------
   Carrossel de avaliações
   --------------------------------------------------------------------- */
(function carrosselAvaliacoes() {
  const trilho = document.getElementById('carrosselTrilho');
  const pontos = document.getElementById('carrosselPontos');
  if (!trilho) return;

  const cartoes = [...trilho.children];
  const anterior = document.querySelector('.carrossel__seta--ant');
  const proximo = document.querySelector('.carrossel__seta--prox');
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Quantos cartões cabem lado a lado no tamanho atual da tela */
  const porPagina = () => {
    const largura = cartoes[0].getBoundingClientRect().width;
    return Math.max(1, Math.round(trilho.clientWidth / largura));
  };

  const totalPaginas = () => Math.ceil(cartoes.length / porPagina());

  /* Posição de rolagem de um cartão, medida no próprio elemento —
     usar a largura do trilho erraria pelo tamanho do gap. */
  const posicaoDe = (indice) => cartoes[indice].offsetLeft - cartoes[0].offsetLeft;

  const paginaAtual = () => {
    let maisProximo = 0;
    let menorDistancia = Infinity;
    cartoes.forEach((_, i) => {
      const distancia = Math.abs(posicaoDe(i) - trilho.scrollLeft);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisProximo = i;
      }
    });
    return Math.floor(maisProximo / porPagina());
  };

  const irPara = (pagina) => {
    const paginas = totalPaginas();
    const destino = ((pagina % paginas) + paginas) % paginas;
    const cartao = Math.min(destino * porPagina(), cartoes.length - 1);
    trilho.scrollTo({
      left: posicaoDe(cartao),
      behavior: semAnimacao ? 'auto' : 'smooth'
    });
  };

  /* Pontos de navegação */
  const montarPontos = () => {
    pontos.innerHTML = '';
    for (let i = 0; i < totalPaginas(); i += 1) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'ponto';
      botao.setAttribute('aria-label', `Ir para o grupo ${i + 1} de avaliações`);
      botao.addEventListener('click', () => { irPara(i); reiniciarAuto(); });
      pontos.appendChild(botao);
    }
    marcarPontoAtivo();
  };

  const marcarPontoAtivo = () => {
    const atual = paginaAtual();
    [...pontos.children].forEach((ponto, i) => {
      ponto.classList.toggle('is-ativo', i === atual);
      ponto.setAttribute('aria-current', i === atual ? 'true' : 'false');
    });
  };

  anterior?.addEventListener('click', () => { irPara(paginaAtual() - 1); reiniciarAuto(); });
  proximo?.addEventListener('click', () => { irPara(paginaAtual() + 1); reiniciarAuto(); });

  /* Setas do teclado quando o trilho está em foco */
  trilho.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(paginaAtual() + 1); reiniciarAuto(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(paginaAtual() - 1); reiniciarAuto(); }
  });

  /* Passagem automática — pausa ao interagir */
  let timer = null;
  const INTERVALO = 6000;

  const pararAuto = () => { clearInterval(timer); timer = null; };
  const iniciarAuto = () => {
    if (semAnimacao || timer || totalPaginas() < 2) return;
    timer = setInterval(() => irPara(paginaAtual() + 1), INTERVALO);
  };
  const reiniciarAuto = () => { pararAuto(); iniciarAuto(); };

  ['mouseenter', 'focusin', 'touchstart', 'pointerdown'].forEach((evento) =>
    trilho.addEventListener(evento, pararAuto, { passive: true })
  );
  ['mouseleave', 'focusout'].forEach((evento) =>
    trilho.addEventListener(evento, iniciarAuto)
  );

  document.addEventListener('visibilitychange', () =>
    document.hidden ? pararAuto() : iniciarAuto()
  );

  trilho.addEventListener('scroll', marcarPontoAtivo, { passive: true });
  window.addEventListener('resize', montarPontos);

  montarPontos();
  iniciarAuto();
})();
