import {
  substances, equipment, labReactions, investigations, multiStepMissions,
  balanceChallenges, bosses, knowledgeTree, labMap, achievements,
  lightningQuestions, identifyQuestions, learningTopics, randomEvents,
  levels, getLevel, getSubstance, diaryEntries
} from '../data/labReactions.js';

let progress = {
  xp: 0, points: 0, coins: 100, combo: 0, bestCombo: 0,
  reactions: 0, balanced: 0, lightningCorrect: 0, identified: 0,
  investigations: 0, typeCorrect: {}, bossesDefeated: [],
  unlockedAchievements: [], discoveredReactions: [],
  hintsUsed: 0, energy: 5, maxEnergy: 5,
  stars: {}, diary: [], rankings: [],
  character: { hair: 'escuro', coat: 'branco', glasses: false, accessory: 'nenhum' },
  extremeUnlocked: false, soundOn: true,
};

let currentView = 'menu';
let labState = {};
let invState = {};
let bossState = {};
let multiState = {};
let lightningState = {};
let balanceState = {};
let identifyState = {};
let eventState = { active: null };

export function renderGame() {
  loadProgress();
  return `<div class="lr-game" id="lrGame"><div class="lr-bg-particles" id="lrBgParticles"></div><div class="lr-content" id="lrContent"></div></div>`;
}

export function setupGame() {
  loadProgress();
  renderView('menu');
}

function loadProgress() {
  const saved = localStorage.getItem('lr_progress_v2');
  if (saved) {
    try { progress = { ...progress, ...JSON.parse(saved) }; } catch (e) {}
  }
}
function saveProgress() { localStorage.setItem('lr_progress_v2', JSON.stringify(progress)); }

function renderView(view) {
  currentView = view;
  const content = document.getElementById('lrContent');
  if (!content) return;
  const views = {
    menu: () => { content.innerHTML = renderMenu(); setupMenu(); },
    map: () => { content.innerHTML = renderMap(); setupMap(); },
    lab: () => { content.innerHTML = renderLab(); setupLab(); },
    investigation: () => { content.innerHTML = renderInvestigation(); setupInvestigation(); },
    multistep: () => { content.innerHTML = renderMultiStep(); setupMultiStep(); },
    balance: () => { content.innerHTML = renderBalance(); setupBalance(); },
    lightning: () => { content.innerHTML = renderLightning(); setupLightning(); },
    identify: () => { content.innerHTML = renderIdentify(); setupIdentify(); },
    boss: () => { content.innerHTML = renderBoss(); setupBoss(); },
    tree: () => { content.innerHTML = renderTree(); setupTree(); },
    achievements: () => { content.innerHTML = renderAchievementsPage(); setupAchievementsPage(); },
    learn: () => { content.innerHTML = renderLearn(); setupLearn(); },
    diary: () => { content.innerHTML = renderDiary(); setupDiary(); },
    character: () => { content.innerHTML = renderCharacter(); setupCharacter(); },
    ranking: () => { content.innerHTML = renderRanking(); setupRanking(); },
    extreme: () => { content.innerHTML = renderExtreme(); setupExtreme(); },
    shop: () => { content.innerHTML = renderShop(); setupShop(); },
  };
  if (views[view]) views[view]();
  updateProgressBar();
  maybeTriggerRandomEvent();
}

function getXPInfo() {
  const { current, next } = getLevel(progress.xp);
  const baseXp = current.xpRequired;
  const nextXp = next ? next.xpRequired : current.xpRequired;
  const pct = next ? Math.round(((progress.xp - baseXp) / (nextXp - baseXp)) * 100) : 100;
  return { current, next, pct, level: current.level };
}

function updateProgressBar() {
  const bar = document.getElementById('lrProgressBar');
  if (!bar) return;
  const info = getXPInfo();
  const comboDisplay = progress.combo > 0 ? `<span class="lr-combo-badge">🔥 ${progress.combo}x</span>` : '';
  bar.innerHTML = `
    <div class="lr-progress-info">
      <span class="lr-level-badge" style="background:${info.current.color};">Nv ${info.current.level}</span>
      <span class="lr-level-name">${info.current.name}</span>
      ${comboDisplay}
      <span class="lr-xp-text">${progress.xp} XP ${info.next ? `/ ${info.next.xpRequired}` : '— MAX'}</span>
      <span class="lr-resource-pill">💰 ${progress.coins}</span>
      <span class="lr-resource-pill">⚡ ${progress.energy}/${progress.maxEnergy}</span>
    </div>
    <div class="lr-progress-track">
      <div class="lr-progress-fill" style="width:${info.pct}%; background: linear-gradient(90deg, ${info.current.color}, ${info.next ? info.next.color : info.current.color});"></div>
    </div>
  `;
}

function renderBackBtn() { return `<button class="lr-back-btn" id="lrBackBtn">← Voltar</button>`; }
function setupBackBtn() { const b = document.getElementById('lrBackBtn'); if (b) b.addEventListener('click', () => renderView('menu')); }
function spawnBgParticles() {
  const c = document.getElementById('lrBgParticles'); if (!c) return; c.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div'); p.className = 'lr-bg-particle';
    p.style.left = Math.random() * 100 + '%'; p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 5 + 's'; p.style.animationDuration = (3 + Math.random() * 4) + 's';
    p.style.opacity = 0.1 + Math.random() * 0.2; p.style.width = p.style.height = (4 + Math.random() * 8) + 'px';
    c.appendChild(p);
  }
}

