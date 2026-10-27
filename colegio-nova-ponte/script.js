/* Colégio Nova Ponte - interações em JavaScript puro */
(function () {
  'use strict';

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Link ativo conforme a rolagem ---------- */
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Carrossel ---------- */
  const hero = document.querySelector('.hero');
  const slides = [...hero.querySelectorAll('.slide')];
  const dotsBox = hero.querySelector('.dots');
  const pauseBtn = hero.querySelector('.pause');
  const INTERVAL = 6000;
  let current = 0, timer = null, paused = false;

  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
    return b;
  });

  function go(n) {
    current = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      s.setAttribute('aria-hidden', String(i !== current));
    });
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === current)));
  }
  function start() { stop(); if (!paused) timer = setInterval(() => go(current + 1), INTERVAL); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { start(); }

  hero.querySelector('.prev').addEventListener('click', () => { go(current - 1); restart(); });
  hero.querySelector('.next').addEventListener('click', () => { go(current + 1); restart(); });
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Reproduzir' : 'Pausar';
    pauseBtn.setAttribute('aria-label', paused ? 'Reproduzir carrossel' : 'Pausar carrossel');
    paused ? stop() : start();
  });
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', () => { if (!paused) start(); });
  hero.addEventListener('focusin', stop);
  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(current - 1); restart(); }
    if (e.key === 'ArrowRight') { go(current + 1); restart(); }
  });
  // Deslizar no celular
  let x0 = null;
  hero.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { paused = true; pauseBtn.textContent = 'Reproduzir'; }
  go(0); start();

  /* ---------- Botões que pré-selecionam o segmento no formulário ---------- */
  const form = document.getElementById('form');
  const segSelect = document.getElementById('segmento');
  document.querySelectorAll('[data-seg]').forEach((a) => {
    a.addEventListener('click', () => { segSelect.value = a.dataset.seg; });
  });

  /* ---------- Formulário: máscara e validação ---------- */
  const tel = document.getElementById('tel');
  tel.addEventListener('input', () => {
    const d = tel.value.replace(/\D/g, '').slice(0, 11);
    let v = d;
    if (d.length > 6) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    else if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    tel.value = v;
  });

  const rules = {
    nome: (v) => (v.trim().split(/\s+/).filter(Boolean).length >= 2 ? '' : 'Informe seu nome completo (nome e sobrenome).'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido, como nome@email.com.'),
    tel: (v) => { const n = v.replace(/\D/g, ''); return n.length === 10 || n.length === 11 ? '' : 'Informe o telefone com DDD.'; },
    segmento: (v) => (v ? '' : 'Escolha um segmento de interesse.'),
    msg: (v) => (v.trim().length >= 10 ? '' : 'Escreva uma mensagem com pelo menos 10 caracteres.')
  };

  function check(field) {
    const input = form.elements[field];
    const msg = rules[field](input.value);
    const wrap = input.closest('.field');
    wrap.classList.toggle('bad', !!msg);
    wrap.querySelector('.err').textContent = msg;
    input.setAttribute('aria-invalid', String(!!msg));
    return !msg;
  }
  Object.keys(rules).forEach((f) => {
    form.elements[f].addEventListener('blur', () => check(f));
    form.elements[f].addEventListener('input', () => { if (form.elements[f].closest('.field').classList.contains('bad')) check(f); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstBad = Object.keys(rules).find((f) => !check(f));
    if (firstBad) { form.elements[firstBad].focus(); return; }
    const ok = document.getElementById('ok');
    const nome = form.elements.nome.value.trim().split(/\s+/)[0];
    ok.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e entraremos em contato em até 1 dia útil para agendar sua visita.`;
    ok.hidden = false;
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.reset();
    // Demonstrativo: nenhum dado é enviado a servidor.
  });

  /* ---------- Ano no rodapé ---------- */
  document.getElementById('ano').textContent = new Date().getFullYear();
})();


/* ---------- Efeitos digitais: progresso, revelar ao rolar, contadores ---------- */
(function () {
  'use strict';
  const bar = document.querySelector('.progress');
  const upd = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', upd, { passive: true }); upd();

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.card, .em-card, .stats li, .photo, .form');
  if (!('IntersectionObserver' in window) || reduce) return;
  items.forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; });
  const count = (el) => {
    const to = +el.dataset.to, suf = el.dataset.suf || '', t0 = performance.now(), d = 1200;
    const step = (t) => { const p = Math.min((t - t0) / d, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    const n = e.target.querySelector('[data-to]'); if (n) count(n);
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
})();
