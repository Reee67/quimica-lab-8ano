import { reactions } from '../data/reactions.js';
import { reactionTypes, evidenceCards, learnTopics, aboutContent } from '../data/concepts.js';
import { atomColors, atomNames, moleculeDefs, splitEquation } from '../data/molecularData.js';

let catalogFilter = 'all';
let selectedReactionIdx = null;

export function renderCatalog() {
  const types = ['all', 'Síntese', 'Decomposição', 'Combustão', 'Neutralização', 'Oxidação'];
  const filtered = catalogFilter === 'all' ? reactions : reactions.filter(r => r.type === catalogFilter);

  return `
    <div class="cat-container">
      <div class="cat-filters">
        ${types.map(t => `<button class="cat-filter-btn ${t === catalogFilter ? 'active' : ''}" data-filter="${t}">${t === 'all' ? 'Todas' : t}</button>`).join('')}
      </div>
      <div class="cat-grid">
        ${filtered.map(r => {
          const idx = reactions.indexOf(r);
          return `
            <div class="cat-card" data-idx="${idx}">
              <div class="cat-card-header">
                <span class="cat-card-type" style="background:${typeColor(r.type)}33; color:${typeColor(r.type)}">${r.type}</span>
              </div>
              <h3 class="cat-card-name">${r.name}</h3>
              <div class="cat-card-eq">${r.equation}</div>
              <div class="cat-card-mols">
                ${r.reactants.map(r2 => `<span class="cat-mol" style="color:${r2.color === '#495057' ? '#adb5bd' : r2.color}">${r2.symbol}</span>`).join(' + ')}
                <span class="cat-arrow">→</span>
                ${r.products.map(p => `<span class="cat-mol" style="color:${p.color === '#495057' ? '#adb5bd' : p.color}">${p.symbol}</span>`).join(' + ')}
              </div>
              <div class="cat-card-actions">
                <button class="cat-sim-btn" data-idx="${idx}">▶ Simular</button>
                <button class="cat-detail-btn" data-idx="${idx}">Detalhes</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="cat-detail-overlay" id="catDetailOverlay" style="display:none;">
        <div class="cat-detail-card" id="catDetailCard"></div>
      </div>
    </div>
  `;
}

export function setupCatalog(simulateCallback) {
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catalogFilter = btn.dataset.filter;
      const main = document.getElementById('appMain');
      if (main) {
        main.innerHTML = `<div class="view-header"><h2 class="view-title">Explorar Reações</h2><p class="view-subtitle">Catálogo de reações com filtros por tipo</p></div>${renderCatalog()}`;
        setupCatalog(simulateCallback);
      }
    });
  });

  document.querySelectorAll('.cat-sim-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.idx);
      if (simulateCallback) simulateCallback(idx);
    });
  });

  document.querySelectorAll('.cat-detail-btn, .cat-card').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('cat-sim-btn')) return;
      const idx = parseInt(el.dataset.idx);
      showDetail(idx, simulateCallback);
    });
  });
}

function showDetail(idx, simulateCallback) {
  const r = reactions[idx];
  const eq = splitEquation(r.equation);
  const overlay = document.getElementById('catDetailOverlay');
  const card = document.getElementById('catDetailCard');

  card.innerHTML = `
    <button class="cat-detail-close" id="catDetailClose">✕</button>
    <div class="cat-detail-type" style="background:${typeColor(r.type)}33; color:${typeColor(r.type)}">${r.type}</div>
    <h2 class="cat-detail-name">${r.name}</h2>
    <div class="cat-detail-eq">${r.equation}</div>
    <div class="cat-detail-grid">
      <div class="cat-detail-section">
        <h4>Reagentes</h4>
        ${r.reactants.map(r2 => `<div class="cat-detail-mol"><span class="cat-mol-formula" style="color:${r2.color === '#495057' ? '#adb5bd' : r2.color}">${r2.symbol}</span> — ${r2.label}</div>`).join('')}
      </div>
      <div class="cat-detail-section">
        <h4>Produtos</h4>
        ${r.products.map(p => `<div class="cat-detail-mol"><span class="cat-mol-formula" style="color:${p.color === '#495057' ? '#adb5bd' : p.color}">${p.symbol}</span> — ${p.label}</div>`).join('')}
      </div>
    </div>
    <div class="cat-detail-section">
      <h4>O que acontece?</h4>
      <p>${r.description}</p>
    </div>
    <div class="cat-detail-section">
      <h4>Evidências observáveis</h4>
      <p>${getEvidenceForReaction(r)}</p>
    </div>
    <div class="cat-detail-section">
      <h4>Conservação dos átomos</h4>
      <div class="cat-detail-cons">
        ${[...new Set([...Object.keys(eq.reactantAtoms), ...Object.keys(eq.productAtoms)])].map(el => {
          const before = eq.reactantAtoms[el] || 0;
          const after = eq.productAtoms[el] || 0;
          return `<div class="cat-cons-row"><span class="cat-cons-atom" style="background:${atomColors[el]}; color:${parseInt(atomColors[el].replace('#',''),16)>0xdddddd?'#0d0d1a':'#fff'}">${el}</span> Antes: ${before} | Depois: ${after} ✅</div>`;
        }).join('')}
      </div>
    </div>
    <div class="cat-detail-actions">
      <button class="btn-primary" id="catDetailSim">▶ Executar no Simulador</button>
    </div>
  `;
  overlay.style.display = 'flex';
  document.getElementById('catDetailClose').addEventListener('click', () => overlay.style.display = 'none');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; }, { once: true });
  document.getElementById('catDetailSim').addEventListener('click', () => {
    overlay.style.display = 'none';
    if (simulateCallback) simulateCallback(idx);
  });
}

function getEvidenceForReaction(r) {
  if (r.type === 'Combustão') return 'Emissão de luz e calor, formação de gases (CO₂ e H₂O).';
  if (r.type === 'Decomposição') return 'Formação de gás (CO₂) e mudança de estado físico.';
  if (r.type === 'Neutralização') return 'Alteração de temperatura (exotérmica) e mudança de pH.';
  if (r.type === 'Oxidação') return 'Mudança de cor (cinza para avermelhado) e liberação lenta de calor.';
  if (r.type === 'Síntese') return 'Liberação de energia (calor e/ou luz), mudança de cor.';
  return 'Mudança nas propriedades das substâncias envolvidas.';
}

function typeColor(type) {
  const map = { 'Síntese': '#4dabf7', 'Decomposição': '#cc5de8', 'Combustão': '#ff6b6b', 'Neutralização': '#20c997', 'Oxidação': '#fab005', 'Simples Troca': '#00a651', 'Dupla Troca': '#fab005' };
  return map[type] || '#4dabf7';
}

export function renderConcepts() {
  return `
    <div class="concepts-container">
      <div class="concepts-types">
        <h3 class="concepts-section-title">Tipos de Reação</h3>
        <div class="concepts-types-grid">
          ${reactionTypes.map(t => `
            <div class="concept-type-card" style="border-left:4px solid ${t.color};">
              <div class="concept-type-header">
                <span class="concept-type-icon">${t.icon}</span>
                <h4 class="concept-type-name">${t.name}</h4>
              </div>
              <div class="concept-type-general">${t.general}</div>
              <p class="concept-type-explain">${t.explanation}${t.extra || ''}</p>
              <div class="concept-type-example">
                <span class="concept-example-label">Exemplo:</span>
                <span class="concept-example-name">${t.example.name}</span>
                <span class="concept-example-eq">${t.example.equation}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="concepts-evidence">
        <h3 class="concepts-section-title">Como sabemos que ocorreu uma reação?</h3>
        <p class="concepts-evidence-intro">Estas são evidências que podem indicar uma transformação química. Importante: nenhuma evidência isolada é prova universal em todos os contextos.</p>
        <div class="concepts-evidence-grid">
          ${evidenceCards.map(c => `
            <div class="evidence-card" data-id="${c.id}">
              <div class="evidence-icon">${c.icon}</div>
              <h4 class="evidence-title">${c.title}</h4>
              <p class="evidence-text">${c.text}</p>
              <div class="evidence-detail" style="display:none;">
                <div class="evidence-example"><strong>Exemplo:</strong> ${c.example}</div>
                <div class="evidence-caution"><strong>Atenção:</strong> ${c.caution}</div>
              </div>
              <button class="evidence-toggle">Saiba mais ▼</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function setupConcepts() {
  document.querySelectorAll('.evidence-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.evidence-card');
      const detail = card.querySelector('.evidence-detail');
      const visible = detail.style.display !== 'none';
      detail.style.display = visible ? 'none' : 'block';
      btn.textContent = visible ? 'Saiba mais ▼' : 'Fechar ▲';
    });
  });
}

