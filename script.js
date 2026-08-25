'use strict';

const GITHUB_USERNAME = 'LucasDEVELOPER-vs';
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const FALLBACK_PROFILE = {
  login: GITHUB_USERNAME,
  name: 'Lucas DEV',
  avatar_url: 'https://avatars.githubusercontent.com/u/257409828?v=4',
  html_url: GITHUB_PROFILE_URL,
  bio: 'Developer focused on creating efficient and well-structured solutions, with an interest in technology and projects. Continuously evolving technically.',
  public_repos: 5,
  followers: 0,
  following: 0,
  created_at: '2026-01-26T00:00:00Z'
};

const PROJECTS = [
  {
    name: 'Barbearia-Santos-Model',
    description: 'Landing page premium para barbearia, com navegação, cards de serviços, galeria, depoimentos e chamadas para agendamento.',
    tech: ['CSS', 'HTML', 'JavaScript'],
    status: 'Static landing page',
    github: `${GITHUB_PROFILE_URL}/Barbearia-Santos-Model`,
    demo: 'https://barbearia-santos-model.vercel.app',
    accentA: 'rgba(180, 118, 54, 0.34)',
    accentB: 'rgba(37, 99, 235, 0.18)'
  },
  {
    name: 'Travelling-Test',
    description: 'Interface de viagem e turismo com hero, destinos, pacotes, estatísticas, reviews, galeria e newsletter.',
    tech: ['HTML', 'JavaScript', 'CSS'],
    status: 'Travel interface',
    github: `${GITHUB_PROFILE_URL}/Travelling-Test`,
    demo: 'https://travelly-test.vercel.app',
    accentA: 'rgba(6, 182, 212, 0.34)',
    accentB: 'rgba(37, 99, 235, 0.22)'
  },
  {
    name: 'Portfolio-Teste',
    description: 'Portfólio demonstrativo para um juiz fictício, com seções de sobre, formação, carreira, publicações e contato.',
    tech: ['CSS', 'HTML', 'JavaScript'],
    status: 'Demo portfolio',
    github: `${GITHUB_PROFILE_URL}/Portfolio-Teste`,
    demo: 'https://portfolio-test-dr.vercel.app/',
    accentA: 'rgba(124, 58, 237, 0.28)',
    accentB: 'rgba(14, 165, 233, 0.2)'
  },
  {
    name: 'MvEXCHANGE',
    description: 'Site estático de loja/serviços Roblox com categorias, cards, tabela de preços e convite para suporte via Discord.',
    tech: ['CSS', 'HTML', 'JavaScript'],
    status: 'Services site',
    github: `${GITHUB_PROFILE_URL}/MvEXCHANGE`,
    demo: 'https://mv-exchange.vercel.app',
    accentA: 'rgba(239, 68, 68, 0.26)',
    accentB: 'rgba(168, 85, 247, 0.22)'
  },
  {
    name: 'LucasDEVELOPER-vs',
    description: 'Repositório de perfil do GitHub com apresentação pública, tecnologias listadas e objetivo de evolução rumo ao Full Stack.',
    tech: ['GitHub README'],
    status: 'Profile repo',
    github: `${GITHUB_PROFILE_URL}/LucasDEVELOPER-vs`,
    demo: '',
    accentA: 'rgba(16, 185, 129, 0.28)',
    accentB: 'rgba(125, 211, 252, 0.22)'
  }
];

const FALLBACK_REPOS = PROJECTS.map((project) => ({
  name: project.name,
  description: project.description,
  language: project.tech[0],
  html_url: project.github,
  homepage: project.demo,
  pushed_at: project.name === 'Barbearia-Santos-Model' ? '2026-08-21T01:23:00Z' : null,
  stargazers_count: 0,
  forks_count: 0
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initTheme();
  initMobileMenu();
  renderProjects();
  initScrollSystems();
  initReveal();
  initCounters();
  initCursorGlow();
  initMagneticShine();
  loadGitHubData();
});

function initLoadingScreen() {
  const loader = document.querySelector('.loading-screen');
  if (!loader) return;

  const hide = () => loader.classList.add('is-hidden');
  if (reduceMotion.matches) {
    hide();
    return;
  }

  window.setTimeout(hide, 620);
}

function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const icon = document.querySelector('[data-theme-icon]');
  const text = document.querySelector('[data-theme-text]');
  const storedTheme = safeStorageGet('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = storedTheme || systemTheme;

  applyTheme(initialTheme, { animate: false });

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    safeStorageSet('theme', next);
    applyTheme(next, { animate: true });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (event) => {
    if (safeStorageGet('theme')) return;
    applyTheme(event.matches ? 'dark' : 'light', { animate: true });
  });

  function applyTheme(theme, options = {}) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#080b12' : '#f5f7fb');

    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    if (text) text.textContent = isDark ? 'Light' : 'Dark';
    if (toggle) toggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');

    if (options.animate && !reduceMotion.matches) {
      document.body.classList.add('theme-changing');
      window.setTimeout(() => document.body.classList.remove('theme-changing'), 520);
    }
  }
}

