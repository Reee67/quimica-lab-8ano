export const reactions = [
  {
    id: "h2o",
    name: "Formação da Água",
    reactants: [
      { symbol: "H₂", label: "Hidrogênio", color: "#ffffff" },
      { symbol: "O₂", label: "Oxigênio", color: "#4dabf7" }
    ],
    products: [
      { symbol: "H₂O", label: "Água", color: "#4dabf7" }
    ],
    equation: "2H₂ + O₂ → 2H₂O",
    type: "Combustão",
    description: "O hidrogênio reage com o oxigênio liberando grande quantidade de energia na forma de calor e luz. Esta reação é a base das células de combustível.",
    product3D: "water"
  },
  {
    id: "nacl",
    name: "Formação do Sal de Cozinha",
    reactants: [
      { symbol: "Na", label: "Sódio", color: "#e8b4b8" },
      { symbol: "Cl₂", label: "Cloro", color: "#a5d8ff" }
    ],
    products: [
      { symbol: "NaCl", label: "Cloreto de Sódio", color: "#f8f9fa" }
    ],
    equation: "2Na + Cl₂ → 2NaCl",
    type: "Síntese",
    description: "O sódio metálico reage violentamente com o gás cloro formando o sal de cozinha. Uma reação de oxirredução clássica.",
    product3D: "nacl"
  },
  {
    id: "co2",
    name: "Combustão do Metano",
    reactants: [
      { symbol: "CH₄", label: "Metano", color: "#a5d8ff" },
      { symbol: "O₂", label: "Oxigênio", color: "#ff6b6b" }
    ],
    products: [
      { symbol: "CO₂", label: "Dióxido de Carbono", color: "#495057" },
      { symbol: "H₂O", label: "Água", color: "#4dabf7" }
    ],
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    type: "Combustão",
    description: "O metano (gás natural) queima na presença de oxigênio produzindo dióxido de carbono, água e energia. É a reação do gás de cozinha.",
    product3D: "co2"
  },
  {
    id: "nh3",
    name: "Formação de Amônia",
    reactants: [
      { symbol: "N₂", label: "Nitrogênio", color: "#74c0fc" },
      { symbol: "H₂", label: "Hidrogênio", color: "#ffffff" }
    ],
    products: [
      { symbol: "NH₃", label: "Amônia", color: "#a5d8ff" }
    ],
    equation: "N₂ + 3H₂ → 2NH₃",
    type: "Síntese",
    description: "Processo Haber-Bosch: nitrogênio e hidrogênio reagem sob alta pressão e temperatura com catalisador de ferro. Fundamental para fertilizantes.",
    product3D: "nh3"
  },
  {
    id: "hcl",
    name: "Ácido Clorídrico",
    reactants: [
      { symbol: "H₂", label: "Hidrogênio", color: "#ffffff" },
      { symbol: "Cl₂", label: "Cloro", color: "#a5d8ff" }
    ],
    products: [
      { symbol: "HCl", label: "Ácido Clorídrico", color: "#ffe066" }
    ],
    equation: "H₂ + Cl₂ → 2HCl",
    type: "Síntese",
    description: "O hidrogênio reage com o cloro formando ácido clorídrico, um ácido forte presente no estômago e usado em limpeza industrial.",
    product3D: "hcl"
  },
  {
    id: "fe2o3",
    name: "Ferrugem do Ferro",
    reactants: [
      { symbol: "Fe", label: "Ferro", color: "#e8826b" },
      { symbol: "O₂", label: "Oxigênio", color: "#4dabf7" }
    ],
    products: [
      { symbol: "Fe₂O₃", label: "Óxido de Ferro III", color: "#c92a2a" }
    ],
    equation: "4Fe + 3O₂ → 2Fe₂O₃",
    type: "Oxidação",
    description: "O ferro sofre oxidação lenta na presença de oxigênio e umidade, formando a ferrugem. Este processo causa grandes perdas econômicas.",
    product3D: "fe2o3"
  },
  {
    id: "caco3",
    name: "Decomposição do Calcário",
    reactants: [
      { symbol: "CaCO₃", label: "Carbonato de Cálcio", color: "#dee2e6" }
    ],
    products: [
      { symbol: "CaO", label: "Óxido de Cálcio", color: "#fff3bf" },
      { symbol: "CO₂", label: "Dióxido de Carbono", color: "#495057" }
    ],
    equation: "CaCO₃ → CaO + CO₂",
    type: "Decomposição",
    description: "O calcário (carbonato de cálcio) decompõe-se por calor em cal virgem (CaO) e dióxido de carbono. Base da indústria do cimento.",
    product3D: "caco3"
  },
  {
    id: "ch3cooh",
    name: "Vinagre + Bicarbonato",
    reactants: [
      { symbol: "CH₃COOH", label: "Ácido Acético", color: "#fff3bf" },
      { symbol: "NaHCO₃", label: "Bicarbonato", color: "#f8f9fa" }
    ],
    products: [
      { symbol: "CH₃COONa", label: "Acetato de Sódio", color: "#d0ebff" },
      { symbol: "H₂O", label: "Água", color: "#4dabf7" },
      { symbol: "CO₂", label: "Dióxido de Carbono", color: "#495057" }
    ],
    equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂",
    type: "Neutralização",
    description: "A reação do vinagre com bicarbonato de sódio libera gás carbônico, criando efervescência. Uma reação ácido-base clássica do dia a dia.",
    product3D: "nacl"
  }
];