export function renderLearn() {
  return `
    <div class="learn-container">
      <div class="learn-topics-list" id="learnTopicsList">
        ${learnTopics.map((t, i) => `
          <button class="learn-topic-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
            <span class="learn-topic-icon">${t.icon}</span>
            <span class="learn-topic-title">${t.title}</span>
          </button>
        `).join('')}
      </div>
      <div class="learn-content" id="learnContent"></div>
    </div>
  `;
}

export function setupLearn() {
  showLearnTopic(0);
  document.querySelectorAll('.learn-topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.learn-topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showLearnTopic(parseInt(btn.dataset.idx));
    });
  });
}

function showLearnTopic(idx) {
  const t = learnTopics[idx];
  const el = document.getElementById('learnContent');
  if (!el) return;
  el.innerHTML = `
    <div class="learn-card">
      <div class="learn-card-header">
        <span class="learn-card-icon">${t.icon}</span>
        <h3 class="learn-card-title">${t.title}</h3>
      </div>
      ${t.sections.map(s => `<p class="learn-card-text">${s.text}</p>`).join('')}
      ${t.example ? `<div class="learn-card-example"><span class="learn-example-label">Exemplo:</span><pre class="learn-example-pre">${t.example}</pre></div>` : ''}
    </div>
  `;
}

export function renderAbout() {
  return `
    <div class="about-container">
      <div class="about-card">
        <h2 class="about-title">Sobre o Química Lab</h2>
        <p class="about-mission">${aboutContent.mission}</p>
        <h3 class="about-subtitle">Recursos</h3>
        <ul class="about-features">
          ${aboutContent.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="about-note">
          <h4>⚠️ Aviso Importante</h4>
          <p>${aboutContent.note}</p>
        </div>
      </div>
    </div>
  `;
}