function initMobileMenu() {
  const header = document.querySelector('[data-header]');
  const button = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  if (!header || !button || !panel) return;

  const setOpen = (open) => {
    header.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  button.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('nav-open')) return;
    if (header.contains(event.target)) return;
    setOpen(false);
  });
}

function initScrollSystems() {
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progress) progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    if (header) header.classList.toggle('is-scrolled', scrollTop > 12);

    const current = sections.reduce((active, section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160) return section;
      return active;
    }, sections[0]);

    if (current) {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${current.id}`);
      });
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
}

function initReveal() {
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reveals.length) return;

  reveals.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 80}ms`);
  });

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -70px 0px' });

  reveals.forEach((element) => observer.observe(element));
}

function initCursorGlow() {
  const cursor = document.querySelector('.cursor-glow');
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (!cursor || !finePointer || reduceMotion.matches) return;

  let targetX = -60;
  let targetY = -60;
  let currentX = targetX;
  let currentY = targetY;
  let raf = null;

  const render = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursor.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0)`;
    raf = window.requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.add('is-visible');
    if (!raf) render();
  }, { passive: true });

  window.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));

  document.querySelectorAll('a, button, .magnetic, .project-card, .skill-card').forEach((element) => {
    element.addEventListener('pointerenter', () => cursor.classList.add('is-hovering'));
    element.addEventListener('pointerleave', () => cursor.classList.remove('is-hovering'));
  });
}

function initMagneticShine() {
  const interactiveCards = document.querySelectorAll('.profile-card, .project-card');

  interactiveCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--x', `${x}%`);
      card.style.setProperty('--y', `${y}%`);
    });
  });
}

function renderProjects() {
  const grid = document.querySelector('#project-grid');
  if (!grid) return;

  grid.replaceChildren(...PROJECTS.map((project) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal magnetic hover-watch';
    card.style.setProperty('--project-a', project.accentA);
    card.style.setProperty('--project-b', project.accentB);

    const visual = document.createElement('div');
    visual.className = 'project-card__visual';
    visual.setAttribute('aria-hidden', 'true');

    const shine = document.createElement('div');
    shine.className = 'project-card__shine';
    shine.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'project-card__content';

    const status = document.createElement('span');
    status.className = 'project-card__status';
    status.textContent = project.status;

    const title = document.createElement('h3');
    title.textContent = project.name;

    const description = document.createElement('p');
    description.textContent = project.description;

    const techRow = document.createElement('div');
    techRow.className = 'tech-row';
    project.tech.forEach((tech) => {
      const chip = document.createElement('span');
      chip.className = 'tech-chip';
      chip.textContent = tech;
      techRow.append(chip);
    });

    const actions = document.createElement('div');
    actions.className = 'project-actions';
    actions.append(createExternalLink('GitHub', project.github, 'project-link'));
    if (project.demo) actions.append(createExternalLink('Live demo', project.demo, 'project-link'));

    content.append(status, title, description, techRow, actions);
    card.append(visual, shine, content);
    return card;
  }));

  initReveal();
  initMagneticShine();
}

async function loadGitHubData() {
  const status = document.querySelector('#github-status');
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`)
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API returned an unavailable response.');
    }

    const [profile, repos] = await Promise.all([
      profileResponse.json(),
      reposResponse.json()
    ]);

    if (status) {
      status.classList.remove('is-error');
      status.textContent = 'Dados públicos carregados pela API do GitHub.';
    }

    renderGitHubProfile(profile);
    renderGitHubRepos(Array.isArray(repos) ? repos : FALLBACK_REPOS);
  } catch (error) {
    if (status) {
      status.classList.add('is-error');
      status.textContent = 'A API do GitHub não está disponível agora. Exibindo dados verificados em fallback.';
    }
    console.info(error.message);
    renderGitHubProfile(FALLBACK_PROFILE);
    renderGitHubRepos(FALLBACK_REPOS);
  }
}

