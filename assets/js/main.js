/* ЗВУК НА ВИНИЛЕ — поведение страницы.
   Правила движения экосистемы ФУНДАМЕНТ: 200–300 мс, ease-out,
   только проявление (fade-up ≤ 14 px), лесенка 60 мс.
   Ничего не отскакивает, не выезжает сбоку и не масштабируется.
   Ноль зависимостей: ни jQuery, ни бутстрапа, ни слайдеров. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MAIL = 'katkov@rockonvinyl.ru';

  /* ---------- Мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Проявление при прокрутке, со ступенькой 60 мс ---------- */
  var risers = [].slice.call(document.querySelectorAll('.rise'));
  if (reduced || !('IntersectionObserver' in window)) {
    risers.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = (shown++ * 60) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    risers.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Подсветка активного пункта меню на длинной странице ---------- */
  var links = [].slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.style.color = on ? 'var(--ink)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Общая отправка: письмо собирается на клиенте ----------
     Бэкенда нет. Чтобы подключить настоящий приём заявок, замените
     тело mail() на fetch() к своему эндпоинту — разметку менять не нужно. */
  function mail(subject, body) {
    window.location.href = 'mailto:' + MAIL
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
  }
  function say(note, text, ok) {
    if (!note) return;
    note.style.color = ok ? 'var(--wood)' : 'var(--orange)';
    note.textContent = text;
  }

  /* ---------- Подписка на рассылку ---------- */
  var subs = document.getElementById('subscribe');
  if (subs) {
    var subsNote = document.getElementById('subscribe-note');
    subs.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = subs.email.value.trim();
      if (!email || email.indexOf('@') < 1) {
        say(subsNote, 'Проверьте адрес почты — на него придёт анонс ближайшего шоу.', false);
        return;
      }
      if (!document.getElementById('s-consent').checked) {
        say(subsNote, 'Нужно согласие на обработку персональных данных.', false);
        return;
      }
      mail('Подписка на рассылку ЗВУК НА ВИНИЛЕ',
        'Прошу подписать на анонсы шоу.\nE-mail: ' + email + '\n\n— отправлено с сайта ЗВУК НА ВИНИЛЕ');
      say(subsNote, 'Открываем почтовую программу. Если не открылась — напишите на ' + MAIL + '.', true);
      subs.reset();
    });
  }

  /* ---------- Заявка на шоу ---------- */
  var lead = document.getElementById('lead');
  if (lead) {
    var leadNote = document.getElementById('lead-note');
    lead.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = lead.name.value.trim();
      var contact = lead.contact.value.trim();

      if (!name || !contact) {
        say(leadNote, 'Заполните имя и контакт — по ним мы вернёмся с ответом.', false);
        return;
      }
      if (!document.getElementById('f-consent').checked) {
        say(leadNote, 'Нужно согласие на обработку персональных данных.', false);
        return;
      }

      mail('Заявка с сайта ЗВУК НА ВИНИЛЕ — ' + lead.format.value, [
        'Имя: ' + name,
        'Контакт: ' + contact,
        'Формат: ' + lead.format.value,
        '',
        'Задача:',
        lead.task.value.trim() || '—',
        '',
        '— отправлено с сайта ЗВУК НА ВИНИЛЕ'
      ].join('\n'));

      say(leadNote, 'Открываем почтовую программу. Если не открылась — напишите на ' + MAIL
        + ' или в Telegram +7 (985) 765-34-22.', true);
    });
  }
})();
