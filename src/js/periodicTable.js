import { elements, categoryColors, categoryNames } from '../data/elements.js';

export function renderPeriodicTable() {
  let html = `<div class="periodic-table-wrapper"><div class="periodic-table">`;

  const main = elements.filter(e => e.group >= 1 && e.group <= 18 && e.period <= 7 && e.number <= 88);
  const lanthanides = elements.filter(e => e.number >= 57 && e.number <= 71);
  const actinides = elements.filter(e => e.number >= 89 && e.number <= 103);

  main.forEach(el => {
    const color = categoryColors[el.category] || '#666';
    html += `
      <div class="element-cell" 
           style="grid-column: ${el.group}; grid-row: ${el.period}; border-color: ${color};"
           data-number="${el.number}">
        <span class="el-num">${el.number}</span>
        <span class="el-sym">${el.symbol}</span>
        <span class="el-name">${el.name.length > 12 ? el.name.substring(0, 10) + '…' : el.name}</span>
      </div>`;
  });

  html += `</div>`;

  html += `<div class="periodic-table-f-block"><div class="f-row">`;
  lanthanides.forEach(el => {
    const color = categoryColors[el.category] || '#666';
    html += `
      <div class="element-cell small"
           style="border-color: ${color};"
           data-number="${el.number}">
        <span class="el-num">${el.number}</span>
        <span class="el-sym">${el.symbol}</span>
      </div>`;
  });
  html += `</div><div class="f-row">`;
  actinides.forEach(el => {
    const color = categoryColors[el.category] || '#666';
    html += `
      <div class="element-cell small"
           style="border-color: ${color};"
           data-number="${el.number}">
        <span class="el-num">${el.number}</span>
        <span class="el-sym">${el.symbol}</span>
      </div>`;
  });
  html += `</div></div>`;

  html += `<div class="legend">`;
  Object.entries(categoryNames).forEach(([key, name]) => {
    html += `<div class="legend-item"><span class="legend-color" style="background:${categoryColors[key]}"></span>${name}</div>`;
  });
  html += `</div></div>`;

  return html;
}

export function renderElementModal(element) {
  const color = categoryColors[element.category] || '#666';
  const catName = categoryNames[element.category] || 'Desconhecido';
  return `
    <div class="element-modal-content" style="border-top-color: ${color};">
      <button class="modal-close" id="modalClose">&times;</button>
      <div class="modal-header" style="border-color: ${color};">
        <div class="modal-symbol" style="color: ${color};">${element.symbol}</div>
        <div class="modal-title-group">
          <h2 class="modal-title">${element.name}</h2>
          <span class="modal-cat-badge" style="background: ${color};">${catName}</span>
        </div>
        <div class="modal-number">#${element.number}</div>
      </div>
      <div class="modal-info-grid">
        <div class="info-card">
          <span class="info-label">Massa Atômica</span>
          <span class="info-value">${element.mass} u</span>
        </div>
        <div class="info-card">
          <span class="info-label">Grupo</span>
          <span class="info-value">${element.group}</span>
        </div>
        <div class="info-card">
          <span class="info-label">Período</span>
          <span class="info-value">${element.period}</span>
        </div>
        <div class="info-card">
          <span class="info-label">Configuração</span>
          <span class="info-value mono">${element.config}</span>
        </div>
      </div>
      <p class="modal-description">${element.description}</p>
    </div>
  `;
}

export function setupPeriodicTable(onElementClick) {
  document.querySelectorAll('.element-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const num = parseInt(cell.dataset.number);
      const el = elements.find(e => e.number === num);
      if (el) onElementClick(el);
    });
  });
}
