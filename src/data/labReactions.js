// ===== SUBSTÂNCIAS =====
export const substances = [
  { id: 'h2', formula: 'H₂', name: 'Hidrogênio', icon: '🟦', category: 'Elemento', state: 'Gasoso', info: 'Gás inflamável, mais leve que o ar.', qty: 10, color: '#4dabf7' },
  { id: 'o2', formula: 'O₂', name: 'Oxigênio', icon: '🟦', category: 'Elemento', state: 'Gasoso', info: 'Essencial para combustão e respiração.', qty: 10, color: '#74c0fc' },
  { id: 'h2o', formula: 'H₂O', name: 'Água', icon: '💧', category: 'Composto', state: 'Líquido', info: 'Solvente universal.', qty: 15, color: '#339af0' },
  { id: 'co2', formula: 'CO₂', name: 'Dióxido de Carbono', icon: '⚪', category: 'Composto', state: 'Gasoso', info: 'Produto de combustão.', qty: 8, color: '#dee2e6' },
  { id: 'nacl', formula: 'NaCl', name: 'Cloreto de Sódio', icon: '🧂', category: 'Composto', state: 'Sólido', info: 'Sal de cozinha.', qty: 10, color: '#f8f9fa' },
  { id: 'hcl', formula: 'HCl', name: 'Ácido Clorídrico', icon: '🧪', category: 'Ácido', state: 'Líquido', info: 'Ácido forte, corrosivo.', qty: 8, color: '#ffa8a8' },
  { id: 'naoh', formula: 'NaOH', name: 'Hidróxido de Sódio', icon: '🧴', category: 'Base', state: 'Sólido', info: 'Base forte, soda cáustica.', qty: 8, color: '#69db7c' },
  { id: 'caco3', formula: 'CaCO₃', name: 'Carbonato de Cálcio', icon: '🪨', category: 'Composto', state: 'Sólido', info: 'Calcário, mármore.', qty: 8, color: '#fff3bf' },
  { id: 'cu', formula: 'Cu', name: 'Cobre', icon: '🟤', category: 'Metal', state: 'Sólido', info: 'Metal avermelhado, bom condutor.', qty: 6, color: '#e8826b' },
  { id: 'fe', formula: 'Fe', name: 'Ferro', icon: '⚫', category: 'Metal', state: 'Sólido', info: 'Metal magnético, forma ferrugem.', qty: 8, color: '#868e96' },
  { id: 'mg', formula: 'Mg', name: 'Magnésio', icon: '⬜', category: 'Metal', state: 'Sólido', info: 'Metal leve, queima com luz branca.', qty: 6, color: '#e9ecef' },
  { id: 'zn', formula: 'Zn', name: 'Zinco', icon: '⬜', category: 'Metal', state: 'Sólido', info: 'Metal usado em galvanização.', qty: 6, color: '#ced4da' },
  { id: 'ch4', formula: 'CH₄', name: 'Metano', icon: '🔥', category: 'Composto', state: 'Gasoso', info: 'Gás natural, combustível.', qty: 6, color: '#a5d8ff' },
  { id: 'n2', formula: 'N₂', name: 'Nitrogênio', icon: '🟦', category: 'Elemento', state: 'Gasoso', info: 'Gás inerte, 78% da atmosfera.', qty: 8, color: '#a5d8ff' },
  { id: 'nh3', formula: 'NH₃', name: 'Amônia', icon: '🧴', category: 'Composto', state: 'Gasoso', info: 'Base de fertilizantes.', qty: 5, color: '#b2f2bb' },
  { id: 'agno3', formula: 'AgNO₃', name: 'Nitrato de Prata', icon: '🬛', category: 'Composto', state: 'Líquido', info: 'Sal de prata, sensível à luz.', qty: 4, color: '#e9ecef' },
  { id: 'cuso4', formula: 'CuSO₄', name: 'Sulfato de Cobre', icon: '🔵', category: 'Composto', state: 'Líquido', info: 'Solução azul, tóxica.', qty: 5, color: '#4dabf7' },
  { id: 'fe2o3', formula: 'Fe₂O₃', name: 'Óxido de Ferro', icon: '🟤', category: 'Composto', state: 'Sólido', info: 'Ferrugem.', qty: 4, color: '#c92a2a' },
];