// ===== MENU =====
function renderMenu() {
  const info = getXPInfo();
  const extremeBtn = progress.xp >= 2800;
  return `
    <div class="lr-menu">
      <div class="lr-menu-hero">
        <div class="lr-hero-icon">🧪</div>
        <h1 class="lr-hero-title">LABORATÓRIO DAS REAÇÕES</h1>
        <p class="lr-hero-subtitle">Descubra, combine e domine a química!</p>
        <div class="lr-character-avatar" id="lrCharAvatar">${renderCharSVG()}</div>
      </div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-menu-stats">
        <div class="lr-stat-pill"><span>⭐</span> ${progress.points} pts</div>
        <div class="lr-stat-pill"><span>📊</span> ${progress.xp} XP</div>
        <div class="lr-stat-pill"><span>💰</span> ${progress.coins}</div>
        <div class="lr-stat-pill"><span>🔥</span> Combo: ${progress.combo}x</div>
        <div class="lr-stat-pill"><span>🏅</span> ${progress.unlockedAchievements.length}/${achievements.length}</div>
      </div>
      <div class="lr-menu-buttons">
        <button class="lr-menu-btn primary" data-go="map"><span class="lr-btn-icon">🗺️</span><div class="lr-btn-text"><span class="lr-btn-title">Jogar Campanha</span><span class="lr-btn-desc">Mapa de laboratórios</span></div></button>
        <button class="lr-menu-btn" data-go="lab"><span class="lr-btn-icon">🔬</span><div class="lr-btn-text"><span class="lr-btn-title">Laboratório</span><span class="lr-btn-desc">Misture reagentes</span></div></button>
        <button class="lr-menu-btn" data-go="investigation"><span class="lr-btn-icon">🕵️</span><div class="lr-btn-text"><span class="lr-btn-title">Investigação</span><span class="lr-btn-desc">Modo detetive</span></div></button>
        <button class="lr-menu-btn" data-go="multistep"><span class="lr-btn-icon">🧩</span><div class="lr-btn-text"><span class="lr-btn-title">Desafio Multietapas</span><span class="lr-btn-desc">Missões completas</span></div></button>
        <button class="lr-menu-btn" data-go="balance"><span class="lr-btn-icon">⚖️</span><div class="lr-btn-text"><span class="lr-btn-title">Equilibrar Equações</span><span class="lr-btn-desc">Balanceamento progressivo</span></div></button>
        <button class="lr-menu-btn" data-go="lightning"><span class="lr-btn-icon">⚡</span><div class="lr-btn-text"><span class="lr-btn-title">Desafio Relâmpago</span><span class="lr-btn-desc">60 segundos</span></div></button>
        <button class="lr-menu-btn" data-go="identify"><span class="lr-btn-icon">🧠</span><div class="lr-btn-text"><span class="lr-btn-title">Identifique a Reação</span><span class="lr-btn-desc">Classifique reações</span></div></button>
        <button class="lr-menu-btn" data-go="boss"><span class="lr-btn-icon">👾</span><div class="lr-btn-text"><span class="lr-btn-title">Chefões</span><span class="lr-btn-desc">Desafios finais</span></div></button>
        <button class="lr-menu-btn" data-go="tree"><span class="lr-btn-icon">🌳</span><div class="lr-btn-text"><span class="lr-btn-title">Árvore do Saber</span><span class="lr-btn-desc">Desbloqueie conhecimentos</span></div></button>
        <button class="lr-menu-btn" data-go="learn"><span class="lr-btn-icon">📚</span><div class="lr-btn-text"><span class="lr-btn-title">Aprender</span><span class="lr-btn-desc">Teoria e exemplos</span></div></button>
        <button class="lr-menu-btn" data-go="diary"><span class="lr-btn-icon">📖</span><div class="lr-btn-text"><span class="lr-btn-title">Diário do Cientista</span><span class="lr-btn-desc">Suas descobertas</span></div></button>
        <button class="lr-menu-btn" data-go="shop"><span class="lr-btn-icon">🛒</span><div class="lr-btn-text"><span class="lr-btn-title">Loja do Lab</span><span class="lr-btn-desc">Gaste suas moedas</span></div></button>
        <button class="lr-menu-btn" data-go="character"><span class="lr-btn-icon">🧑‍🔬</span><div class="lr-btn-text"><span class="lr-btn-title">Personagem</span><span class="lr-btn-desc">Personalize seu cientista</span></div></button>
        <button class="lr-menu-btn" data-go="achievements"><span class="lr-btn-icon">🏆</span><div class="lr-btn-text"><span class="lr-btn-title">Conquistas</span><span class="lr-btn-desc">Suas medalhas</span></div></button>
        <button class="lr-menu-btn" data-go="ranking"><span class="lr-btn-icon">📊</span><div class="lr-btn-text"><span class="lr-btn-title">Ranking</span><span class="lr-btn-desc">Melhores cientistas</span></div></button>
        ${extremeBtn ? `<button class="lr-menu-btn extreme" data-go="extreme"><span class="lr-btn-icon">☢️</span><div class="lr-btn-text"><span class="lr-btn-title">MODO EXTREMO</span><span class="lr-btn-desc">Desafio máximo!</span></div></button>` : ''}
      </div>
    </div>
  `;
}

function renderCharSVG() {
  const c = progress.character;
  const coatColor = { branco: '#fff', azul: '#4dabf7', verde: '#00a651', roxo: '#cc5de8' }[c.coat] || '#fff';
  const hairColor = { escuro: '#333', loiro: '#fab005', ruivo: '#e8826b', castanho: '#8b4513' }[c.hair] || '#333';
  const glasses = c.glasses ? '<rect x="20" y="28" width="8" height="5" fill="none" stroke="#333" stroke-width="1.5"/><rect x="36" y="28" width="8" height="5" fill="none" stroke="#333" stroke-width="1.5"/><line x1="28" y1="30" x2="36" y2="30" stroke="#333" stroke-width="1.5"/>' : '';
  return `<svg viewBox="0 0 64 64" width="50" height="50"><circle cx="32" cy="20" r="10" fill="#fdb"/><path d="M22 18 Q32 8 42 18" fill="${hairColor}"/><rect x="18" y="30" width="28" height="25" rx="4" fill="${coatColor}"/><circle cx="27" cy="20" r="2" fill="#333"/><circle cx="37" cy="20" r="2" fill="#333"/>${glasses}</svg>`;
}

function setupMenu() {
  document.querySelectorAll('.lr-menu-btn').forEach(btn => btn.addEventListener('click', () => renderView(btn.dataset.go)));
  spawnBgParticles();
}

// ===== MAPA DE LABORATÓRIOS =====
function renderMap() {
  return `
    <div class="lr-mode">${renderBackBtn()}
      <div class="lr-mode-header"><h2 class="lr-mode-title">🗺️ Mapa de Laboratórios</h2><p class="lr-mode-desc">Avance pelos laboratórios desbloqueando novos desafios</p></div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-lab-map">
        ${labMap.map((lab, i) => {
          const unlocked = progress.xp >= lab.xpReq;
          const isCurrent = unlocked && (i === labMap.length - 1 || progress.xp < (labMap[i+1]?.xpReq || Infinity));
          return `<div class="lr-map-node ${unlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}" style="--lab-color:${lab.color};">
            <div class="lr-map-icon">${lab.icon}</div>
            <div class="lr-map-info"><h3 class="lr-map-name">${lab.name}</h3><p class="lr-map-desc">${lab.desc}</p><div class="lr-map-missions">${lab.missions} missões</div></div>
            <div class="lr-map-status">${unlocked ? (isCurrent ? '▶️' : '✅') : `🔒 ${lab.xpReq} XP`}</div>
          </div>`;
        }).join('<div class="lr-map-connector"></div>')}
      </div>
    </div>
  `;
}
function setupMap() { setupBackBtn(); spawnBgParticles(); }

// ===== LAB INTERATIVO =====
function renderLab() {
  labState = { selected: [], showResult: false, resultCorrect: false, hintsUsed: 0, testedReactions: [] };
  return `
    <div class="lr-mode">${renderBackBtn()}
      <div class="lr-mode-header"><h2 class="lr-mode-title">🔬 Laboratório Interativo</h2><p class="lr-mode-desc">Selecione reagentes e misture para descobrir reações!</p></div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-lab-advanced">
        <div class="lr-lab-equipment-bar">
          ${equipment.map(e => `<div class="lr-equip" title="${e.name}: ${e.desc}">${e.icon}</div>`).join('')}
        </div>
        <div class="lr-lab-substance-grid">
          ${substances.map(s => `<div class="lr-sub-card" data-id="${s.id}" title="${s.info}">
            <div class="lr-sub-icon" style="background:${s.color}33; border-color:${s.color};">${s.icon}</div>
            <div class="lr-sub-formula">${s.formula}</div>
            <div class="lr-sub-name">${s.name}</div>
            <div class="lr-sub-cat">${s.category}</div>
            <div class="lr-sub-qty">x${s.qty}</div>
          </div>`).join('')}
        </div>
        <div class="lr-lab-beaker-area">
          <div class="lr-beaker-visual" id="lrBeakerVis">
            <div class="lr-beaker-content" id="lrBeakerContent"><div class="lr-beaker-empty">Selecione substâncias e clique em Misturar</div></div>
            <div class="lr-beaker-bubbles" id="lrBeakerBubbles"></div>
          </div>
          <div class="lr-lab-selected" id="lrLabSelected"><span class="lr-empty">Nenhuma substância selecionada</span></div>
        </div>
        <div class="lr-lab-actions">
          <button class="lr-btn lr-btn-primary" id="lrMixBtn" disabled>🧪 Misturar</button>
          <button class="lr-btn lr-btn-secondary" id="lrClearBtn">Limpar</button>
          <button class="lr-btn lr-btn-hint" id="lrHintBtn">💡 Dica (3 níveis)</button>
        </div>
        <div class="lr-lab-result" id="lrLabResult"></div>
      </div>
    </div>
  `;
}

function setupLab() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('.lr-sub-card').forEach(card => {
    card.addEventListener('click', () => {
      if (labState.showResult) return;
      const id = card.dataset.id;
      if (card.classList.contains('selected')) return;
      card.classList.add('selected');
      labState.selected.push(id);
      updateLabSelected();
      document.getElementById('lrMixBtn').disabled = false;
      animateBubbles();
    });
  });
  document.getElementById('lrMixBtn').addEventListener('click', mixLab);
  document.getElementById('lrClearBtn').addEventListener('click', () => { labState.selected = []; labState.showResult = false; renderView('lab'); });
  document.getElementById('lrHintBtn').addEventListener('click', showLabHint);
}

