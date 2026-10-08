import { reactions } from '../data/reactions.js';
import { atomColors, atomNames, atomRadii, moleculeDefs, splitEquation, getMolecules } from '../data/molecularData.js';

let simState = {
  reaction: null,
  phase: 'idle', // idle, reactants, approaching, reorganizing, products
  playing: false,
  speed: 1,
  progress: 0, // 0 to 1
  detailedMode: false,
  narrationOn: false,
  rafId: null,
  lastTime: 0,
  canvas: null,
  ctx: null,
  molecules: [],
  timelinePhase: 0, // 0-3
  selectedReactionIdx: 0,
};

const PHASES = ['REAGENTES', 'APROXIMAÇÃO', 'REORGANIZAÇÃO', 'PRODUTOS'];

export function renderSimulator() {
  return `
    <div class="sim-container">
      <div class="sim-left-panel">
        <h3 class="sim-panel-title">Substâncias</h3>
        <div class="sim-reaction-list" id="simReactionList">
          ${reactions.map((r, i) => `
            <button class="sim-reaction-btn ${i === 0 ? 'active' : ''}" data-idx="${i}">
              <span class="sim-rb-name">${r.name}</span>
              <span class="sim-rb-eq">${r.equation}</span>
              <span class="sim-rb-type">${r.type}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="sim-center">
        <div class="sim-canvas-wrap">
          <canvas id="simCanvas" width="600" height="320"></canvas>
        </div>
        <div class="sim-equation-display" id="simEquation">
          <span class="sim-eq-label">Equação:</span>
          <span class="sim-eq-text" id="simEqText">Selecione uma reação</span>
        </div>
        <div class="sim-controls">
          <button class="sim-ctrl-btn" id="simPlay" title="Iniciar">▶</button>
          <button class="sim-ctrl-btn" id="simPause" title="Pausar" disabled>⏸</button>
          <button class="sim-ctrl-btn" id="simReset" title="Reiniciar">🔄</button>
          <div class="sim-speed-group">
            <span class="sim-speed-label">Velocidade:</span>
            <button class="sim-speed-btn" data-speed="0.5">0.5x</button>
            <button class="sim-speed-btn active" data-speed="1">1x</button>
            <button class="sim-speed-btn" data-speed="2">2x</button>
          </div>
          <button class="sim-detail-btn" id="simDetailBtn" title="Modo detalhado">🔬 Detalhado</button>
          <button class="sim-narrate-btn" id="simNarrateBtn" title="Narração">🔊 Narrar</button>
        </div>
        <div class="sim-timeline" id="simTimeline">
          ${PHASES.map((p, i) => `<div class="sim-tl-node ${i === 0 ? 'active' : ''}" data-phase="${i}"><div class="sim-tl-dot"></div><span class="sim-tl-label">${p}</span></div>`).join('<div class="sim-tl-arrow">↓</div>')}
        </div>
        <div class="sim-tl-slider-wrap">
          <input type="range" min="0" max="3" step="0.01" value="0" id="simTlSlider" class="sim-tl-slider" aria-label="Linha do tempo da reação">
        </div>
        <button class="sim-what-btn" id="simWhatBtn">🔎 O que está acontecendo?</button>
      </div>
      <div class="sim-right-panel">
        <h3 class="sim-panel-title">Informações</h3>
        <div id="simInfoPanel" class="sim-info-panel"></div>
      </div>
    </div>
    <div class="sim-what-overlay" id="simWhatOverlay" style="display:none;">
      <div class="sim-what-card" id="simWhatCard"></div>
    </div>
  `;
}

export function setupSimulator() {
  simState.canvas = document.getElementById('simCanvas');
  simState.ctx = simState.canvas.getContext('2d');
  simState.selectedReactionIdx = 0;
  loadReaction(0);

  document.querySelectorAll('.sim-reaction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      document.querySelectorAll('.sim-reaction-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadReaction(idx);
    });
  });

  document.getElementById('simPlay').addEventListener('click', playSim);
  document.getElementById('simPause').addEventListener('click', pauseSim);
  document.getElementById('simReset').addEventListener('click', resetSim);

  document.querySelectorAll('.sim-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      simState.speed = parseFloat(btn.dataset.speed);
    });
  });

  document.getElementById('simDetailBtn').addEventListener('click', () => {
    simState.detailedMode = !simState.detailedMode;
    document.getElementById('simDetailBtn').classList.toggle('active', simState.detailedMode);
    updateInfoPanel();
  });

  document.getElementById('simNarrateBtn').addEventListener('click', () => {
    simState.narrationOn = !simState.narrationOn;
    document.getElementById('simNarrateBtn').classList.toggle('active', simState.narrationOn);
  });

  const slider = document.getElementById('simTlSlider');
  slider.addEventListener('input', () => {
    simState.timelinePhase = parseFloat(slider.value);
    simState.progress = simState.timelinePhase / 3;
    updatePhaseFromProgress();
    drawFrame();
  });

  document.getElementById('simWhatBtn').addEventListener('click', showWhatPopup);

  // responsive canvas
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  const canvas = simState.canvas;
  if (!canvas) return;
  const wrap = canvas.parentElement;
  const w = wrap.clientWidth;
  const h = Math.max(200, Math.min(320, w * 0.5));
  canvas.width = w;
  canvas.height = h;
  drawFrame();
}

function loadReaction(idx) {
  simState.selectedReactionIdx = idx;
  const r = reactions[idx];
  simState.reaction = r;
  simState.phase = 'idle';
  simState.progress = 0;
  simState.timelinePhase = 0;
  simState.playing = false;
  pauseSim();

  const eqEl = document.getElementById('simEqText');
  if (eqEl) eqEl.textContent = r.equation;

  const slider = document.getElementById('simTlSlider');
  if (slider) slider.value = 0;

  updateTimelineUI(0);
  setupMolecules();
  updateInfoPanel();
  drawFrame();
}

function setupMolecules() {
  const r = simState.reaction;
  if (!r) return;
  const eq = splitEquation(r.equation);
  const reactantMols = getMolecules(eq.reactants);
  const productMols = getMolecules(eq.products);

  simState.molecules = [];

  // Place reactant molecules on left side
  let xPos = 40;
  reactantMols.forEach(mol => {
    if (moleculeDefs[mol.formula]) {
      for (let i = 0; i < Math.min(mol.coef, 3); i++) {
        simState.molecules.push({
          formula: mol.formula,
          def: moleculeDefs[mol.formula],
          x: xPos + i * 30,
          y: 120 + Math.random() * 40,
          vx: 0, vy: 0,
          side: 'reactant',
          alpha: 1,
          scale: 1,
        });
      }
      xPos += 80;
    }
  });

  // Store product templates for later
  simState.productTemplates = [];
  let pXPos = 400;
  productMols.forEach(mol => {
    if (moleculeDefs[mol.formula]) {
      for (let i = 0; i < Math.min(mol.coef, 3); i++) {
        simState.productTemplates.push({
          formula: mol.formula,
          def: moleculeDefs[mol.formula],
          x: pXPos + i * 30,
          y: 120 + Math.random() * 40,
          alpha: 0,
          scale: 0,
        });
      }
      pXPos += 80;
    }
  });
}

function playSim() {
  if (simState.playing) return;
  simState.playing = true;
  document.getElementById('simPlay').disabled = true;
  document.getElementById('simPause').disabled = false;
  simState.lastTime = performance.now();
  animateLoop();
  if (simState.narrationOn) narratePhase('REAGENTES');
}

function pauseSim() {
  simState.playing = false;
  document.getElementById('simPlay').disabled = false;
  document.getElementById('simPause').disabled = true;
  if (simState.rafId) cancelAnimationFrame(simState.rafId);
}

function resetSim() {
  pauseSim();
  simState.progress = 0;
  simState.timelinePhase = 0;
  simState.phase = 'idle';
  const slider = document.getElementById('simTlSlider');
  if (slider) slider.value = 0;
  updateTimelineUI(0);
  setupMolecules();
  drawFrame();
}

function animateLoop() {
  if (!simState.playing) return;
  const now = performance.now();
  const dt = (now - simState.lastTime) / 1000;
  simState.lastTime = now;

  simState.progress += dt * 0.15 * simState.speed;
  if (simState.progress >= 1) {
    simState.progress = 1;
    simState.playing = false;
    document.getElementById('simPlay').disabled = false;
    document.getElementById('simPause').disabled = true;
  }

  simState.timelinePhase = simState.progress * 3;
  const slider = document.getElementById('simTlSlider');
  if (slider) slider.value = simState.timelinePhase;
  updateTimelineUI(Math.floor(simState.timelinePhase));
  updatePhaseFromProgress();
  drawFrame();
  checkPhaseNarration();

  if (simState.playing) {
    simState.rafId = requestAnimationFrame(animateLoop);
  }
}

function updatePhaseFromProgress() {
  const p = simState.progress;
  if (p < 0.25) simState.phase = 'reactants';
  else if (p < 0.5) simState.phase = 'approaching';
  else if (p < 0.75) simState.phase = 'reorganizing';
  else simState.phase = 'products';
}

function updateTimelineUI(phaseIdx) {
  document.querySelectorAll('.sim-tl-node').forEach((node, i) => {
    node.classList.toggle('active', i <= phaseIdx);
  });
}

function drawFrame() {
  const ctx = simState.ctx;
  if (!ctx) return;
  const canvas = simState.canvas;
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2;
  const p = simState.progress;

  ctx.clearRect(0, 0, w, h);
  drawBackground(ctx, w, h);

  const reaction = simState.reaction;
  if (!reaction) return;

  // Draw reactant molecules (fade out during reorganizing)
  const reactantAlpha = p < 0.5 ? 1 : Math.max(0, 1 - (p - 0.5) * 4);
  const approachOffset = p < 0.5 ? p * 160 : 0;

  simState.molecules.forEach(mol => {
    const drawX = mol.x + approachOffset;
    drawMolecule(ctx, drawX, mol.y, mol.def, reactantAlpha, 1);
    if (simState.detailedMode) {
      ctx.fillStyle = `rgba(255,255,255,${reactantAlpha * 0.5})`;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(mol.formula, drawX, mol.y + 45);
    }
  });

  // Draw product molecules (fade in during reorganizing)
  const productAlpha = p < 0.5 ? 0 : Math.min(1, (p - 0.5) * 4);
  const productScale = p < 0.5 ? 0 : Math.min(1, (p - 0.5) * 4);

  if (simState.productTemplates) {
    simState.productTemplates.forEach(mol => {
      drawMolecule(ctx, mol.x, mol.y, mol.def, productAlpha, productScale);
      if (simState.detailedMode && productAlpha > 0.1) {
        ctx.fillStyle = `rgba(255,255,255,${productAlpha * 0.5})`;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(mol.formula, mol.x, mol.y + 45);
      }
    });
  }

  // Draw reaction arrow
  if (p > 0.15 && p < 0.85) {
    const arrowAlpha = p < 0.3 ? (p - 0.15) / 0.15 : p > 0.7 ? (0.85 - p) / 0.15 : 1;
    drawArrow(ctx, cx - 30, cy, cx + 30, cy, arrowAlpha);
  }

  // Atom conservation panel overlay
  if (simState.detailedMode) {
    drawAtomConservation(ctx, w, h, reaction);
  }
}

function drawBackground(ctx, w, h) {
  const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
  grad.addColorStop(0, 'rgba(77,171,247,0.04)');
  grad.addColorStop(1, 'rgba(13,13,26,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function drawMolecule(ctx, ox, oy, def, alpha, scale) {
  if (!def || alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  // Draw bonds
  def.bonds.forEach(bond => {
    const a = def.atoms[bond.a];
    const b = def.atoms[bond.b];
    drawBond(ctx, a.x, a.y, b.x, b.y, bond.type);
  });

  // Draw atoms
  def.atoms.forEach(atom => {
    const color = atomColors[atom.el] || '#ccc';
    const radius = (atomRadii[atom.el] || 14) * 0.6;
    // Glow
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, radius + 4, 0, Math.PI * 2);
    ctx.fillStyle = color + '33';
    ctx.fill();
    // Body
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, radius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(atom.x - radius/3, atom.y - radius/3, 0, atom.x, atom.y, radius);
    grad.addColorStop(0, lightenColor(color, 30));
    grad.addColorStop(1, color);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Label
    if (simState.detailedMode) {
      ctx.fillStyle = isLight(color) ? '#0d0d1a' : '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(atom.el, atom.x, atom.y);
    }
  });

  ctx.restore();
}

function drawBond(ctx, x1, y1, x2, y2, type) {
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  if (type === 'ionic') {
    ctx.setLineDash([3, 3]);
  } else {
    ctx.setLineDash([]);
  }
  if (type === 'triple') {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perp = angle + Math.PI / 2;
    for (const off of [-4, 0, 4]) {
      ctx.beginPath();
      ctx.moveTo(x1 + Math.cos(perp) * off, y1 + Math.sin(perp) * off);
      ctx.lineTo(x2 + Math.cos(perp) * off, y2 + Math.sin(perp) * off);
      ctx.stroke();
    }
  } else if (type === 'double') {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const perp = angle + Math.PI / 2;
    for (const off of [-3, 3]) {
      ctx.beginPath();
      ctx.moveTo(x1 + Math.cos(perp) * off, y1 + Math.sin(perp) * off);
      ctx.lineTo(x2 + Math.cos(perp) * off, y2 + Math.sin(perp) * off);
      ctx.stroke();
    }
  } else {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function drawArrow(ctx, x1, y1, x2, y2, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = '#4dabf7';
  ctx.fillStyle = '#4dabf7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // arrowhead
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 8, y2 - 5);
  ctx.lineTo(x2 - 8, y2 + 5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawAtomConservation(ctx, w, h, reaction) {
  const eq = splitEquation(reaction.equation);
  const allElements = new Set([...Object.keys(eq.reactantAtoms), ...Object.keys(eq.productAtoms)]);
  const y0 = h - 18 - allElements.size * 16;
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'left';
  let y = y0;
  for (const el of allElements) {
    const before = eq.reactantAtoms[el] || 0;
    const after = eq.productAtoms[el] || 0;
    const balanced = before === after;
    const color = atomColors[el] || '#ccc';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(12, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = balanced ? '#00ff88' : '#ff6b6b';
    ctx.fillText(`${atomNames[el] || el}: antes ${before} | depois ${after} ${balanced ? '✓' : '✗'}`, 22, y + 4);
    y += 16;
  }
}

function lightenColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + percent);
  const g = Math.min(255, ((num >> 8) & 0xff) + percent);
  const b = Math.min(255, (num & 0xff) + percent);
  return `rgb(${r},${g},${b})`;
}

function isLight(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return (r + g + b) / 3 > 160;
}

function updateInfoPanel() {
  const panel = document.getElementById('simInfoPanel');
  if (!panel) return;
  const r = simState.reaction;
  if (!r) { panel.innerHTML = '<p class="sim-empty">Selecione uma reação</p>'; return; }

  const eq = splitEquation(r.equation);
  const allElements = new Set([...Object.keys(eq.reactantAtoms), ...Object.keys(eq.productAtoms)]);

  let html = `
    <div class="sim-info-section">
      <h4 class="sim-info-h">${r.name}</h4>
      <div class="sim-info-type">${r.type}</div>
    </div>
    <div class="sim-info-section">
      <h4 class="sim-info-h">Reagentes</h4>
      <div class="sim-info-mols">
        ${r.reactants.map(r2 => `<div class="sim-info-mol"><span class="sim-mol-formula" style="color:${r2.color === '#495057' ? '#adb5bd' : r2.color}">${r2.symbol}</span> <span class="sim-mol-name">${r2.label}</span></div>`).join('')}
      </div>
    </div>
    <div class="sim-info-section">
      <h4 class="sim-info-h">Produtos</h4>
      <div class="sim-info-mols">
        ${r.products.map(p => `<div class="sim-info-mol"><span class="sim-mol-formula" style="color:${p.color === '#495057' ? '#adb5bd' : p.color}">${p.symbol}</span> <span class="sim-mol-name">${p.label}</span></div>`).join('')}
      </div>
    </div>
    <div class="sim-info-section">
      <h4 class="sim-info-h">O que acontece?</h4>
      <p class="sim-info-desc">${r.description}</p>
    </div>
    <div class="sim-info-section">
      <h4 class="sim-info-h">Conservação dos Átomos</h4>
      <div class="sim-conservation">
        ${[...allElements].map(el => {
          const before = eq.reactantAtoms[el] || 0;
          const after = eq.productAtoms[el] || 0;
          const ok = before === after;
          return `<div class="sim-cons-row ${ok ? 'ok' : 'bad'}">
            <span class="sim-cons-atom" style="background:${atomColors[el] || '#ccc'}; color:${isLight(atomColors[el] || '#ccc') ? '#0d0d1a' : '#fff'}">${el}</span>
            <span class="sim-cons-before">Antes: ${before}</span>
            <span class="sim-cons-after">Depois: ${after}</span>
            <span class="sim-cons-icon">${ok ? '✅' : '❌'}</span>
          </div>`;
        }).join('')}
      </div>
      <p class="sim-cons-explain">Os átomos não desaparecem. Eles se reorganizam para formar novas substâncias.</p>
    </div>
  `;

  if (simState.detailedMode) {
    html += `
      <div class="sim-info-section sim-detail-info">
        <h4 class="sim-info-h">🔬 Modo Detalhado</h4>
        <div class="sim-detail-row"><span>Estado físico:</span> <span>${r.reactants.map(r2 => r2.label).join(', ')} → ${r.products.map(p => p.label).join(', ')}</span></div>
        <div class="sim-detail-row"><span>Tipo de reação:</span> <span>${r.type}</span></div>
        <div class="sim-detail-row"><span>Equação balanceada:</span> <span style="color:#00ff88">${r.equation}</span></div>
      </div>
    `;
  }

  panel.innerHTML = html;
}

function showWhatPopup() {
  const r = simState.reaction;
  if (!r) return;
  const overlay = document.getElementById('simWhatOverlay');
  const card = document.getElementById('simWhatCard');
  card.innerHTML = `
    <button class="sim-what-close" id="simWhatClose">✕</button>
    <h3 class="sim-what-title">🔎 O que está acontecendo?</h3>
    <div class="sim-what-steps">
      <div class="sim-what-step"><span class="sim-step-num">1</span><p>As moléculas dos reagentes se aproximam umas das outras.</p></div>
      <div class="sim-what-step"><span class="sim-step-num">2</span><p>Algumas ligações químicas são rompidas — os átomos se separam temporariamente.</p></div>
      <div class="sim-what-step"><span class="sim-step-num">3</span><p>Os átomos são reorganizados, formando novas conexões.</p></div>
      <div class="sim-what-step"><span class="sim-step-num">4</span><p>Novas ligações são formadas, criando as moléculas dos produtos.</p></div>
      <div class="sim-what-step"><span class="sim-step-num">5</span><p>Os produtos surgem — a reação está completa. A massa foi conservada!</p></div>
    </div>
    <p class="sim-what-note">Esta é uma representação didática simplificada. Em condições reais, o processo envolve colisões, energia de ativação e fatores cinéticos.</p>
  `;
  overlay.style.display = 'flex';
  document.getElementById('simWhatClose').addEventListener('click', () => overlay.style.display = 'none');
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; }, { once: true });
  if (simState.narrationOn) speakText('O que está acontecendo nesta reação: as moléculas dos reagentes se aproximam, as ligações químicas são rompidas, os átomos se reorganizam, novas ligações são formadas e os produtos surgem.');
}

function narratePhase(phase) {
  const texts = {
    'REAGENTES': 'Fase: reagentes. As moléculas iniciais estão presentes no recipiente.',
    'APROXIMAÇÃO': 'Fase: aproximação. As moléculas dos reagentes se aproximam umas das outras.',
    'REORGANIZAÇÃO': 'Fase: reorganização. As ligações são rompidas e os átomos se rearranjam.',
    'PRODUTOS': 'Fase: produtos. As novas moléculas foram formadas. A reação está completa.',
  };
  if (texts[phase]) speakText(texts[phase]);
}

function speakText(text) {
  if (!simState.narrationOn || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'pt-BR';
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

let lastNarratedPhase = -1;
function checkPhaseNarration() {
  const phaseIdx = Math.floor(simState.timelinePhase);
  if (phaseIdx !== lastNarratedPhase && simState.playing && simState.narrationOn) {
    lastNarratedPhase = phaseIdx;
    narratePhase(PHASES[phaseIdx]);
  }
}
