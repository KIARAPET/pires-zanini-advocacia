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