function updateLabSelected() {
  const el = document.getElementById('lrLabSelected');
  if (!el) return;
  el.innerHTML = labState.selected.length === 0 ? '<span class="lr-empty">Nenhuma substância selecionada</span>'
    : labState.selected.map(id => { const s = getSubstance(id); return `<span class="lr-selected-chip" style="border-color:${s.color}; color:${s.color};">${s.formula}</span>`; }).join(' + ');
}

function mixLab() {
  const ids = labState.selected.sort();
  let found = null;
  for (const r of labReactions) {
    const rSorted = [...r.reactants].sort();
    if (rSorted.length === ids.length && rSorted.every((v, i) => v === ids[i])) { found = r; break; }
  }
  labState.showResult = true;
  const resultEl = document.getElementById('lrLabResult');

  if (found) {
    triggerReactionAnimation(found);
    progress.reactions++;
    progress.combo++;
    if (progress.combo > progress.bestCombo) progress.bestCombo = progress.combo;
    const comboBonus = getComboBonus();
    const xpGain = Math.round(50 * comboBonus);
    const ptGain = Math.round(100 * comboBonus);
    const coinGain = 15;
    progress.xp += xpGain; progress.points += ptGain; progress.coins += coinGain;
    if (!progress.typeCorrect[found.type]) progress.typeCorrect[found.type] = 0;
    progress.typeCorrect[found.type]++;
    if (!progress.discoveredReactions.includes(found.equation)) {
      progress.discoveredReactions.push(found.equation);
      progress.diary.push({ equation: found.equation, type: found.type, desc: found.desc, date: new Date().toLocaleDateString('pt-BR') });
    }
    checkAchievements(); saveProgress();
    resultEl.innerHTML = `
      <div class="lr-result lr-result-success">
        <div class="lr-result-emoji">🎉</div>
        <h3 class="lr-result-title">Reação Descoberta!</h3>
        <div class="lr-result-eq">${found.equation}</div>
        <p class="lr-result-desc">${found.desc}</p>
        <div class="lr-result-meta"><span class="lr-meta-tag">${found.type}</span><span class="lr-meta-tag">${found.temp}</span></div>
        <div class="lr-result-rewards">+${ptGain} pts · +${xpGain} XP · +${coinGain} 💰 ${comboBonus > 1 ? `· 🔥 Combo ${comboBonus}x!` : ''}</div>
        <div class="lr-diary-note">📖 Adicionado ao seu Diário do Cientista!</div>
        <button class="lr-btn lr-btn-primary" id="lrLabNext">Continuar →</button>
      </div>`;
    document.getElementById('lrLabNext').addEventListener('click', () => renderView('lab'));
  } else {
    progress.combo = 0; saveProgress();
    resultEl.innerHTML = `
      <div class="lr-result lr-result-fail">
        <div class="lr-result-emoji">🤔</div>
        <h3 class="lr-result-title">Nenhuma reação conhecida...</h3>
        <p class="lr-result-hint">Tente outra combinação! Use a dica se precisar.</p>
        <button class="lr-btn lr-btn-secondary" id="lrLabRetry">Tentar Novamente</button>
      </div>`;
    document.getElementById('lrLabRetry').addEventListener('click', () => { labState.selected = []; labState.showResult = false; renderView('lab'); });
  }
  updateProgressBar();
}

function getComboBonus() {
  if (progress.combo >= 10) return 1.5;
  if (progress.combo >= 5) return 1.25;
  if (progress.combo >= 3) return 1.1;
  return 1;
}

function showLabHint() {
  labState.hintsUsed++;
  const level = labState.hintsUsed;
  const resultEl = document.getElementById('lrLabResult');
  if (!resultEl || labState.showResult) return;
  let hint = '';
  if (level === 1) hint = '💡 Tente combinar elementos com gases reativos (O₂, H₂)...';
  else if (level === 2) hint = '💡💡 Combustão precisa de oxigênio. Neutralização precisa de ácido + base.';
  else hint = '💡💡💡 Experimente: H₂+O₂, CH₄+O₂, HCl+NaOH, Zn+CuSO₄...';
  resultEl.innerHTML = `<div class="lr-result lr-result-hint">${hint}<br><small>Usar dicas reduz sua recompensa.</small></div>`;
}

function triggerReactionAnimation(r) {
  const beaker = document.getElementById('lrBeakerContent');
  if (!beaker) return;
  beaker.style.background = r.color + '33';
  beaker.classList.add('reacting');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div'); p.className = 'lr-reaction-particle';
    p.style.left = (10 + Math.random() * 80) + '%'; p.style.animationDelay = Math.random() * 0.5 + 's';
    p.style.background = ['#00ff88','#4dabf7','#fab005','#ff6b6b','#cc5de8'][Math.floor(Math.random() * 5)];
    beaker.appendChild(p); setTimeout(() => p.remove(), 2000);
  }
  setTimeout(() => { beaker.classList.remove('reacting'); beaker.style.background = ''; }, 2000);
}

function animateBubbles() {
  const b = document.getElementById('lrBeakerBubbles'); if (!b) return;
  for (let i = 0; i < 5; i++) {
    const bubble = document.createElement('div'); bubble.className = 'lr-beaker-bubble';
    bubble.style.left = (20 + Math.random() * 60) + '%'; bubble.style.animationDelay = Math.random() * 0.5 + 's';
    b.appendChild(bubble); setTimeout(() => bubble.remove(), 2000);
  }
}

// ===== INVESTIGAÇÃO =====
function renderInvestigation() {
  const idx = invState.currentIdx || 0;
  const inv = investigations[idx];
  invState = { currentIdx: idx, testedReagents: [], solved: false, hintsUsed: 0, ...invState };
  return `
    <div class="lr-mode">${renderBackBtn()}
      <div class="lr-mode-header"><h2 class="lr-mode-title">🕵️ Investigação Química</h2><p class="lr-mode-desc">${inv.title}</p></div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-investigation">
        <div class="lr-inv-desc">${inv.desc}</div>
        <div class="lr-inv-unknown">
          <div class="lr-inv-flask">❓</div>
          <div class="lr-inv-flask-label">Substância Desconhecida</div>
        </div>
        <div class="lr-inv-reagents">
          <h4>Reagentes para teste:</h4>
          <div class="lr-inv-reagent-list">
            ${inv.tests.map((t, i) => `<button class="lr-inv-test-btn" data-idx="${i}" ${invState.testedReagents.includes(i) ? 'disabled' : ''}>${t.reagent.toUpperCase()}</button>`).join('')}
          </div>
        </div>
        <div class="lr-inv-results" id="lrInvResults">
          ${invState.testedReagents.length === 0 ? '<p class="lr-empty">Nenhum teste realizado ainda. Clique nos reagentes acima.</p>' : ''}
        </div>
        <div class="lr-inv-answer-section" id="lrInvAnswer" style="display:${invState.testedReagents.length >= 2 ? 'block' : 'none'};">
          <h4>Baseado nas evidências, o que é a substância?</h4>
          <div class="lr-inv-options">
            ${inv.options.map((o, i) => `<button class="lr-inv-option" data-idx="${i}">${o}</button>`).join('')}
          </div>
        </div>
        <div class="lr-lab-result" id="lrInvResult"></div>
      </div>
    </div>
  `;
}