function renderGitHubProfile(profile) {
  const container = document.querySelector('#github-profile');
  if (!container) return;

  const safeProfile = {
    name: profile.name || FALLBACK_PROFILE.name,
    login: profile.login || FALLBACK_PROFILE.login,
    avatar: profile.avatar_url || FALLBACK_PROFILE.avatar_url,
    url: isValidHttpUrl(profile.html_url) ? profile.html_url : FALLBACK_PROFILE.html_url,
    bio: profile.bio || FALLBACK_PROFILE.bio,
    repos: numberOrFallback(profile.public_repos, FALLBACK_PROFILE.public_repos),
    followers: numberOrFallback(profile.followers, FALLBACK_PROFILE.followers),
    following: numberOrFallback(profile.following, FALLBACK_PROFILE.following),
    created: formatDate(profile.created_at || FALLBACK_PROFILE.created_at)
  };

  const profileCard = document.createElement('article');
  profileCard.className = 'github-card github-card--profile magnetic';

  const avatar = document.createElement('img');
  avatar.src = safeProfile.avatar;
  avatar.alt = `Avatar público de ${safeProfile.name}`;
  avatar.loading = 'lazy';

  const profileText = document.createElement('div');
  const label = document.createElement('span');
  label.textContent = safeProfile.login;
  const title = document.createElement('h3');
  title.textContent = safeProfile.name;
  const bio = document.createElement('p');
  bio.textContent = safeProfile.bio;
  const link = createExternalLink('View profile', safeProfile.url, 'project-link');
  link.style.marginTop = '16px';
  profileText.append(label, title, bio, link);
  profileCard.append(avatar, profileText);

  const stats = [
    ['Repos', safeProfile.repos],
    ['Followers', safeProfile.followers],
    ['Following', safeProfile.following],
    ['Created', safeProfile.created]
  ].map(([labelText, value]) => {
    const card = document.createElement('article');
    card.className = 'github-card magnetic';
    const label = document.createElement('span');
    label.textContent = labelText;
    const strong = document.createElement('strong');
    strong.textContent = String(value);
    card.append(label, strong);
    return card;
  });

  container.replaceChildren(profileCard, ...stats);
}

function renderGitHubRepos(repos) {
  const container = document.querySelector('#github-repos');
  if (!container) return;

  const cards = repos.slice(0, 6).map((repo) => {
    const card = document.createElement('article');
    card.className = 'github-card repo-mini magnetic';

    const label = document.createElement('span');
    label.textContent = repo.language || 'Repository';

    const title = document.createElement('h4');
    title.textContent = repo.name || 'Public repository';

    const description = document.createElement('p');
    description.textContent = repo.description || findFallbackDescription(repo.name) || 'Repositório público do GitHub.';

    const meta = document.createElement('div');
    meta.className = 'repo-mini__meta';
    const pushed = repo.pushed_at ? `Updated ${formatDate(repo.pushed_at)}` : 'Public project';
    const stars = `${numberOrFallback(repo.stargazers_count, 0)} stars`;
    const forks = `${numberOrFallback(repo.forks_count, 0)} forks`;
    [pushed, stars, forks].forEach((item) => {
      const chip = document.createElement('span');
      chip.textContent = item;
      meta.append(chip);
    });

    const actions = document.createElement('div');
    actions.className = 'project-actions';
    if (isValidHttpUrl(repo.html_url)) actions.append(createExternalLink('Repo', repo.html_url, 'project-link'));
    if (isValidHttpUrl(repo.homepage)) actions.append(createExternalLink('Demo', repo.homepage, 'project-link'));

    card.append(label, title, description, meta, actions);
    return card;
  });

  container.replaceChildren(...cards);
}

function createExternalLink(label, url, className) {
  const link = document.createElement('a');
  link.className = className;
  link.href = url;
  link.textContent = label;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function findFallbackDescription(repoName) {
  return FALLBACK_REPOS.find((repo) => repo.name === repoName)?.description;
}

function formatDate(value) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function numberOrFallback(value, fallback) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function isValidHttpUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // localStorage can be unavailable in strict privacy contexts.
  }
}
