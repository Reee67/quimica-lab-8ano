export const moleculeData = {
  water: {
    name: "H₂O — Água",
    atoms: [
      { element: "O", pos: [0, 0, 0], color: "#ff4444", radius: 0.66 },
      { element: "H", pos: [0.96, 0.24, 0], color: "#ffffff", radius: 0.31 },
      { element: "H", pos: [-0.24, 0.93, 0], color: "#ffffff", radius: 0.31 }
    ],
    bonds: [
      { from: 0, to: 1, type: "single" },
      { from: 0, to: 2, type: "single" }
    ]
  },
  nacl: {
    name: "NaCl — Cloreto de Sódio",
    atoms: [
      { element: "Na", pos: [0, 0, 0], color: "#ab47bc", radius: 1.02 },
      { element: "Cl", pos: [1.4, 0, 0], color: "#1e88e5", radius: 1.81 },
      { element: "Na", pos: [2.8, 0, 0], color: "#ab47bc", radius: 1.02 },
      { element: "Cl", pos: [1.4, 1.4, 0], color: "#1e88e5", radius: 1.81 },
      { element: "Na", pos: [0, 1.4, 0], color: "#ab47bc", radius: 1.02 },
      { element: "Cl", pos: [2.8, 1.4, 0], color: "#1e88e5", radius: 1.81 }
    ],
    bonds: [
      { from: 0, to: 1, type: "single" },
      { from: 1, to: 2, type: "single" },
      { from: 0, to: 4, type: "single" },
      { from: 1, to: 3, type: "single" },
      { from: 2, to: 5, type: "single" },
      { from: 3, to: 5, type: "single" },
      { from: 3, to: 4, type: "single" }
    ]
  },
  co2: {
    name: "CO₂ — Dióxido de Carbono",
    atoms: [
      { element: "C", pos: [0, 0, 0], color: "#333333", radius: 0.76 },
      { element: "O", pos: [1.24, 0, 0], color: "#ff4444", radius: 0.66 },
      { element: "O", pos: [-1.24, 0, 0], color: "#ff4444", radius: 0.66 }
    ],
    bonds: [
      { from: 0, to: 1, type: "double" },
      { from: 0, to: 2, type: "double" }
    ]
  },
  nh3: {
    name: "NH₃ — Amônia",
    atoms: [
      { element: "N", pos: [0, 0, 0], color: "#3366ff", radius: 0.71 },
      { element: "H", pos: [0.97, 0.27, -0.21], color: "#ffffff", radius: 0.31 },
      { element: "H", pos: [-0.40, 0.92, -0.21], color: "#ffffff", radius: 0.31 },
      { element: "H", pos: [-0.57, -0.61, -0.21], color: "#ffffff", radius: 0.31 }
    ],
    bonds: [
      { from: 0, to: 1, type: "single" },
      { from: 0, to: 2, type: "single" },
      { from: 0, to: 3, type: "single" }
    ]
  },
  hcl: {
    name: "HCl — Ácido Clorídrico",
    atoms: [
      { element: "H", pos: [-0.64, 0, 0], color: "#ffffff", radius: 0.31 },
      { element: "Cl", pos: [0.64, 0, 0], color: "#1ce81c", radius: 0.99 }
    ],
    bonds: [
      { from: 0, to: 1, type: "single" }
    ]
  },
  fe2o3: {
    name: "Fe₂O₃ — Óxido de Ferro III",
    atoms: [
      { element: "Fe", pos: [0, 0, 0], color: "#e8731a", radius: 1.32 },
      { element: "Fe", pos: [2.0, 0, 0], color: "#e8731a", radius: 1.32 },
      { element: "O", pos: [1.0, 0.9, 0], color: "#ff4444", radius: 0.66 },
      { element: "O", pos: [3.0, 0.9, 0], color: "#ff4444", radius: 0.66 },
      { element: "O", pos: [2.0, -0.9, 0], color: "#ff4444", radius: 0.66 }
    ],
    bonds: [
      { from: 0, to: 2, type: "single" },
      { from: 1, to: 2, type: "single" },
      { from: 1, to: 3, type: "single" },
      { from: 1, to: 4, type: "single" },
      { from: 0, to: 4, type: "single" }
    ]
  },
  caco3: {
    name: "CaCO₃ — Carbonato de Cálcio",
    atoms: [
      { element: "Ca", pos: [0, 0, 0], color: "#7cb342", radius: 1.12 },
      { element: "C", pos: [2.0, 0, 0], color: "#333333", radius: 0.76 },
      { element: "O", pos: [3.2, 0.7, 0], color: "#ff4444", radius: 0.66 },
      { element: "O", pos: [3.2, -0.7, 0], color: "#ff4444", radius: 0.66 },
      { element: "O", pos: [2.0, 1.2, 0], color: "#ff4444", radius: 0.66 }
    ],
    bonds: [
      { from: 1, to: 2, type: "double" },
      { from: 1, to: 3, type: "single" },
      { from: 1, to: 4, type: "single" }
    ]
  }
};