function setupInvestigation() {
  setupBackBtn(); spawnBgParticles();
  const inv = investigations[invState.currentIdx || 0];
  document.querySelectorAll('.lr-inv-test-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.idx);
      if (invState.testedReagents.includes(i)) return;
      invState.testedReagents.push(i);
      const test = inv.tests[i];
      const results = document.getElementById('lrInvResults');
      const evIcon = { 'gás': '💨', 'precipitado': '🧫', 'cor': '🎨', 'calor': '🌡️', 'neutralização': '⚖️', 'nenhum': '❌' }[test.evidence] || '✨';
      results.innerHTML += `<div class="lr-inv-result-entry"><span class="lr-ev-icon">${evIcon}</span> <strong>${test.reagent.toUpperCase()}</strong>: ${test.result}</div>`;
      btn.disabled = true;
      if (invState.testedReagents.length >= 2) {
        document.getElementById('lrInvAnswer').style.display = 'block';
      }
    });
  });
  document.querySelectorAll('.lr-inv-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = parseInt(btn.dataset.idx);
      const correct = selected === inv.answer;
      const resultEl = document.getElementById('lrInvResult');
      if (correct) {
        progress.investigations++; progress.combo++;
        const xpG = 80, ptG = 150, coinG = 25;
        progress.xp += xpG; progress.points += ptG; progress.coins += coinG;
        checkAchievements(); saveProgress();
        resultEl.innerHTML = `<div class="lr-result lr-result-success"><div class="lr-result-emoji">🎯</div><h3 class="lr-result-title">Descoberto!</h3><p class="lr-result-desc">${inv.explain}</p><div class="lr-result-rewards">+${ptG} pts · +${xpG} XP · +${coinG} 💰</div><button class="lr-btn lr-btn-primary" id="lrInvNext">Próximo →</button></div>`;
        document.getElementById('lrInvNext').addEventListener('click', () => { invState = { currentIdx: ((invState.currentIdx || 0) + 1) % investigations.length }; renderView('investigation'); });
      } else {
        progress.combo = 0; saveProgress();
        resultEl.innerHTML = `<div class="lr-result lr-result-fail"><div class="lr-result-emoji">🤔</div><h3 class="lr-result-title">Incorreto</h3><p class="lr-result-hint">Analise as evidências com mais atenção.</p><button class="lr-btn lr-btn-secondary" id="lrInvRetry">Tentar Novamente</button></div>`;
        document.getElementById('lrInvRetry').addEventListener('click', () => { invState.testedReagents = []; renderView('investigation'); });
      }
      updateProgressBar();
    });
  });
}

// ===== DESAFIO MULTIETAPAS =====
function renderMultiStep() {
  const idx = multiState.currentIdx || 0;
  const mission = multiStepMissions[idx];
  multiState = { currentIdx: idx, step: 0, errors: 0, startTime: Date.now(), coefficients: [], answered: false, ...multiState };
  if (multiState.step === undefined) multiState.step = 0;
  const step = mission.steps[multiState.step];
  return `
    <div class="lr-mode">${renderBackBtn()}
      <div class="lr-mode-header"><h2 class="lr-mode-title">🧩 ${mission.title}</h2><p class="lr-mode-desc">${mission.desc}</p></div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-multistep">
        <div class="lr-ms-progress">${mission.steps.map((_, i) => `<div class="lr-ms-dot ${i < multiState.step ? 'done' : ''} ${i === multiState.step ? 'current' : ''}">${i + 1}</div>`).join('')}</div>
        <div class="lr-ms-step-label">Etapa ${multiState.step + 1} de ${mission.steps.length}</div>
        <div class="lr-ms-question" id="lrMsQuestion">${renderMultiStepQuestion(step)}</div>
        <div class="lr-ms-result" id="lrMsResult"></div>
      </div>
    </div>
  `;
}

function renderMultiStepQuestion(step) {
  if (step.type === 'balance') {
    multiState.coefficients = new Array(step.labels.length).fill(1);
    return `
      <p class="lr-ms-q-text">${step.q}</p>
      <div class="lr-balance-equation">${step.labels.map((label, i) => {
        const arrow = i < step.labels.length - 1 ? (i === Math.floor(step.labels.length / 2 - 1) ? ' → ' : ' + ') : '';
        return `<span class="lr-eq-part"><span class="lr-eq-coef" id="msCoef${i}"></span><span class="lr-eq-substance">${label}</span></span>${arrow}`;
      }).join('')}</div>
      <div class="lr-balance-controls">${step.labels.map((label, i) => `<div class="lr-balance-control"><span class="lr-balance-substance">${label}</span><div class="lr-coef-buttons">${[1,2,3,4].map(n => `<button class="lr-coef-btn ${n===1?'active':''}" data-idx="${i}" data-val="${n}">${n}</button>`).join('')}</div></div>`).join('')}</div>
      <button class="lr-btn lr-btn-primary" id="lrMsBalanceCheck">✓ Verificar</button>
    `;
  }
  return `
    <p class="lr-ms-q-text">${step.q}</p>
    <div class="lr-ms-options">${step.options.map((o, i) => `<button class="lr-ms-option" data-idx="${i}">${o}</button>`).join('')}</div>
  `;
}

