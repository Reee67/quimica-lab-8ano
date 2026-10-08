const ACCESSIBILITY_KEY = 'qlab-a11y';

const defaults = {
  talkback: false,
  darkTheme: false,
  highContrast: false,
  largeText: false,
  reduceMotion: false
};

let a11yState = { ...defaults };
let talkbackEnabled = false;

export function loadA11y() {
  try {
    const saved = JSON.parse(localStorage.getItem(ACCESSIBILITY_KEY));
    if (saved) a11yState = { ...defaults, ...saved };
  } catch (e) {
    a11yState = { ...defaults };
  }
  applyA11y();
}

function saveA11y() {
  try {
    localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(a11yState));
  } catch (e) {}
}

export function getA11y() {
  return a11yState;
}

export function setA11y(key, value) {
  a11yState[key] = value;
  saveA11y();
  applyA11y();
}

function applyA11y() {
  const root = document.documentElement;

  root.classList.remove(
    'hc-mode', 'large-text', 'reduce-motion', 'dark-theme'
  );

  if (a11yState.highContrast) root.classList.add('hc-mode');
  if (a11yState.largeText) root.classList.add('large-text');
  if (a11yState.reduceMotion) root.classList.add('reduce-motion');
  if (a11yState.darkTheme) root.classList.add('dark-theme');

  manageTalkback(a11yState.talkback);
}

