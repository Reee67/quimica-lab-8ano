import './style.css'
import './src/css/platform.css'
import { renderPeriodicTable, renderElementModal, setupPeriodicTable } from './src/js/periodicTable.js'
import { renderSimulator, setupSimulator } from './src/js/simulator.js'
import { renderQuiz, setupQuiz } from './src/js/quiz.js'
import { renderGame, setupGame } from './src/js/game.js'
import { renderA11yPanel, setupA11yPanel, loadA11y } from './src/js/accessibility.js'
import { renderCatalog, setupCatalog, renderConcepts, setupConcepts, renderLearn, setupLearn, renderAbout } from './src/js/concepts.js'
import { reactions } from './src/data/reactions.js'

const app = document.querySelector('#app')

function renderShell() {
  app.innerHTML = `
    <header class="app-header">
      <div class="header-inner">
        <div class="logo-group" id="logoHome">
          <div class="logo-icon">
            <svg viewBox="0 0 64 64" width="40" height="40">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="2.5"/>
              <circle cx="32" cy="32" r="6" fill="currentColor"/>
              <circle cx="18" cy="18" r="4" fill="currentColor" opacity="0.7"/>
              <circle cx="46" cy="18" r="4" fill="currentColor" opacity="0.7"/>
              <circle cx="18" cy="46" r="4" fill="currentColor" opacity="0.7"/>
              <circle cx="46" cy="46" r="4" fill="currentColor" opacity="0.7"/>
              <line x1="32" y1="32" x2="18" y2="18" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <line x1="32" y1="32" x2="46" y2="18" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <line x1="32" y1="32" x2="18" y2="46" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
              <line x1="32" y1="32" x2="46" y2="46" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
            </svg>
          </div>
          <h1 class="app-title">Química Lab</h1>
        </div>
        <nav class="app-nav">
          <button class="nav-btn active" data-view="home">Início</button>
          <button class="nav-btn" data-view="simulator">Simulador</button>
          <button class="nav-btn" data-view="catalog">Reações</button>
          <button class="nav-btn" data-view="concepts">Conceitos</button>
          <button class="nav-btn" data-view="learn">Aprenda</button>
          <button class="nav-btn" data-view="table">Tabela</button>
          <button class="nav-btn" data-view="quiz">Quiz</button>
          <button class="nav-btn" data-view="game">Jogo</button>
          <button class="nav-btn" data-view="about">Sobre</button>
        </nav>
      </div>
    </header>
    <main class="app-main" id="appMain"></main>
    <div class="modal-overlay" id="modalOverlay" style="display:none;">
      <div class="modal-backdrop" id="modalBackdrop"></div>
    </div>
    <footer class="app-footer">
      <p>Química Lab — Explore o mundo das reações químicas</p>
    </footer>
    ${renderA11yPanel()}
  `

  document.getElementById('logoHome').addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelector('.nav-btn[data-view="home"]').classList.add('active')
    navigateTo('home')
  })

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      navigateTo(btn.dataset.view)
    })
  })
}