function setupMultiStep() {
  setupBackBtn(); spawnBgParticles();
  const mission = multiStepMissions[multiState.currentIdx || 0];
  const step = mission.steps[multiState.step];
  if (step.type === 'balance') {
    document.querySelectorAll('.lr-coef-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx), val = parseInt(btn.dataset.val);
        multiState.coefficients[idx] = val;
        document.querySelectorAll(`.lr-coef-btn[data-idx="${idx}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const coefEl = document.getElementById('msCoef' + idx);
        if (coefEl) coefEl.textContent = val === 1 ? '' : val;
      });
    });
    document.getElementById('lrMsBalanceCheck').addEventListener('click', () => {
      const correct = multiState.coefficients.every((c, i) => c === step.coefficients[i]);
      handleMultiStepAnswer(correct, mission);
    });
  } else {
    document.querySelectorAll('.lr-ms-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.dataset.idx);
        const correct = selected === step.answer;
        document.querySelectorAll('.lr-ms-option').forEach((b, i) => {
          b.disabled = true;
          if (i === step.answer) b.classList.add('correct');
          if (i === selected && !correct) b.classList.add('wrong');
        });
        handleMultiStepAnswer(correct, mission);
      });
    });
  }
}

function handleMultiStepAnswer(correct, mission) {
  const resultEl = document.getElementById('lrMsResult');
  if (correct) {
    resultEl.innerHTML = `<div class="lr-feedback lr-feedback-success">✅ Correto!</div>`;
    multiState.step++;
    if (multiState.step >= mission.steps.length) {
      const timeSec = Math.round((Date.now() - multiState.startTime) / 1000);
      const stars = multiState.errors === 0 ? 3 : multiState.errors <= 1 ? 2 : 1;
      progress.stars['ms' + (multiState.currentIdx || 0)] = stars;
      const r = mission.reward;
      const starBonus = stars === 3 ? 1.5 : stars === 2 ? 1.2 : 1;
      const xpG = Math.round(r.xp * starBonus), ptG = Math.round(r.points * starBonus);
      progress.xp += xpG; progress.points += ptG; progress.coins += r.coins;
      progress.combo++; checkAchievements(); saveProgress();
      resultEl.innerHTML = `<div class="lr-result lr-result-success"><div class="lr-result-emoji">🏁</div><h3 class="lr-result-title">Missão Completa! ${'⭐'.repeat(stars)}</h3><p class="lr-result-desc">${mission.explain}</p><div class="lr-result-rewards">+${ptG} pts · +${xpG} XP · +${r.coins} 💰</div><button class="lr-btn lr-btn-primary" id="lrMsNext">Próxima Missão →</button></div>`;
      document.getElementById('lrMsNext').addEventListener('click', () => { multiState = { currentIdx: ((multiState.currentIdx || 0) + 1) % multiStepMissions.length, step: 0, errors: 0, startTime: Date.now() }; renderView('multistep'); });
    } else {
      setTimeout(() => renderView('multistep'), 800);
    }
  } else {
    multiState.errors++; progress.combo = 0; saveProgress();
    resultEl.innerHTML = `<div class="lr-feedback lr-feedback-fail">❌ Incorreto. Tente novamente!</div>`;
    setTimeout(() => { resultEl.innerHTML = ''; }, 1500);
  }
  updateProgressBar();
}

// ===== BALANCEAMENTO =====
function renderBalance() {
  if (balanceState.currentIdx === undefined) balanceState.currentIdx = 0;
  const ch = balanceChallenges[balanceState.currentIdx];
  balanceState.coefficients = new Array(ch.labels.length).fill(1);
  balanceState.answered = false;
  return `
    <div class="lr-mode">${renderBackBtn()}
      <div class="lr-mode-header"><h2 class="lr-mode-title">⚖️ Equilibre a Equação</h2><p class="lr-mode-desc">Dificuldade: <span class="lr-diff-badge lr-diff-${ch.difficulty.toLowerCase()}">${ch.difficulty}</span></p></div>
      <div id="lrProgressBar" class="lr-progress-bar"></div>
      <div class="lr-balance">
        <div class="lr-balance-label">Desafio ${balanceState.currentIdx + 1}/${balanceChallenges.length}</div>
        <div class="lr-balance-equation" id="lrBalanceEq">${renderBalanceEq()}</div>
        <div class="lr-atom-counter" id="lrAtomCounter"></div>
        <div class="lr-balance-controls">${ch.labels.map((label, i) => `<div class="lr-balance-control"><span class="lr-balance-substance">${label}</span><div class="lr-coef-buttons">${[1,2,3,4,5].map(n => `<button class="lr-coef-btn ${n===1?'active':''}" data-idx="${i}" data-val="${n}">${n}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="lr-balance-actions"><button class="lr-btn lr-btn-primary" id="lrBalanceCheck">✓ Verificar</button><button class="lr-btn lr-btn-hint" id="lrBalanceHint">💡 Dica</button></div>
        <div class="lr-balance-result" id="lrBalanceResult"></div>
      </div>
    </div>
  `;
}

function renderBalanceEq() {
  const ch = balanceChallenges[balanceState.currentIdx];
  return ch.labels.map((label, i) => {
    const coef = balanceState.coefficients[i]; const coefStr = coef === 1 ? '' : coef;
    const arrow = i < ch.labels.length - 1 ? (i === Math.floor(ch.labels.length / 2 - 1) ? ' → ' : ' + ') : '';
    return `<span class="lr-eq-part"><span class="lr-eq-coef">${coefStr}</span><span class="lr-eq-substance">${label}</span></span>${arrow}`;
  }).join('');
}

function setupBalance() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('.lr-coef-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (balanceState.answered) return;
      const idx = parseInt(btn.dataset.idx), val = parseInt(btn.dataset.val);
      balanceState.coefficients[idx] = val;
      document.querySelectorAll(`.lr-coef-btn[data-idx="${idx}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('lrBalanceEq').innerHTML = renderBalanceEq();
    });
  });
  document.getElementById('lrBalanceCheck').addEventListener('click', checkBalance);
  document.getElementById('lrBalanceHint').addEventListener('click', () => {
    if (balanceState.answered) return;
    document.getElementById('lrBalanceResult').innerHTML = `<div class="lr-result lr-result-hint">💡 Conte os átomos de cada elemento dos dois lados.</div>`;
  });
}

function checkBalance() {
  if (balanceState.answered) return;
  balanceState.answered = true;
  const ch = balanceChallenges[balanceState.currentIdx];
  const correct = balanceState.coefficients.every((c, i) => c === ch.coefficients[i]);
  const resultEl = document.getElementById('lrBalanceResult');
  if (correct) {
    progress.balanced++; progress.combo++;
    const comboB = getComboBonus();
    const xpG = Math.round(60 * comboB), ptG = Math.round(120 * comboB);
    progress.xp += xpG; progress.points += ptG; progress.coins += 10;
    checkAchievements(); saveProgress();
    resultEl.innerHTML = `<div class="lr-result lr-result-success"><div class="lr-result-emoji">✅</div><h3 class="lr-result-title">Equilibrada!</h3><p class="lr-result-desc">${ch.explain}</p><div class="lr-result-rewards">+${ptG} pts · +${xpG} XP · +10 💰</div><button class="lr-btn lr-btn-primary" id="lrBalanceNext">Próximo →</button></div>`;
    document.getElementById('lrBalanceNext').addEventListener('click', () => { balanceState.currentIdx = (balanceState.currentIdx + 1) % balanceChallenges.length; renderView('balance'); });
  } else {
    progress.combo = 0; saveProgress();
    resultEl.innerHTML = `<div class="lr-result lr-result-fail"><div class="lr-result-emoji">🤔</div><h3 class="lr-result-title">Não está equilibrada</h3><p class="lr-result-hint">Verifique os átomos de cada lado.</p><button class="lr-btn lr-btn-secondary" id="lrBalanceRetry">Tentar Novamente</button></div>`;
    document.getElementById('lrBalanceRetry').addEventListener('click', () => { balanceState.answered = false; renderView('balance'); });
  }
  updateProgressBar();
}

// ===== RELÂMPAGO =====
function renderLightning() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">⚡ Desafio Relâmpago</h2><p class="lr-mode-desc">60 segundos para responder!</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-lightning" id="lrLightningArea"><div class="lr-lightning-start"><div class="lr-lightning-timer-display">60s</div><p>60 segundos. Cada acerto: +50 pts, +30 XP.</p><p>🔥 Combo: 3=+10%, 5=+25%, 10=+50% XP!</p><button class="lr-btn lr-btn-primary lr-btn-large" id="lrLightningStart">⚡ Começar!</button></div></div></div>`;
}
function setupLightning() { setupBackBtn(); spawnBgParticles(); document.getElementById('lrLightningStart').addEventListener('click', startLightning); }

function startLightning() {
  lightningState = { score: 0, timeLeft: 60, currentQ: 0, order: shuffle([...Array(lightningQuestions.length).keys()]), active: true, combo: 0, timerInterval: null };
  clearInterval(lightningState.timerInterval);
  lightningState.timerInterval = setInterval(() => { lightningState.timeLeft--; updateLightningTimer(); if (lightningState.timeLeft <= 0) endLightning(); }, 1000);
  showLightningQ();
}

function shuffle(arr) { const a = [...arr]; for (let i = a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function showLightningQ() {
  if (!lightningState.active) return;
  const q = lightningQuestions[lightningState.order[lightningState.currentQ % lightningState.order.length]];
  document.getElementById('lrLightningArea').innerHTML = `
    <div class="lr-lightning-timer-bar"><div class="lr-lightning-timer-fill ${lightningState.timeLeft<=10?'danger':''}" id="lrLtFill" style="width:${(lightningState.timeLeft/60)*100}%;"></div><span class="lr-lightning-timer-text">${lightningState.timeLeft}s</span></div>
    <div class="lr-lightning-score">Acertos: ${lightningState.score} ${lightningState.combo>=3?`🔥 ${lightningState.combo}x`:''}</div>
    <div class="lr-lightning-question"><div class="lr-q-text">${q.q}</div><div class="lr-q-options">${q.options.map((o,i)=>`<button class="lr-q-option" data-idx="${i}">${o}</button>`).join('')}</div></div>
    <div id="lrLightningFeedback"></div>`;
  document.querySelectorAll('.lr-q-option').forEach(btn => btn.addEventListener('click', () => {
    const sel = parseInt(btn.dataset.idx); const correct = sel === q.answer;
    const fb = document.getElementById('lrLightningFeedback');
    document.querySelectorAll('.lr-q-option').forEach((b,i) => { b.disabled = true; if (i===q.answer) b.classList.add('correct'); if (i===sel && !correct) b.classList.add('wrong'); });
    if (correct) { lightningState.score++; lightningState.combo++; progress.lightningCorrect++; progress.combo = lightningState.combo; if (progress.combo > progress.bestCombo) progress.bestCombo = progress.combo; const comboB = getComboBonus(); progress.xp += Math.round(30*comboB); progress.points += 50; fb.innerHTML = `<div class="lr-feedback lr-feedback-success">✅ ${q.explain}</div>`; }
    else { lightningState.combo = 0; fb.innerHTML = `<div class="lr-feedback lr-feedback-fail">❌ ${q.explain}</div>`; }
    checkAchievements(); saveProgress(); updateProgressBar(); lightningState.currentQ++;
    setTimeout(() => { if (lightningState.active) showLightningQ(); }, 1000);
  }));
}

function updateLightningTimer() {
  const f = document.getElementById('lrLtFill'); const t = document.querySelector('.lr-lightning-timer-text');
  if (f) f.style.width = (lightningState.timeLeft/60)*100 + '%';
  if (t) t.textContent = lightningState.timeLeft + 's';
}

function endLightning() {
  clearInterval(lightningState.timerInterval); lightningState.active = false;
  document.getElementById('lrLightningArea').innerHTML = `<div class="lr-lightning-result"><div class="lr-result-emoji">⏱️</div><h3 class="lr-result-title">Tempo!</h3><div class="lr-lightning-final-score">${lightningState.score} acertos</div><div class="lr-result-rewards">+${lightningState.score*50} pts · +${lightningState.score*30} XP</div><button class="lr-btn lr-btn-primary" id="lrLtRetry">⚡ Jogar Novamente</button></div>`;
  document.getElementById('lrLtRetry').addEventListener('click', startLightning);
}

// ===== IDENTIFICAR =====
function renderIdentify() {
  if (identifyState.currentIdx === undefined) identifyState.currentIdx = 0;
  if (identifyState.answered === undefined) identifyState.answered = false;
  const q = identifyQuestions[identifyState.currentIdx];
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">🧠 Identifique a Reação</h2><p class="lr-mode-desc">Classifique a reação corretamente</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-identify"><div class="lr-identify-label">Questão ${identifyState.currentIdx+1}/${identifyQuestions.length}</div><div class="lr-identify-equation">${q.equation}</div><div class="lr-identify-options">${q.options.map((o,i)=>`<button class="lr-identify-btn" data-idx="${i}">${o}</button>`).join('')}</div><div class="lr-identify-result" id="lrIdentifyResult"></div></div></div>`;
}
function setupIdentify() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('.lr-identify-btn').forEach(btn => btn.addEventListener('click', () => {
    if (identifyState.answered) return; identifyState.answered = true;
    const sel = parseInt(btn.dataset.idx); const q = identifyQuestions[identifyState.currentIdx];
    const correct = sel === q.answer; const r = document.getElementById('lrIdentifyResult');
    document.querySelectorAll('.lr-identify-btn').forEach((b,i) => { b.disabled = true; if (i===q.answer) b.classList.add('correct'); if (i===sel && !correct) b.classList.add('wrong'); });
    if (correct) { progress.identified++; progress.combo++; const cB = getComboBonus(); const xpG = Math.round(40*cB); progress.xp += xpG; progress.points += 80; progress.coins += 8; checkAchievements(); saveProgress();
      r.innerHTML = `<div class="lr-result lr-result-success"><div class="lr-result-emoji">✅</div><h3 class="lr-result-title">Correto!</h3><p class="lr-result-desc">${q.explain}</p><div class="lr-result-rewards">+80 pts · +${xpG} XP · +8 💰</div><button class="lr-btn lr-btn-primary" id="lrIdNext">Próximo →</button></div>`;
    } else { progress.combo = 0; saveProgress();
      r.innerHTML = `<div class="lr-result lr-result-fail"><div class="lr-result-emoji">🤔</div><h3 class="lr-result-title">Resposta: ${q.options[q.answer]}</h3><p class="lr-result-desc">${q.explain}</p><button class="lr-btn lr-btn-primary" id="lrIdNext">Próximo →</button></div>`;
    }
    document.getElementById('lrIdNext').addEventListener('click', () => { identifyState.currentIdx = (identifyState.currentIdx+1) % identifyQuestions.length; identifyState.answered = false; renderView('identify'); });
    updateProgressBar();
  }));
}

