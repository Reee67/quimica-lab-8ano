// Atom definitions with consistent colors
export const atomColors = {
  H: '#ffffff', O: '#ff6b6b', C: '#495057', N: '#4dabf7',
  Na: '#e8b4b8', Cl: '#a5d8ff', Ca: '#fff3bf', Fe: '#e8826b',
  S: '#ffd43b', Mg: '#d0bfff', Zn: '#ced4da', Cu: '#fd7e14',
};

export const atomNames = {
  H: 'Hidrogênio', O: 'Oxigênio', C: 'Carbono', N: 'Nitrogênio',
  Na: 'Sódio', Cl: 'Cloro', Ca: 'Cálcio', Fe: 'Ferro',
  S: 'Enxofre', Mg: 'Magnésio', Zn: 'Zinco', Cu: 'Cobre',
};

export const atomRadii = {
  H: 14, O: 20, C: 18, N: 19, Na: 22, Cl: 21, Ca: 22, Fe: 21, S: 20, Mg: 20, Zn: 21, Cu: 21,
};

// Molecule definitions: which atoms and bonds
export const moleculeDefs = {
  'H₂': { atoms: [{ el: 'H', x: -12, y: 0 }, { el: 'H', x: 12, y: 0 }], bonds: [{ a: 0, b: 1, type: 'single' }] },
  'O₂': { atoms: [{ el: 'O', x: -14, y: 0 }, { el: 'O', x: 14, y: 0 }], bonds: [{ a: 0, b: 1, type: 'double' }] },
  'N₂': { atoms: [{ el: 'N', x: -14, y: 0 }, { el: 'N', x: 14, y: 0 }], bonds: [{ a: 0, b: 1, type: 'triple' }] },
  'Cl₂': { atoms: [{ el: 'Cl', x: -14, y: 0 }, { el: 'Cl', x: 14, y: 0 }], bonds: [{ a: 0, b: 1, type: 'single' }] },
  'H₂O': { atoms: [{ el: 'O', x: 0, y: 0 }, { el: 'H', x: -22, y: 18 }, { el: 'H', x: 22, y: 18 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 0, b: 2, type: 'single' }] },
  'CO₂': { atoms: [{ el: 'C', x: 0, y: 0 }, { el: 'O', x: -28, y: 0 }, { el: 'O', x: 28, y: 0 }], bonds: [{ a: 0, b: 1, type: 'double' }, { a: 0, b: 2, type: 'double' }] },
  'NaCl': { atoms: [{ el: 'Na', x: -16, y: 0 }, { el: 'Cl', x: 16, y: 0 }], bonds: [{ a: 0, b: 1, type: 'ionic' }] },
  'NH₃': { atoms: [{ el: 'N', x: 0, y: 0 }, { el: 'H', x: -22, y: 14 }, { el: 'H', x: 22, y: 14 }, { el: 'H', x: 0, y: -24 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 0, b: 2, type: 'single' }, { a: 0, b: 3, type: 'single' }] },
  'HCl': { atoms: [{ el: 'H', x: -14, y: 0 }, { el: 'Cl', x: 16, y: 0 }], bonds: [{ a: 0, b: 1, type: 'single' }] },
  'Fe₂O₃': { atoms: [{ el: 'Fe', x: -28, y: 0 }, { el: 'O', x: -10, y: 0 }, { el: 'Fe', x: 10, y: 0 }, { el: 'O', x: 28, y: 0 }, { el: 'O', x: 0, y: -22 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 1, b: 2, type: 'single' }, { a: 2, b: 3, type: 'single' }, { a: 1, b: 4, type: 'single' }] },
  'CaO': { atoms: [{ el: 'Ca', x: -16, y: 0 }, { el: 'O', x: 16, y: 0 }], bonds: [{ a: 0, b: 1, type: 'ionic' }] },
  'CaCO₃': { atoms: [{ el: 'Ca', x: -28, y: 0 }, { el: 'C', x: 0, y: 0 }, { el: 'O', x: 18, y: -14 }, { el: 'O', x: 18, y: 14 }, { el: 'O', x: -12, y: 0 }], bonds: [{ a: 1, b: 2, type: 'double' }, { a: 1, b: 3, type: 'single' }, { a: 1, b: 4, type: 'single' }, { a: 0, b: 4, type: 'ionic' }] },
  'CH₄': { atoms: [{ el: 'C', x: 0, y: 0 }, { el: 'H', x: -20, y: 16 }, { el: 'H', x: 20, y: 16 }, { el: 'H', x: -20, y: -16 }, { el: 'H', x: 20, y: -16 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 0, b: 2, type: 'single' }, { a: 0, b: 3, type: 'single' }, { a: 0, b: 4, type: 'single' }] },
  'CH₃COOH': { atoms: [{ el: 'C', x: -28, y: 0 }, { el: 'H', x: -42, y: 14 }, { el: 'H', x: -42, y: -14 }, { el: 'H', x: -18, y: -18 }, { el: 'C', x: -8, y: 0 }, { el: 'O', x: 8, y: -16 }, { el: 'H', x: 22, y: -10 }, { el: 'O', x: 8, y: 16 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 0, b: 2, type: 'single' }, { a: 0, b: 3, type: 'single' }, { a: 0, b: 4, type: 'single' }, { a: 4, b: 5, type: 'single' }, { a: 5, b: 6, type: 'single' }, { a: 4, b: 7, type: 'double' }] },
  'NaHCO₃': { atoms: [{ el: 'Na', x: -32, y: 0 }, { el: 'H', x: -14, y: -16 }, { el: 'C', x: 0, y: 0 }, { el: 'O', x: 16, y: -14 }, { el: 'O', x: 16, y: 14 }, { el: 'O', x: -14, y: 14 }], bonds: [{ a: 2, b: 3, type: 'double' }, { a: 2, b: 4, type: 'single' }, { a: 2, b: 5, type: 'single' }, { a: 1, b: 5, type: 'single' }, { a: 0, b: 5, type: 'ionic' }] },
  'CH₃COONa': { atoms: [{ el: 'C', x: -28, y: 0 }, { el: 'H', x: -40, y: 16 }, { el: 'H', x: -40, y: -16 }, { el: 'H', x: -18, y: -18 }, { el: 'C', x: -8, y: 0 }, { el: 'O', x: 10, y: -16 }, { el: 'O', x: 10, y: 16 }, { el: 'Na', x: 28, y: 0 }], bonds: [{ a: 0, b: 1, type: 'single' }, { a: 0, b: 2, type: 'single' }, { a: 0, b: 3, type: 'single' }, { a: 0, b: 4, type: 'single' }, { a: 4, b: 5, type: 'double' }, { a: 4, b: 6, type: 'single' }, { a: 6, b: 7, type: 'ionic' }] },
};