function navigateTo(view) {
  const main = document.getElementById('appMain')
  main.innerHTML = ''
  main.className = 'app-main'

  if (view === 'home') {
    main.classList.add('view-home')
    main.innerHTML = renderHome()
    setupHome()
  } else if (view === 'table') {
    main.classList.add('view-table')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Tabela Periódica</h2>
        <p class="view-subtitle">Clique em qualquer elemento para ver suas propriedades</p>
      </div>
      ${renderPeriodicTable()}
    `
    setupPeriodicTable((el) => openElementModal(el))
  } else if (view === 'simulator') {
    main.classList.add('view-simulator')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Simulador de Reações</h2>
        <p class="view-subtitle">Veja os átomos se reorganizarem em tempo real</p>
      </div>
      ${renderSimulator()}
    `
    setupSimulator()
  } else if (view === 'catalog') {
    main.classList.add('view-catalog')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Explorar Reações</h2>
        <p class="view-subtitle">Catálogo de reações com filtros por tipo</p>
      </div>
      ${renderCatalog()}
    `
    setupCatalog((idx) => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
      document.querySelector('.nav-btn[data-view="simulator"]').classList.add('active')
      navigateTo('simulator')
      // Auto-select the reaction
      setTimeout(() => {
        const btn = document.querySelector(`.sim-reaction-btn[data-idx="${idx}"]`)
        if (btn) btn.click()
      }, 100)
    })
  } else if (view === 'concepts') {
    main.classList.add('view-concepts')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Conceitos de Reações</h2>
        <p class="view-subtitle">Tipos de reação e evidências de transformação química</p>
      </div>
      ${renderConcepts()}
    `
    setupConcepts()
  } else if (view === 'learn') {
    main.classList.add('view-learn')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Aprenda Química</h2>
        <p class="view-subtitle">Conteúdo visual e interativo sobre reações químicas</p>
      </div>
      ${renderLearn()}
    `
    setupLearn()
  } else if (view === 'game') {
    main.classList.add('view-game')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Laboratório das Reações</h2>
        <p class="view-subtitle">Descubra, combine e domine a química!</p>
      </div>
      ${renderGame()}
    `
    setupGame()
  } else if (view === 'quiz') {
    main.classList.add('view-quiz')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Quiz de Química</h2>
        <p class="view-subtitle">Teste o que você aprendeu</p>
      </div>
      ${renderQuiz()}
    `
    setupQuiz()
  } else if (view === 'about') {
    main.classList.add('view-about')
    main.innerHTML = `
      <div class="view-header">
        <h2 class="view-title">Sobre o Projeto</h2>
      </div>
      ${renderAbout()}
    `
  }
}

function renderHome() {
  return `
    <div class="home-hero">
      <div class="home-badge">
        <span class="home-badge-dot"></span>
        Plataforma Interativa de Química
      </div>
      <h1 class="home-title">
        REAÇÕES <span class="highlight">QUÍMICAS</span>
      </h1>
      <p class="home-desc">
        Descubra o que acontece quando as substâncias se transformam.
      </p>
      <div class="home-cta">
        <button class="btn-primary" id="homeCtaSimulator">Abrir simulador</button>
        <button class="btn-secondary" id="homeCtaCatalog">Explorar reações</button>
        <button class="btn-secondary" id="homeCtaLearn">Aprender os conceitos</button>
      </div>
      <div class="hero-visual">
        <div class="hero-bond b1"></div>
        <div class="hero-bond b2"></div>
        <div class="hero-bond b3"></div>
        <div class="hero-bond b4"></div>
        <div class="hero-molecule center">O</div>
        <div class="hero-molecule sat sat1">H</div>
        <div class="hero-molecule sat sat2">H</div>
        <div class="hero-molecule sat sat3">C</div>
        <div class="hero-molecule sat sat4">N</div>
      </div>
    </div>

    <div class="home-concepts">
      <div class="home-concept-card">
        <div class="home-concept-icon">🧪</div>
        <h3 class="home-concept-title">REAGENTES</h3>
        <p class="home-concept-desc">As substâncias que participam da reação.</p>
      </div>
      <div class="home-concept-card">
        <div class="home-concept-icon">⚗️</div>
        <h3 class="home-concept-title">PRODUTOS</h3>
        <p class="home-concept-desc">As novas substâncias formadas.</p>
      </div>
      <div class="home-concept-card">
        <div class="home-concept-icon">⚛️</div>
        <h3 class="home-concept-title">ÁTOMOS</h3>
        <p class="home-concept-desc">A matéria é reorganizada durante a reação.</p>
      </div>
    </div>

    <div class="home-stats">
      <div class="stat-item">
        <div class="stat-number">8</div>
        <div class="stat-label">Reações Simuláveis</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">6</div>
        <div class="stat-label">Tipos de Reação</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">118</div>
        <div class="stat-label">Elementos</div>
      </div>
    </div>

    <div class="home-features">
      <div class="feature-card" data-go="simulator">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 3v6l-4 8a2 2 0 002 3h10a2 2 0 002-3l-4-8V3"/>
            <line x1="7" y1="3" x2="17" y2="3"/>
            <circle cx="12" cy="15" r="1" fill="currentColor"/>
            <circle cx="9" cy="17" r="0.8" fill="currentColor"/>
            <circle cx="15" cy="17" r="0.8" fill="currentColor"/>
          </svg>
        </div>
        <h3 class="feature-title">Simulador Visual</h3>
        <p class="feature-desc">Veja átomos e moléculas se reorganizarem em tempo real com animações.</p>
      </div>
      <div class="feature-card" data-go="catalog">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </div>
        <h3 class="feature-title">Catálogo de Reações</h3>
        <p class="feature-desc">Explore reações reais com filtros por tipo, detalhes e simulação.</p>
      </div>
      <div class="feature-card" data-go="concepts">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <h3 class="feature-title">Conceitos e Tipos</h3>
        <p class="feature-desc">Síntese, decomposição, combustão, neutralização e evidências de reação.</p>
      </div>
      <div class="feature-card" data-go="learn">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20V2H6.5A2.5 2.5 0 004 4.5v15z"/>
            <path d="M4 19.5A2.5 2.5 0 016.5 22H20v-5"/>
          </svg>
        </div>
        <h3 class="feature-title">Aprenda Química</h3>
        <p class="feature-desc">Conteúdos visuais sobre átomos, moléculas, equações e conservação da massa.</p>
      </div>
      <div class="feature-card" data-go="table">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <h3 class="feature-title">Tabela Periódica</h3>
        <p class="feature-desc">Todos os 118 elementos com propriedades detalhadas.</p>
      </div>
    </div>
  `
}

function setupHome() {
  const go = (view) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    const targetBtn = document.querySelector(`.nav-btn[data-view="${view}"]`)
    if (targetBtn) targetBtn.classList.add('active')
    navigateTo(view)
  }

  document.getElementById('homeCtaSimulator').addEventListener('click', () => go('simulator'))
  document.getElementById('homeCtaCatalog').addEventListener('click', () => go('catalog'))
  document.getElementById('homeCtaLearn').addEventListener('click', () => go('learn'))

  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => go(card.dataset.go))
  })
}

function openElementModal(element) {
  const overlay = document.getElementById('modalOverlay')
  overlay.innerHTML = `<div class="modal-backdrop" id="modalBackdrop"></div>`
  const content = document.createElement('div')
  content.innerHTML = renderElementModal(element)
  content.className = 'modal-wrapper'
  overlay.appendChild(content)
  overlay.style.display = 'flex'

  const close = () => { overlay.style.display = 'none'; overlay.innerHTML = '' }
  document.getElementById('modalClose').addEventListener('click', close)
  document.getElementById('modalBackdrop').addEventListener('click', close)
}

loadA11y()
renderShell()
setupA11yPanel()
navigateTo('home')