// ===== CHEFÕES =====
function renderBoss() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">👾 Chefões de Química</h2><p class="lr-mode-desc">Enfrente os guardiões da química!</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-boss-list">${bosses.map(b => { const defeated = progress.bossesDefeated.includes(b.id); return `<div class="lr-boss-card ${defeated?'defeated':''}"><div class="lr-boss-icon" style="color:${b.color};">${b.icon}</div><div class="lr-boss-info"><h3 class="lr-boss-name">${b.name}</h3><p class="lr-boss-desc">${b.desc}</p><div class="lr-boss-hp-bar"><div class="lr-boss-hp-fill" style="width:${defeated?0:100}%; background:${b.color};"></div></div></div><button class="lr-btn ${defeated?'lr-btn-secondary':'lr-btn-primary'}" data-boss="${b.id}" ${defeated?'disabled':''}>${defeated?'✅ Derrotado':'⚔️ Enfrentar'}</button></div>`; }).join('')}</div></div>`;
}
function setupBoss() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('[data-boss]').forEach(btn => btn.addEventListener('click', () => { startBossFight(parseInt(btn.dataset.boss)); }));
}

function startBossFight(bossId) {
  const boss = bosses.find(b => b.id === bossId);
  bossState = { boss, hp: boss.hp, currentQ: 0, correct: 0, active: true };
  document.getElementById('lrContent').innerHTML = `<div class="lr-mode"><div class="lr-boss-fight"><div class="lr-boss-fight-header"><div class="lr-boss-fight-icon">${boss.icon}</div><h2 class="lr-boss-fight-name">${boss.name}</h2><div class="lr-boss-hp-bar large"><div class="lr-boss-hp-fill" id="lrBossHp" style="width:100%; background:${boss.color};"></div></div><div class="lr-boss-hp-text" id="lrBossHpText">${boss.hp}/${boss.hp}</div></div><div class="lr-boss-arena" id="lrBossArena"></div></div></div>`;
  showBossQuestion();
}

function showBossQuestion() {
  const boss = bossState.boss;
  if (boss.type === 'balance') {
    const ch = balanceChallenges[boss.questions[bossState.currentQ]];
    bossState.coefficients = new Array(ch.labels.length).fill(1);
    document.getElementById('lrBossArena').innerHTML = `
      <p class="lr-ms-q-text">Balanceie: ${ch.equation.replace(/\d+/g, '__')}</p>
      <div class="lr-balance-controls">${ch.labels.map((l,i)=>`<div class="lr-balance-control"><span class="lr-balance-substance">${l}</span><div class="lr-coef-buttons">${[1,2,3,4,5].map(n=>`<button class="lr-coef-btn ${n===1?'active':''}" data-idx="${i}" data-val="${n}">${n}</button>`).join('')}</div></div>`).join('')}</div>
      <button class="lr-btn lr-btn-primary" id="lrBossAnswer">Atacar! ⚔️</button>
      <div id="lrBossFeedback"></div>`;
    document.querySelectorAll('.lr-coef-btn').forEach(btn => btn.addEventListener('click', () => { const i=parseInt(btn.dataset.idx),v=parseInt(btn.dataset.val); bossState.coefficients[i]=v; document.querySelectorAll(`.lr-coef-btn[data-idx="${i}"]`).forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }));
    document.getElementById('lrBossAnswer').addEventListener('click', () => {
      const correct = bossState.coefficients.every((c,i)=>c===ch.coefficients[i]);
      handleBossAnswer(correct, ch.explain);
    });
  } else if (boss.type === 'identify') {
    const q = identifyQuestions[boss.questions[bossState.currentQ]];
    document.getElementById('lrBossArena').innerHTML = `<p class="lr-ms-q-text">${q.equation}</p><div class="lr-ms-options">${q.options.map((o,i)=>`<button class="lr-ms-option" data-idx="${i}">${o}</button>`).join('')}</div><div id="lrBossFeedback"></div>`;
    document.querySelectorAll('.lr-ms-option').forEach(btn => btn.addEventListener('click', () => { const sel=parseInt(btn.dataset.idx); const correct=sel===q.answer; document.querySelectorAll('.lr-ms-option').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct');if(i===sel&&!correct)b.classList.add('wrong');}); handleBossAnswer(correct, q.explain); }));
  } else if (boss.type === 'multistep') {
    const m = multiStepMissions[boss.questions[bossState.currentQ]];
    document.getElementById('lrBossArena').innerHTML = `<p class="lr-ms-q-text">${m.title}: ${m.desc}</p><p class="lr-result-desc">${m.explain}</p><div class="lr-ms-options"><button class="lr-ms-option" data-idx="0">Classificar: ${m.steps[3].options[m.steps[3].answer]}</button><button class="lr-ms-option" data-idx="1">Outro tipo</button></div><div id="lrBossFeedback"></div>`;
    document.querySelectorAll('.lr-ms-option').forEach(btn => btn.addEventListener('click', () => { const correct = parseInt(btn.dataset.idx) === 0; handleBossAnswer(correct, m.explain); }));
  }
}

function handleBossAnswer(correct, explain) {
  const fb = document.getElementById('lrBossFeedback');
  if (correct) {
    bossState.hp--; bossState.correct++;
    fb.innerHTML = `<div class="lr-feedback lr-feedback-success">⚔️ Dano causado! ${explain}</div>`;
    document.getElementById('lrBossHp').style.width = (bossState.hp / bossState.boss.hp * 100) + '%';
    document.getElementById('lrBossHpText').textContent = `${bossState.hp}/${bossState.boss.hp}`;
    if (bossState.hp <= 0) {
      const r = bossState.boss.reward;
      progress.xp += r.xp; progress.points += r.points; progress.coins += r.coins;
      progress.bossesDefeated.push(bossState.boss.id); checkAchievements(); saveProgress();
      fb.innerHTML = `<div class="lr-result lr-result-success"><div class="lr-result-emoji">🏆</div><h3 class="lr-result-title">${bossState.boss.name} Derrotado!</h3><div class="lr-result-rewards">+${r.points} pts · +${r.xp} XP · +${r.coins} 💰</div><button class="lr-btn lr-btn-primary" id="lrBossDone">Voltar</button></div>`;
      document.getElementById('lrBossDone').addEventListener('click', () => renderView('boss'));
    } else {
      bossState.currentQ++; setTimeout(showBossQuestion, 1500);
    }
  } else {
    fb.innerHTML = `<div class="lr-feedback lr-feedback-fail">🛡️ O chefão resistiu! ${explain}</div>`;
    bossState.currentQ++; setTimeout(showBossQuestion, 1500);
  }
  updateProgressBar();
}

// ===== ÁRVORE DO SABER =====
function renderTree() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">🌳 Árvore do Conhecimento</h2><p class="lr-mode-desc">Desbloqueie conhecimentos progressivamente</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-tree">${knowledgeTree.map((k, i) => { const unlocked = progress.xp >= k.xpReq; return `<div class="lr-tree-node ${unlocked?'unlocked':'locked'}" style="--node-color:${['#4dabf7','#00ff88','#fab005','#ff6b6b','#cc5de8','#ffd700'][i]};">${i>0?'<div class="lr-tree-connector"></div>':''}<div class="lr-tree-content"><div class="lr-tree-icon">${k.icon}</div><div class="lr-tree-info"><h3 class="lr-tree-name">${k.name}</h3><p class="lr-tree-desc">${k.desc}</p><div class="lr-tree-status">${unlocked?'✅ Desbloqueado':`🔒 ${k.xpReq} XP`}</div></div></div></div>`; }).join('')}</div></div>`;
}
function setupTree() { setupBackBtn(); spawnBgParticles(); }