function manageTalkback(enable) {
  talkbackEnabled = enable;
  const root = document.documentElement;

  if (enable) {
    root.setAttribute('data-talkback', 'true');
    document.querySelectorAll('button, [role="button"], a, .ws-tube, .reaction-btn, .nav-btn, .feature-card').forEach(el => {
      if (!el.hasAttribute('aria-live')) {
        el.setAttribute('aria-live', 'polite');
      }
    });
    attachTalkbackListeners();
  } else {
    root.removeAttribute('data-talkback');
    removeTalkbackListeners();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

let talkbackHoverHandler = null;
let talkbackClickHandler = null;

function speak(text) {
  if (!talkbackEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.1;
  window.speechSynthesis.speak(utterance);
}

function attachTalkbackListeners() {
  if (talkbackHoverHandler) return;

  talkbackHoverHandler = (e) => {
    if (!talkbackEnabled) return;
    const target = e.target.closest('button, [role="button"], a, .nav-btn, .reaction-btn, .feature-card, .ws-tube, .ws-legend-item');
    if (!target) return;

    const label = target.getAttribute('aria-label')
      || target.textContent?.trim()?.substring(0, 200)
      || target.title
      || 'Elemento interativo';

    speak(label);
  };

  talkbackClickHandler = (e) => {
    if (!talkbackEnabled) return;
    const target = e.target.closest('button, [role="button"], a, .nav-btn, .reaction-btn, .feature-card, .ws-tube');
    if (!target) return;

    const label = target.getAttribute('aria-label')
      || target.textContent?.trim()?.substring(0, 200)
      || target.title
      || 'Botão';

    speak(label);
  };

  document.addEventListener('focusin', talkbackHoverHandler);
  document.addEventListener('click', talkbackClickHandler);
}

function removeTalkbackListeners() {
  if (talkbackHoverHandler) {
    document.removeEventListener('focusin', talkbackHoverHandler);
    talkbackHoverHandler = null;
  }
  if (talkbackClickHandler) {
    document.removeEventListener('click', talkbackClickHandler);
    talkbackClickHandler = null;
  }
}

export function renderA11yPanel() {
  return `
    <button class="a11y-toggle" id="a11yToggle" aria-label="Abrir painel de acessibilidade" title="Acessibilidade">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="4" r="2"/>
        <path d="M12 6v6m-4 0h8m-8 0l-2 8m10-8l2 8"/>
      </svg>
    </button>
    <div class="a11y-panel" id="a11yPanel" style="display:none;">
      <div class="a11y-panel-header">
        <h3>Acessibilidade</h3>
        <button class="a11y-close" id="a11yClose" aria-label="Fechar painel">×</button>
      </div>
      <div class="a11y-panel-body">
        <div class="a11y-item">
          <label class="a11y-switch-label">
            <span class="a11y-item-title">TalkBack / Leitura de tela</span>
            <span class="a11y-item-desc">Narração por voz dos elementos</span>
          </label>
          <button class="a11y-switch" id="a11yTalkback" role="switch" aria-checked="false" aria-label="Ativar leitura de tela">
            <span class="a11y-switch-knob"></span>
          </button>
        </div>

        <div class="a11y-divider"></div>

        <div class="a11y-item">
          <label class="a11y-switch-label">
            <span class="a11y-item-title">Tema Escuro</span>
            <span class="a11y-item-desc">Alterna entre tema claro e escuro</span>
          </label>
          <button class="a11y-switch" id="a11yDarkTheme" role="switch" aria-checked="false" aria-label="Ativar tema escuro">
            <span class="a11y-switch-knob"></span>
          </button>
        </div>

        <div class="a11y-divider"></div>

        <div class="a11y-item">
          <label class="a11y-switch-label">
            <span class="a11y-item-title">Alto Contraste</span>
            <span class="a11y-item-desc">Aumenta o contraste das cores</span>
          </label>
          <button class="a11y-switch" id="a11yContrast" role="switch" aria-checked="false" aria-label="Ativar alto contraste">
            <span class="a11y-switch-knob"></span>
          </button>
        </div>

        <div class="a11y-item">
          <label class="a11y-switch-label">
            <span class="a11y-item-title">Texto Grande</span>
            <span class="a11y-item-desc">Aumenta o tamanho da fonte</span>
          </label>
          <button class="a11y-switch" id="a11yLargeText" role="switch" aria-checked="false" aria-label="Ativar texto grande">
            <span class="a11y-switch-knob"></span>
          </button>
        </div>

        <div class="a11y-item">
          <label class="a11y-switch-label">
            <span class="a11y-item-title">Reduzir Movimento</span>
            <span class="a11y-item-desc">Desativa animações</span>
          </label>
          <button class="a11y-switch" id="a11yMotion" role="switch" aria-checked="false" aria-label="Ativar reduzir movimento">
            <span class="a11y-switch-knob"></span>
          </button>
        </div>

        <div class="a11y-divider"></div>

        <button class="a11y-reset" id="a11yReset">Restaurar Padrão</button>
      </div>
    </div>
  `;
}

export function setupA11yPanel() {
  const toggle = document.getElementById('a11yToggle');
  const panel = document.getElementById('a11yPanel');
  const close = document.getElementById('a11yClose');

  toggle.addEventListener('click', () => {
    const isVisible = panel.style.display !== 'none';
    panel.style.display = isVisible ? 'none' : 'flex';
    toggle.classList.toggle('active', !isVisible);
  });

  close.addEventListener('click', () => {
    panel.style.display = 'none';
    toggle.classList.remove('active');
  });

  const switchBtns = [
    { id: 'a11yTalkback', key: 'talkback' },
    { id: 'a11yDarkTheme', key: 'darkTheme' },
    { id: 'a11yContrast', key: 'highContrast' },
    { id: 'a11yLargeText', key: 'largeText' },
    { id: 'a11yMotion', key: 'reduceMotion' }
  ];

  switchBtns.forEach(({ id, key }) => {
    const btn = document.getElementById(id);
    const isOn = a11yState[key];
    btn.setAttribute('aria-checked', isOn ? 'true' : 'false');
    btn.classList.toggle('on', isOn);
    btn.addEventListener('click', () => {
      const newVal = !a11yState[key];
      setA11y(key, newVal);
      btn.classList.toggle('on', newVal);
      btn.setAttribute('aria-checked', newVal ? 'true' : 'false');
    });
  });

  const reset = document.getElementById('a11yReset');
  reset.addEventListener('click', () => {
    a11yState = { ...defaults };
    saveA11y();
    applyA11y();
    switchBtns.forEach(({ id, key }) => {
      const btn = document.getElementById(id);
      btn.classList.remove('on');
      btn.setAttribute('aria-checked', 'false');
    });
  });
}