// Parse a formula string to count atoms, respecting subscripts
export function parseFormula(formula) {
  const atoms = {};
  const regex = /([A-Z][a-z]?)(\d*)/g;
  // Handle leading coefficient
  const coefMatch = formula.match(/^(\d+)/);
  const coef = coefMatch ? parseInt(coefMatch[1]) : 1;
  const cleanFormula = coefMatch ? formula.slice(coefMatch[1].length) : formula;

  let match;
  while ((match = regex.exec(cleanFormula)) !== null) {
    const el = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    atoms[el] = (atoms[el] || 0) + count * coef;
  }
  return atoms;
}

// Parse a full equation side (e.g., "2H₂ + O₂") into atom counts
export function parseEquationSide(side) {
  const total = {};
  const parts = side.split('+').map(s => s.trim());
  for (const part of parts) {
    const atoms = parseFormula(part);
    for (const [el, count] of Object.entries(atoms)) {
      total[el] = (total[el] || 0) + count;
    }
  }
  return total;
}

// Split equation into reactants and products
export function splitEquation(eq) {
  const [left, right] = eq.split('→').map(s => s.trim());
  return {
    reactants: left,
    products: right,
    reactantAtoms: parseEquationSide(left),
    productAtoms: parseEquationSide(right),
  };
}

// Get individual molecules from a side string
export function getMolecules(side) {
  return side.split('+').map(s => {
    const trimmed = s.trim();
    const coefMatch = trimmed.match(/^(\d+)/);
    const coef = coefMatch ? parseInt(coefMatch[1]) : 1;
    const formula = coefMatch ? trimmed.slice(coefMatch[1].length) : trimmed;
    return { coef, formula };
  });
}