// ===== CONQUISTAS =====
function renderAchievementsPage() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">🏆 Conquistas</h2></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-achievements"><div class="lr-achievements-grid">${achievements.map(a => { const u = progress.unlockedAchievements.includes(a.id); return `<div class="lr-achievement-card ${u?'unlocked':'locked'}"><div class="lr-achievement-icon ${u?'':'locked-icon'}">${a.icon}</div><div class="lr-achievement-info"><h3 class="lr-achievement-name">${a.name}</h3><p class="lr-achievement-desc">${a.desc}</p></div><div class="lr-achievement-status">${u?'✅':'🔒'}</div></div>`; }).join('')}</div></div></div>`;
}
function setupAchievementsPage() { setupBackBtn(); spawnBgParticles(); }

// ===== APRENDER =====
function renderLearn() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">📚 Aprender</h2><p class="lr-mode-desc">Teoria de reações químicas</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-learn"><div class="lr-learn-topics">${learningTopics.map((t,i)=>`<button class="lr-learn-topic-btn ${i===0?'active':''}" data-idx="${i}"><span class="lr-learn-topic-icon">${t.icon}</span><span class="lr-learn-topic-title">${t.title}</span></button>`).join('')}</div><div class="lr-learn-content" id="lrLearnContent"></div></div></div>`;
}
function setupLearn() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('.lr-learn-topic-btn').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.lr-learn-topic-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); showLearnTopic(parseInt(btn.dataset.idx)); }));
  showLearnTopic(0);
}
function showLearnTopic(idx) {
  const t = learningTopics[idx];
  document.getElementById('lrLearnContent').innerHTML = `<div class="lr-learn-card"><div class="lr-learn-card-header"><span class="lr-learn-card-icon">${t.icon}</span><h3 class="lr-learn-card-title">${t.title}</h3></div><p class="lr-learn-card-text">${t.text}</p><div class="lr-learn-card-example"><span class="lr-learn-example-label">Exemplo:</span><div class="lr-learn-example-eq">${t.example}</div></div><div class="lr-learn-challenge"><div class="lr-learn-challenge-label">Mini Desafio:</div><div class="lr-learn-challenge-q">${t.challenge.q}</div><div class="lr-learn-challenge-options">${t.challenge.options.map((o,i)=>`<button class="lr-learn-challenge-btn" data-idx="${i}">${o}</button>`).join('')}</div><div class="lr-learn-challenge-result" id="lrLearnChRes"></div></div></div>`;
  document.querySelectorAll('.lr-learn-challenge-btn').forEach(btn => btn.addEventListener('click', () => { const s=parseInt(btn.dataset.idx); const c=s===t.challenge.answer; document.querySelectorAll('.lr-learn-challenge-btn').forEach((b,i)=>{b.disabled=true;if(i===t.challenge.answer)b.classList.add('correct');if(i===s&&!c)b.classList.add('wrong');}); document.getElementById('lrLearnChRes').innerHTML = c?`<div class="lr-feedback lr-feedback-success">✅ Correto!</div>`:`<div class="lr-feedback lr-feedback-fail">❌ Resposta: ${t.challenge.options[t.challenge.answer]}</div>`; if(c){progress.xp+=10;saveProgress();updateProgressBar();} }));
}