// ===== EQUIPAMENTOS =====
export const equipment = [
  { id: 'tube', name: 'Tubo de Ensaio', icon: '🧪', desc: 'Misturar pequenas quantidades' },
  { id: 'beaker', name: 'Béquer', icon: '⚗️', desc: 'Misturar e aquecer substâncias' },
  { id: 'bunsen', name: 'Bico de Bunsen', icon: '🔥', desc: 'Aquecer e causar combustão' },
  { id: 'scale', name: 'Balança', icon: '⚖️', desc: 'Verificar conservação da massa' },
  { id: 'thermo', name: 'Termômetro', icon: '🌡️', desc: 'Medir temperatura da reação' },
  { id: 'petri', name: 'Placa de Petri', icon: '🧫', desc: 'Observar precipitados' },
  { id: 'dropper', name: 'Conta-gotas', icon: '💧', desc: 'Adicionar gotas precisas' },
  { id: 'safety', name: 'Equip. de Segurança', icon: '🧯', desc: 'Proteção do cientista' },
];

// ===== REAÇÕES DO LAB =====
export const labReactions = [
  { reactants: ['h2', 'o2'], product: 'h2o', equation: '2H₂ + O₂ → 2H₂O', type: 'Síntese', color: '#4dabf7', effect: 'flash', temp: 'exotérmica', desc: 'Hidrogênio queima no oxigênio formando água com liberação de energia.' },
  { reactants: ['na', 'cl2'], product: 'nacl', equation: '2Na + Cl₂ → 2NaCl', type: 'Síntese', color: '#69db7c', effect: 'flash', temp: 'exotérmica', desc: 'Sódio metálico reage violentamente com cloro.' },
  { reactants: ['ch4', 'o2'], product: 'co2', equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O', type: 'Combustão', color: '#ff6b6b', effect: 'explosion', temp: 'exotérmica', desc: 'Combustão do metano produz CO₂ e água.' },
  { reactants: ['hcl', 'naoh'], product: 'nacl', equation: 'HCl + NaOH → NaCl + H₂O', type: 'Neutralização', color: '#00ff88', effect: 'bubble', temp: 'exotérmica', desc: 'Ácido + base = sal + água.' },
  { reactants: ['caco3'], product: 'co2', equation: 'CaCO₃ → CaO + CO₂', type: 'Decomposição', color: '#fff3bf', effect: 'gas', temp: 'endotérmica', desc: 'Calcário decomposto por calor.' },
  { reactants: ['zn', 'cuso4'], product: 'zn', equation: 'Zn + CuSO₄ → ZnSO₄ + Cu', type: 'Simples Troca', color: '#b2f2bb', effect: 'color', temp: 'exotérmica', desc: 'Zinco desloca cobre da solução azul.' },
  { reactants: ['mg', 'o2'], product: 'mgo', equation: '2Mg + O₂ → 2MgO', type: 'Combustão', color: '#ffffff', effect: 'flash', temp: 'exotérmica', desc: 'Magnésio queima com luz branca intensa.' },
  { reactants: ['fe', 'o2'], product: 'fe2o3', equation: '4Fe + 3O₂ → 2Fe₂O₃', type: 'Combustão', color: '#c92a2a', effect: 'slow', temp: 'exotérmica', desc: 'Ferro oxida formando ferrugem.' },
  { reactants: ['h2', 'n2'], product: 'nh3', equation: 'N₂ + 3H₂ → 2NH₃', type: 'Síntese', color: '#b2f2bb', effect: 'bubble', temp: 'exotérmica', desc: 'Síntese da amônia (processo Haber).' },
  { reactants: ['agno3', 'nacl'], product: 'agcl', equation: 'AgNO₃ + NaCl → AgCl + NaNO₃', type: 'Dupla Troca', color: '#f8f9fa', effect: 'precipitate', temp: 'neutra', desc: 'Forma precipitado branco de cloreto de prata.' },
];

// ===== MISSÕES DE INVESTIGAÇÃO =====
export const investigations = [
  {
    id: 1, title: 'Substância Desconhecida A', desc: 'Um frasco sem rótulo foi encontrado. Misture com reagentes para descobrir o que é.',
    unknown: 'hcl', unknownName: 'Ácido Clorídrico',
    tests: [
      { reagent: 'naoh', result: 'Reação exotérmica! Solução fica neutra.', evidence: 'neutralização', hint: 'Ácido + base = sal + água' },
      { reagent: 'zn', result: 'Bolhas de gás surgem!', evidence: 'gás', hint: 'Ácido + metal = gás hidrogênio' },
      { reagent: 'caco3', result: 'Efervecência! Gás é liberado.', evidence: 'gás', hint: 'Ácido + carbonato = CO₂' },
    ],
    options: ['Água', 'Ácido Clorídrico', 'Sulfato de Cobre', 'Hidróxido de Sódio'],
    answer: 1,
    explain: 'A substância reage com bases (neutralização), com metais (libera H₂) e com carbonatos (libera CO₂). É um ácido — HCl.'
  },
  {
    id: 2, title: 'Qual é a Base?', desc: 'Três frascos sem rótulo. Apenas um contém uma base. Descubra qual.',
    unknown: 'naoh', unknownName: 'Hidróxido de Sódio',
    tests: [
      { reagent: 'hcl', result: 'Solução esquenta e fica salgada.', evidence: 'neutralização', hint: 'Base + ácido = sal + água' },
      { reagent: 'cuso4', result: 'Precipitado azul forma-se!', evidence: 'precipitado', hint: 'Base + sal de cobre = precipitado' },
      { reagent: 'h2', result: 'Nada acontece.', evidence: 'nenhum', hint: 'Bases não reagem com gases inertes' },
    ],
    options: ['Água', 'Ácido Clorídrico', 'Hidróxido de Sódio', 'Metano'],
    answer: 2,
    explain: 'A substância neutraliza ácidos e forma precipitado com sais de cobre. É uma base — NaOH.'
  },
  {
    id: 3, title: 'Mistério do Metal', desc: 'Um metal desconhecido foi encontrado. Teste para identificá-lo.',
    unknown: 'zn', unknownName: 'Zinco',
    tests: [
      { reagent: 'hcl', result: 'Bolhas de gás intensas!', evidence: 'gás', hint: 'Metais reagem com ácidos liberando H₂' },
      { reagent: 'cuso4', result: 'Solução perde a cor azul, metal deposita-se.', evidence: 'cor', hint: 'Metal mais reativo desloca menos reativo' },
      { reagent: 'o2', result: 'Reação lenta, leve brilho.', evidence: 'calor', hint: 'Alguns metais oxidam mais rápido' },
    ],
    options: ['Cobre', 'Ouro', 'Zinco', 'Ferro'],
    answer: 2,
    explain: 'O metal reage com ácido (libera gás) e desloca cobre de solução. É zinco — mais reativo que o cobre.'
  },
];

// ===== MISSÕES MULTIETAPAS =====
export const multiStepMissions = [
  {
    id: 1, title: 'Síntese da Água', desc: 'Complete todas as etapas da reação.',
    steps: [
      { type: 'reactants', q: 'Quais são os reagentes?', options: ['H₂ e O₂', 'H₂ e N₂', 'CO₂ e H₂O', 'Na e Cl₂'], answer: 0 },
      { type: 'products', q: 'Qual é o produto?', options: ['CO₂', 'H₂O', 'NaCl', 'NH₃'], answer: 1 },
      { type: 'balance', q: 'Balanceie: __H₂ + __O₂ → __H₂O', coefficients: [2, 1, 2], labels: ['H₂', 'O₂', 'H₂O'] },
      { type: 'classify', q: 'Classifique a reação:', options: ['Síntese', 'Decomposição', 'Combustão', 'Neutralização'], answer: 0 },
    ],
    explain: 'A síntese da água combina hidrogênio e oxigênio liberando energia. É uma reação de síntese e combustão.',
    reward: { xp: 100, points: 200, coins: 30 }
  },
  {
    id: 2, title: 'Decomposição do Calcário', desc: 'Analise a decomposição do carbonato de cálcio.',
    steps: [
      { type: 'reactants', q: 'Qual é o reagente?', options: ['CaCO₃', 'CaO', 'CO₂', 'H₂O'], answer: 0 },
      { type: 'products', q: 'Quais são os produtos?', options: ['Ca + CO₂', 'CaO + CO₂', 'CaO + H₂O', 'Ca + O₂'], answer: 1 },
      { type: 'balance', q: 'Balanceie: __CaCO₃ → __CaO + __CO₂', coefficients: [1, 1, 1], labels: ['CaCO₃', 'CaO', 'CO₂'] },
      { type: 'classify', q: 'Classifique a reação:', options: ['Síntese', 'Decomposição', 'Simples troca', 'Combustão'], answer: 1 },
    ],
    explain: 'O calcário (CaCO₃) decomposto por calor forma cal viva (CaO) e gás carbônico. Reação de decomposição.',
    reward: { xp: 100, points: 200, coins: 30 }
  },
  {
    id: 3, title: 'Combustão do Metano', desc: 'Investigue a queima do gás metano.',
    steps: [
      { type: 'reactants', q: 'Quais são os reagentes?', options: ['CH₄ e O₂', 'CH₄ e H₂', 'CO₂ e H₂O', 'C e O₂'], answer: 0 },
      { type: 'products', q: 'Quais são os produtos?', options: ['CO₂ e H₂', 'CO₂ e H₂O', 'C e H₂O', 'CH₄ e O₂'], answer: 1 },
      { type: 'balance', q: 'Balanceie: __CH₄ + __O₂ → __CO₂ + __H₂O', coefficients: [1, 2, 1, 2], labels: ['CH₄', 'O₂', 'CO₂', 'H₂O'] },
      { type: 'classify', q: 'Classifique a reação:', options: ['Síntese', 'Decomposição', 'Combustão', 'Neutralização'], answer: 2 },
    ],
    explain: 'O metano queima no oxigênio produzindo CO₂ e água, liberando energia. Reação de combustão.',
    reward: { xp: 120, points: 250, coins: 40 }
  },
];

// ===== DESAFIOS DE BALANCEAMENTO PROGRESSIVOS =====
export const balanceChallenges = [
  { difficulty: 'Fácil', equation: 'H₂ + O₂ → H₂O', coefficients: [2, 1, 2], labels: ['H₂', 'O₂', 'H₂O'], explain: '4H e 2O de cada lado.' },
  { difficulty: 'Fácil', equation: 'Na + Cl₂ → NaCl', coefficients: [2, 1, 2], labels: ['Na', 'Cl₂', 'NaCl'], explain: '2Na e 2Cl de cada lado.' },
  { difficulty: 'Fácil', equation: 'C + O₂ → CO₂', coefficients: [1, 1, 1], labels: ['C', 'O₂', 'CO₂'], explain: '1C e 2O de cada lado.' },
  { difficulty: 'Médio', equation: 'N₂ + H₂ → NH₃', coefficients: [1, 3, 2], labels: ['N₂', 'H₂', 'NH₃'], explain: '2N e 6H de cada lado.' },
  { difficulty: 'Médio', equation: 'Al + O₂ → Al₂O₃', coefficients: [4, 3, 2], labels: ['Al', 'O₂', 'Al₂O₃'], explain: '4Al e 6O de cada lado.' },
  { difficulty: 'Médio', equation: 'Fe + Cl₂ → FeCl₃', coefficients: [2, 3, 2], labels: ['Fe', 'Cl₂', 'FeCl₃'], explain: '2Fe e 6Cl de cada lado.' },
  { difficulty: 'Difícil', equation: 'CH₄ + O₂ → CO₂ + H₂O', coefficients: [1, 2, 1, 2], labels: ['CH₄', 'O₂', 'CO₂', 'H₂O'], explain: '1C, 4H, 4O de cada lado.' },
  { difficulty: 'Difícil', equation: 'C₃H₈ + O₂ → CO₂ + H₂O', coefficients: [1, 5, 3, 4], labels: ['C₃H₈', 'O₂', 'CO₂', 'H₂O'], explain: '3C, 8H, 10O de cada lado.' },
  { difficulty: 'Difícil', equation: 'C₂H₅OH + O₂ → CO₂ + H₂O', coefficients: [1, 3, 2, 3], labels: ['C₂H₅OH', 'O₂', 'CO₂', 'H₂O'], explain: '2C, 6H, 6O de cada lado.' },
];

// ===== CHEFÕES =====
export const bosses = [
  {
    id: 1, name: 'Guardião do Balanceamento', icon: '⚖️', desc: 'Balanceie 5 equações consecutivas!',
    hp: 5, type: 'balance', color: '#fab005',
    questions: [3, 4, 5, 6, 7],
    reward: { xp: 200, points: 400, coins: 50, achievement: 'balance_boss' }
  },
  {
    id: 2, name: 'Mestre das Reações', icon: '⚡', desc: 'Identifique 5 reações em sequência!',
    hp: 5, type: 'identify', color: '#ff6b6b',
    questions: [0, 1, 2, 3, 4],
    reward: { xp: 200, points: 400, coins: 50, achievement: 'reaction_boss' }
  },
  {
    id: 3, name: 'O Alquimista Supremo', icon: '🧪', desc: 'Complete um desafio multietapas sem errar!',
    hp: 3, type: 'multistep', color: '#cc5de8',
    questions: [0, 1, 2],
    reward: { xp: 300, points: 600, coins: 80, achievement: 'alchemist_boss' }
  },
];

// ===== ÁRVORE DE CONHECIMENTO =====
export const knowledgeTree = [
  { id: 'basic', name: 'Química Básica', icon: '📚', xpReq: 0, desc: 'Elementos, moléculas e reações simples.', unlocked: true },
  { id: 'reactions', name: 'Tipos de Reação', icon: '🔄', xpReq: 300, desc: 'Síntese, decomposição, trocas.', deps: ['basic'] },
  { id: 'balancing', name: 'Balanceamento', icon: '⚖️', xpReq: 600, desc: 'Conservação da massa e coeficientes.', deps: ['reactions'] },
  { id: 'acids', name: 'Ácidos e Bases', icon: '🧴', xpReq: 1000, desc: 'Neutralização, pH, indicadores.', deps: ['balancing'] },
  { id: 'redox', name: 'Oxidação e Redução', icon: '⚡', xpReq: 1500, desc: 'Transferência de elétrons.', deps: ['acids'] },
  { id: 'advanced', name: 'Química Avançada', icon: '🏆', xpReq: 2200, desc: 'Reações complexas e desafios finais.', deps: ['redox'] },
];

// ===== MAPA DE LABORATÓRIOS =====
export const labMap = [
  { id: 'basic', name: 'Laboratório Básico', icon: '🏫', desc: 'Fundamentos da química', xpReq: 0, missions: 3, color: '#4dabf7' },
  { id: 'combust', name: 'Lab. de Combustão', icon: '🔥', desc: 'Reações de combustão', xpReq: 300, missions: 3, color: '#ff6b6b' },
  { id: 'reactions', name: 'Lab. de Reações', icon: '⚗️', desc: 'Tipos de reação', xpReq: 600, missions: 4, color: '#00ff88' },
  { id: 'balance', name: 'Lab. de Balanceamento', icon: '⚖️', desc: 'Equações balanceadas', xpReq: 1000, missions: 4, color: '#fab005' },
  { id: 'acids', name: 'Lab. de Ácidos e Bases', icon: '🧪', desc: 'Neutralização e pH', xpReq: 1500, missions: 3, color: '#cc5de8' },
  { id: 'redox', name: 'Lab. de Oxidação', icon: '⚡', desc: 'Oxirredução', xpReq: 2000, missions: 3, color: '#e64980' },
  { id: 'master', name: 'Lab. Mestre', icon: '🏆', desc: 'Desafio final', xpReq: 2800, missions: 5, color: '#ffd700' },
];

// ===== CONQUISTAS =====
export const achievements = [
  { id: 'first_exp', icon: '🏅', name: 'Primeiro Experimento', desc: 'Complete sua primeira reação', condition: { type: 'reactions', value: 1 } },
  { id: 'young_sci', icon: '⚗️', name: 'Jovem Cientista', desc: 'Complete 5 reações', condition: { type: 'reactions', value: 5 } },
  { id: 'combustion', icon: '🔥', name: 'Mestre da Combustão', desc: '3 reações de combustão', condition: { type: 'typeCount', key: 'Combustão', value: 3 } },
  { id: 'balancer', icon: '⚖️', name: 'Equilibrista', desc: 'Balanceie 5 equações', condition: { type: 'balanced', value: 5 } },
  { id: 'alchemist', icon: '🧪', name: 'Alquimista das Reações', desc: 'Complete 15 reações', condition: { type: 'reactions', value: 15 } },
  { id: 'lightning', icon: '⚡', name: 'Mente Relâmpago', desc: '10 acertos no Relâmpago', condition: { type: 'lightning', value: 10 } },
  { id: 'identifier', icon: '🔍', name: 'Identificador', desc: 'Classifique 10 reações', condition: { type: 'identified', value: 10 } },
  { id: 'detective', icon: '🕵️', name: 'Detetive Químico', desc: 'Resolva 3 investigações', condition: { type: 'investigations', value: 3 } },
  { id: 'boss1', icon: '⚔️', name: 'Venceu o Guardião', desc: 'Derrote o chefão de balanceamento', condition: { type: 'boss', value: 1 } },
  { id: 'boss2', icon: '🥊', name: 'Venceu o Mestre', desc: 'Derrote o chefão de reações', condition: { type: 'boss', value: 2 } },
  { id: 'boss3', icon: '👑', name: 'Alquimista Supremo', desc: 'Derrote o chefão final', condition: { type: 'boss', value: 3 } },
  { id: 'combo10', icon: '🔥', name: 'Combo Flamejante', desc: '10 acertos seguidos', condition: { type: 'combo', value: 10 } },
  { id: 'rich', icon: '💰', name: 'Cientista Rico', desc: 'Acumule 200 moedas', condition: { type: 'coins', value: 200 } },
  { id: 'extreme', icon: '☢️', name: 'Cientista Extremo', desc: 'Desbloqueie o modo extremo', condition: { type: 'xp', value: 2800 } },
  { id: 'master', icon: '🏆', name: 'Mestre da Química', desc: 'Alcance o nível máximo', condition: { type: 'level', value: 6 } },
];

// ===== PERGUNTAS RELÂMPAGO =====
export const lightningQuestions = [
  { q: 'Produto de H₂ + O₂?', options: ['H₂O', 'CO₂', 'NaCl', 'NH₃'], answer: 0, explain: 'Forma água.' },
  { q: '2H₂ + O₂ → 2H₂O é?', options: ['Decomposição', 'Síntese', 'Dupla troca', 'Combustão'], answer: 1, explain: 'Dois reagentes, um produto.' },
  { q: 'Ácido + Base produz?', options: ['Sal + Água', 'Gás + Calor', 'Metal + Ácido', 'Sal + Gás'], answer: 0, explain: 'Neutralização.' },
  { q: 'Comburente é sempre?', options: ['H₂', 'O₂', 'C', 'N₂'], answer: 1, explain: 'Oxigênio sustenta combustão.' },
  { q: 'Zn + CuSO₄ é?', options: ['Síntese', 'Simples troca', 'Dupla troca', 'Decomposição'], answer: 1, explain: 'Metal desloca metal.' },
  { q: 'CaCO₃ → CaO + CO₂ é?', options: ['Síntese', 'Decomposição', 'Combustão', 'Neutralização'], answer: 1, explain: 'Um se divide em dois.' },
  { q: 'Coeficiente de H₂O em CH₄+2O₂→CO₂+__H₂O?', options: ['1','2','3','4'], answer: 1, explain: '4H gera 2H₂O.' },
  { q: 'Mg queima com que cor?', options: ['Verde','Azul','Branca','Vermelha'], answer: 2, explain: 'Luz branca intensa.' },
  { q: 'AgNO₃+NaCl→AgCl+NaNO₃ é?', options: ['Simples troca','Dupla troca','Síntese','Combustão'], answer: 1, explain: 'Trocam íons.' },
  { q: 'Conservação da massa: 10g reage = __g produto?', options: ['5','10','15','20'], answer: 1, explain: 'Massa se conserva.' },
  { q: 'N₂+3H₂→2NH₃: átomos de H à direita?', options: ['3','4','6','2'], answer: 2, explain: '2×3=6.' },
  { q: 'Combustão do metano produz?', options: ['CO₂+H₂O','CO+H₂','C+H₂O','CH₄+O₂'], answer: 0, explain: 'CO₂ e H₂O.' },
  { q: 'Ferrugem é qual composto?', options: ['FeO','Fe₂O₃','FeCl₃','FeSO₄'], answer: 1, explain: 'Óxido de ferro III.' },
  { q: 'HCl é ácido ou base?', options: ['Ácido','Base','Sal','Neutro'], answer: 0, explain: 'Ácido clorídrico.' },
  { q: 'Qual metal desloca cobre?', options: ['Ouro','Zinco','Prata','Cobre'], answer: 1, explain: 'Zinco é mais reativo.' },
];

// ===== CLASSIFICAÇÃO =====
export const identifyQuestions = [
  { equation: '2H₂ + O₂ → 2H₂O', options: ['Síntese','Decomposição','Simples troca','Combustão'], answer: 0, explain: '2 reagentes → 1 produto.' },
  { equation: '2H₂O → 2H₂ + O₂', options: ['Síntese','Decomposição','Dupla troca','Neutralização'], answer: 1, explain: '1 → 2 produtos.' },
  { equation: 'Zn + CuSO₄ → ZnSO₄ + Cu', options: ['Simples troca','Síntese','Decomposição','Combustão'], answer: 0, explain: 'Metal desloca metal.' },
  { equation: 'AgNO₃ + NaCl → AgCl + NaNO₃', options: ['Simples troca','Dupla troca','Síntese','Neutralização'], answer: 1, explain: 'Trocam íons.' },
  { equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O', options: ['Combustão','Síntese','Decomposição','Neutralização'], answer: 0, explain: 'Substância + O₂.' },
  { equation: 'HCl + NaOH → NaCl + H₂O', options: ['Neutralização','Simples troca','Síntese','Decomposição'], answer: 0, explain: 'Ácido + Base.' },
  { equation: 'CaCO₃ → CaO + CO₂', options: ['Decomposição','Síntese','Combustão','Dupla troca'], answer: 0, explain: '1 → 2.' },
  { equation: 'N₂ + 3H₂ → 2NH₃', options: ['Síntese','Decomposição','Combustão','Neutralização'], answer: 0, explain: '2 → 1.' },
  { equation: 'Fe + CuSO₄ → FeSO₄ + Cu', options: ['Simples troca','Dupla troca','Síntese','Combustão'], answer: 0, explain: 'Metal desloca metal.' },
  { equation: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl', options: ['Dupla troca','Simples troca','Decomposição','Neutralização'], answer: 0, explain: 'Trocam íons.' },
];

// ===== TÓPICOS DE APRENDIZADO =====
export const learningTopics = [
  { id: 'reaction', title: 'O que é uma Reação Química?', icon: '🧪', text: 'Substâncias (reagentes) se transformam em novas (produtos). Átomos se rearranjam.', example: 'H₂ + O₂ → H₂O', challenge: { q: 'O que acontece com os átomos?', options: ['São criados','São destruídos','Se rearranjam','Desaparecem'], answer: 2 } },
  { id: 'react_prod', title: 'Reagentes e Produtos', icon: '🔄', text: 'Reagentes: esquerda da seta. Produtos: direita da seta.', example: '2H₂ + O₂ → 2H₂O', challenge: { q: 'Em C+O₂→CO₂, o produto é?', options: ['C','O₂','CO₂','Nenhum'], answer: 2 } },
  { id: 'evidence', title: 'Evidências de Reação', icon: '👁️', text: 'Mudança de cor, gás, precipitado, temperatura, luz.', example: 'Zn + 2HCl → ZnCl₂ + H₂↑', challenge: { q: 'Qual NÃO é evidência?', options: ['Cor','Gás','Mudar estado físico','Precipitado'], answer: 2 } },
  { id: 'conservation', title: 'Conservação da Massa', icon: '⚖️', text: 'Massa dos reagentes = massa dos produtos.', example: '4g H + 32g O = 36g H₂O', challenge: { q: '10g reage = __g produto?', options: ['5','10','15','20'], answer: 1 } },
  { id: 'balancing', title: 'Balanceamento', icon: '🔢', text: 'Coeficientes igualam átomos de cada lado.', example: '2H₂ + O₂ → 2H₂O', challenge: { q: '__H₂+O₂→2H₂O, coeficiente?', options: ['1','2','3','4'], answer: 1 } },
  { id: 'synthesis', title: 'Síntese', icon: '➕', text: 'A + B → AB', example: 'N₂ + 3H₂ → 2NH₃', challenge: { q: '2H₂+O₂→2H₂O é?', options: ['Síntese','Decomposição','Combustão','Neutralização'], answer: 0 } },
  { id: 'decomposition', title: 'Decomposição', icon: '➖', text: 'AB → A + B', example: '2H₂O → 2H₂ + O₂', challenge: { q: 'CaCO₃→CaO+CO₂ é?', options: ['Síntese','Decomposição','Troca simples','Combustão'], answer: 1 } },
  { id: 'simple', title: 'Simples Troca', icon: '🔄', text: 'A + BC → AC + B', example: 'Zn + CuSO₄ → ZnSO₄ + Cu', challenge: { q: 'Fe+CuSO₄→FeSO₄+Cu é?', options: ['Síntese','Simples troca','Dupla troca','Decomposição'], answer: 1 } },
  { id: 'double', title: 'Dupla Troca', icon: '🔁', text: 'AB + CD → AD + CB', example: 'AgNO₃ + NaCl → AgCl + NaNO₃', challenge: { q: 'BaCl₂+Na₂SO₄→BaSO₄+2NaCl é?', options: ['Simples troca','Dupla troca','Síntese','Neutralização'], answer: 1 } },
  { id: 'combustion', title: 'Combustão', icon: '🔥', text: 'Substância + O₂ → CO₂ + H₂O + energia', example: 'CH₄ + 2O₂ → CO₂ + 2H₂O', challenge: { q: 'Combustão precisa de?', options: ['H₂','O₂','C','N₂'], answer: 1 } },
  { id: 'neutral', title: 'Neutralização', icon: '🧴', text: 'Ácido + Base → Sal + Água', example: 'HCl + NaOH → NaCl + H₂O', challenge: { q: 'Ácido+Base produz?', options: ['Sal+Água','Gás+Calor','Metal+Ácido','Sal+Gás'], answer: 0 } },
];

// ===== EVENTOS ALEATÓRIOS =====
export const randomEvents = [
  { id: 'blackout', name: 'Apagão no Laboratório!', icon: '🌑', desc: 'Sem energia! Menos tempo para responder.', effect: 'time_reduce', value: 10 },
  { id: 'bonus', name: 'Desafio Bônus!', icon: '⭐', desc: 'Responda certo e ganhe o dobro de XP!', effect: 'double_xp', value: 2 },
  { id: 'unknown', name: 'Substância Desconhecida!', icon: '❓', desc: 'Um frasco misterioso apareceu!', effect: 'unknown_sub', value: 1 },
  { id: 'reactive', name: 'Reação Inesperada!', icon: '💥', desc: 'As substâncias estão mais reativas! Bônus de pontos.', effect: 'double_points', value: 2 },
  { id: 'low_reagent', name: 'Reagente Acabando!', icon: '📉', desc: 'Escolha sabiamente, reagentes limitados.', effect: 'limit_reagents', value: 3 },
];

// ===== NIVEIS =====
export const levels = [
  { level: 1, name: 'Fundamentos', xpRequired: 0, color: '#4dabf7' },
  { level: 2, name: 'Tipos de Reação', xpRequired: 300, color: '#00ff88' },
  { level: 3, name: 'Combustão e Neutralização', xpRequired: 700, color: '#fab005' },
  { level: 4, name: 'Equações Químicas', xpRequired: 1200, color: '#ff6b6b' },
  { level: 5, name: 'Oxirredução', xpRequired: 2000, color: '#cc5de8' },
  { level: 6, name: 'Cientista Mestre', xpRequired: 2800, color: '#ffd700' },
];

export function getLevel(xp) {
  let current = levels[0];
  let next = levels[1];
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xpRequired) {
      current = levels[i];
      next = levels[i + 1] || null;
    }
  }
  return { current, next };
}

export function getSubstance(id) {
  return substances.find(s => s.id === id);
}

// ===== DIÁRIO ENTRADAS BASE =====
export const diaryEntries = labReactions.map((r, i) => ({
  id: i,
  name: r.equation.split('→')[0].trim() + ' → ' + r.equation.split('→')[1].trim(),
  equation: r.equation,
  type: r.type,
  desc: r.desc,
  discovered: false,
}));