// ===== DIÁRIO =====
function renderDiary() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">📖 Diário do Cientista</h2><p class="lr-mode-desc">Reações que você descobriu</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-diary">${progress.diary.length===0?'<p class="lr-empty">Nenhuma descoberta ainda. Use o Laboratório para descobrir reações!</p>':progress.diary.map(d=>`<div class="lr-diary-entry"><div class="lr-diary-eq">${d.equation}</div><div class="lr-diary-meta"><span class="lr-meta-tag">${d.type}</span><span class="lr-diary-date">${d.date}</span></div><p class="lr-diary-desc">${d.desc}</p></div>`).join('')}</div></div>`;
}
function setupDiary() { setupBackBtn(); spawnBgParticles(); }

// ===== PERSONAGEM =====
function renderCharacter() {
  const c = progress.character;
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">🧑‍🔬 Personagem</h2><p class="lr-mode-desc">Personalize seu cientista</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-character"><div class="lr-char-preview">${renderCharSVG()}</div><div class="lr-char-options"><div class="lr-char-group"><label>Cabelo:</label><div class="lr-char-choices">${['escuro','loiro','ruivo','castanho'].map(h=>`<button class="lr-char-choice ${c.hair===h?'active':''}" data-type="hair" data-val="${h}">${h}</button>`).join('')}</div></div><div class="lr-char-group"><label>Jaleco:</label><div class="lr-char-choices">${['branco','azul','verde','roxo'].map(co=>`<button class="lr-char-choice ${c.coat===co?'active':''}" data-type="coat" data-val="${co}">${co}</button>`).join('')}</div></div><div class="lr-char-group"><label>Óculos:</label><div class="lr-char-choices"><button class="lr-char-choice ${!c.glasses?'active':''}" data-type="glasses" data-val="false">Sem</button><button class="lr-char-choice ${c.glasses?'active':''}" data-type="glasses" data-val="true">Com</button></div></div></div></div></div>`;
}
function setupCharacter() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('.lr-char-choice').forEach(btn => btn.addEventListener('click', () => { const t=btn.dataset.type, v=btn.dataset.val; progress.character[t] = v === 'true' ? true : v === 'false' ? false : v; saveProgress(); renderView('character'); }));
}

// ===== RANKING =====
function renderRanking() {
  const npcs = [{ name: 'Cientista Newton', score: 5000 }, { name: 'Dra. Curie', score: 3500 }, { name: 'Prof. Mendeleev', score: 2500 }, { name: 'Dr. Lavoisier', score: 1500 }];
  const all = [...npcs, { name: 'Você', score: progress.points }].sort((a, b) => b.score - a.score);
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">📊 Ranking dos Cientistas</h2></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-ranking">${all.map((p, i) => `<div class="lr-rank-row ${p.name==='Você'?'you':''}"><div class="lr-rank-pos">${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1+'º'}</div><div class="lr-rank-name">${p.name}</div><div class="lr-rank-score">${p.score} pts</div></div>`).join('')}</div></div>`;
}
function setupRanking() { setupBackBtn(); spawnBgParticles(); }

// ===== EXTREME =====
function renderExtreme() {
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title extreme-title">☢️ MODO CIENTISTA EXTREMO</h2><p class="lr-mode-desc">Equações difíceis · Menos dicas · Tempo limitado · Pontuação multiplicada</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-extreme"><div class="lr-extreme-info"><p>🔒 Modo Extremo desbloqueado! Desafios com pontuação 3x!</p><button class="lr-btn lr-btn-primary lr-btn-large" id="lrExtremeStart">☢️ Iniciar Desafio Extremo</button></div></div></div>`;
}
function setupExtreme() { setupBackBtn(); spawnBgParticles(); document.getElementById('lrExtremeStart').addEventListener('click', () => { balanceState.currentIdx = 6; renderView('balance'); }); }

// ===== LOJA =====
function renderShop() {
  const items = [
    { id: 'energy', name: 'Recarregar Energia', cost: 30, icon: '⚡', desc: '+3 energia' },
    { id: 'coat_blue', name: 'Jaleco Azul', cost: 50, icon: '🧥', desc: 'Skin de jaleco azul' },
    { id: 'coat_green', name: 'Jaleco Verde', cost: 50, icon: '🧥', desc: 'Skin de jaleco verde' },
    { id: 'coat_purple', name: 'Jaleco Roxo', cost: 80, icon: '🧥', desc: 'Skin de jaleco roxo' },
    { id: 'hint_pack', name: 'Pacote de Dicas', cost: 40, icon: '💡', desc: '10 dicas extras' },
    { id: 'max_energy', name: 'Energia Máxima +2', cost: 100, icon: '🔋', desc: 'Aumenta energia máxima' },
  ];
  return `<div class="lr-mode">${renderBackBtn()}<div class="lr-mode-header"><h2 class="lr-mode-title">🛒 Loja do Lab</h2><p class="lr-mode-desc">Gaste suas moedas em upgrades</p></div><div id="lrProgressBar" class="lr-progress-bar"></div><div class="lr-shop"><div class="lr-shop-balance">💰 Você tem: ${progress.coins} moedas</div><div class="lr-shop-grid">${items.map(it => `<div class="lr-shop-item"><div class="lr-shop-icon">${it.icon}</div><div class="lr-shop-info"><h3 class="lr-shop-name">${it.name}</h3><p class="lr-shop-desc">${it.desc}</p></div><button class="lr-btn lr-btn-primary" data-shop="${it.id}" data-cost="${it.cost}" ${progress.coins < it.cost ? 'disabled' : ''}>💰 ${it.cost}</button></div>`).join('')}</div></div></div>`;
}
function setupShop() {
  setupBackBtn(); spawnBgParticles();
  document.querySelectorAll('[data-shop]').forEach(btn => btn.addEventListener('click', () => {
    const cost = parseInt(btn.dataset.cost); if (progress.coins < cost) return;
    progress.coins -= cost;
    const id = btn.dataset.shop;
    if (id === 'energy') progress.energy = Math.min(progress.energy + 3, progress.maxEnergy);
    else if (id === 'coat_blue') progress.character.coat = 'azul';
    else if (id === 'coat_green') progress.character.coat = 'verde';
    else if (id === 'coat_purple') progress.character.coat = 'roxo';
    else if (id === 'max_energy') progress.maxEnergy += 2;
    saveProgress(); renderView('shop');
  }));
}

// ===== ACHIEVEMENTS CHECK =====
function checkAchievements() {
  achievements.forEach(a => {
    if (progress.unlockedAchievements.includes(a.id)) return;
    let u = false; const c = a.condition;
    switch (c.type) {
      case 'reactions': u = progress.reactions >= c.value; break;
      case 'balanced': u = progress.balanced >= c.value; break;
      case 'lightning': u = progress.lightningCorrect >= c.value; break;
      case 'identified': u = progress.identified >= c.value; break;
      case 'investigations': u = progress.investigations >= c.value; break;
      case 'boss': u = progress.bossesDefeated.includes(c.value); break;
      case 'combo': u = progress.bestCombo >= c.value; break;
      case 'coins': u = progress.coins >= c.value; break;
      case 'xp': u = progress.xp >= c.value; break;
      case 'level': u = getLevel(progress.xp).level >= c.value; break;
      case 'typeCount': u = (progress.typeCorrect[c.key] || 0) >= c.value; break;
    }
    if (u) { progress.unlockedAchievements.push(a.id); showAchPopup(a); }
  });
}

function showAchPopup(a) {
  const p = document.createElement('div'); p.className = 'lr-achievement-popup';
  p.innerHTML = `<div class="lr-ach-popup-content"><div class="lr-ach-popup-icon">${a.icon}</div><div class="lr-ach-popup-info"><div class="lr-ach-popup-label">Conquista!</div><div class="lr-ach-popup-name">${a.name}</div><div class="lr-ach-popup-desc">${a.desc}</div></div></div>`;
  document.body.appendChild(p);
  setTimeout(() => p.classList.add('show'), 100);
  setTimeout(() => { p.classList.remove('show'); setTimeout(() => p.remove(), 500); }, 3500);
}

// ===== EVENTOS ALEATÓRIOS =====
function maybeTriggerRandomEvent() {
  if (Math.random() > 0.05) return;
  if (eventState.active) return;
  const evt = randomEvents[Math.floor(Math.random() * randomEvents.length)];
  eventState.active = evt;
  const banner = document.createElement('div'); banner.className = 'lr-event-banner';
  banner.innerHTML = `<div class="lr-event-content"><span class="lr-event-icon">${evt.icon}</span><div><div class="lr-event-name">${evt.name}</div><div class="lr-event-desc">${evt.desc}</div></div></div>`;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('show'), 100);
  setTimeout(() => { banner.classList.remove('show'); setTimeout(() => banner.remove(), 500); eventState.active = null; }, 4000);
}
