// Educational content for the chemistry platform
// Explanations inspired by https://www.todamateria.com.br/reacoes-quimicas/

export const reactionTypes = [
  {
    id: 'sintese', name: 'Síntese (ou Adição)', icon: '➕',
    general: 'A + B → AB',
    explanation: 'Reação entre duas ou mais substâncias reagentes que resultam em uma única substância mais complexa. É o caso, por exemplo, da formação de compostos a partir de elementos simples. Os átomos se unem por meio de novas ligações químicas, liberando ou absorvendo energia no processo.',
    extra: ' Também chamada de reação de adição, pois há união de reagentes em um único produto.',
    example: { name: 'Síntese do gás carbônico', equation: 'C + O₂ → CO₂' },
    color: '#4dabf7',
  },
  {
    id: 'decomposicao', name: 'Decomposição (ou Análise)', icon: '➖',
    general: 'AB → A + B',
    explanation: 'Uma única substância reagente se divide em duas ou mais substâncias mais simples. A decomposição pode ocorrer de três maneiras: pirólese (pelo calor), fotólise (pela luz) ou eletrólise (pela eletricidade). As ligações do composto são rompidas, gerando produtos com propriedades diferentes.',
    extra: ' O calor, a luz ou a corrente elétrica fornecem a energia necessária para romper as ligações.',
    example: { name: 'Decomposição do óxido de mercúrio', equation: '2HgO → 2Hg + O₂' },
    color: '#cc5de8',
  },
  {
    id: 'simples_troca', name: 'Simples Troca (ou Deslocamento)', icon: '🔄',
    general: 'A + BC → AC + B',
    explanation: 'Um elemento mais reativo desloca outro menos reativo de um composto. O elemento livre (A) combina-se com parte do composto (BC), liberando o outro elemento (B). A reatividade dos elementos determina quem será deslocado — metais mais reativos deslocam metais menos reativos, e halogênios mais reativos deslocam halogênios menos reativos.',
    extra: ' A série de reatividade dos metais (ou fila de cation) define qual elemento consegue deslocar o outro.',
    example: { name: 'Zinco desloca cobre', equation: 'Zn + CuSO₄ → ZnSO₄ + Cu' },
    color: '#00a651',
  },
  {
    id: 'dupla_troca', name: 'Dupla Troca (ou Metátese)', icon: '🔁',
    general: 'AB + CD → AD + CB',
    explanation: 'Dois compostos trocam entre si elementos ou íons, formando dois novos compostos. Para que essa reação ocorra, geralmente é necessário que um dos produtos seja insolúvel (precipitado), volátil (gás) ou que haja neutralização (formação de água). É muito comum em reações entre sais, ácidos e bases.',
    extra: ' As trocas acontecem entre os cátions e ânions dos reagentes, sempre em pares.',
    example: { name: 'Formação de cloreto de prata', equation: 'AgNO₃ + NaCl → AgCl + NaNO₃' },
    color: '#fab005',
  },
  {
    id: 'combustao', name: 'Combustão', icon: '🔥',
    general: 'Combustível + O₂ → CO₂ + H₂O + energia',
    explanation: 'Uma substância (combustível) reage com o oxigênio (comburente), liberando energia na forma de calor e luz. É uma reação exotérmica, ou seja, libera mais energia do que consome. Quando o combustível contém carbono e hidrogênio, os produtos principais são gás carbônico e água. A combustão pode ser completa (oxigênio suficiente) ou incompleta (oxigênio insuficiente, gerando monóxido de carbono ou fuligem).',
    extra: ' A combustão incompleta produz CO (tóxico) e C (fuligem), além de menos energia.',
    example: { name: 'Combustão do metano', equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
    color: '#ff6b6b',
  },
  {
    id: 'neutralizacao', name: 'Neutralização', icon: '🧴',
    general: 'Ácido + Base → Sal + Água',
    explanation: 'Um ácido reage com uma base, formando um sal e água. É um caso particular de dupla troca em que o H⁺ do ácido se combina com o OH⁻ da base, formando H₂O. A solução resultante pode ser neutra (pH = 7), ácida (pH < 7, se o ácido for mais forte) ou básica (pH > 7, se a base for mais forte). Essas reações são exotérmicas — liberam calor.',
    extra: ' A neutralização total (ácido forte + base forte) resulta em pH neutro e solução salina.',
    example: { name: 'Ácido clorídrico + hidróxido de sódio', equation: 'HCl + NaOH → NaCl + H₂O' },
    color: '#20c997',
  },
];

export const evidenceCards = [
  { id: 'cor', icon: '🎨', title: 'Mudança de Cor', text: 'A mudança de cor pode indicar que novas substâncias foram formadas, com diferentes propriedades de absorção de luz. É uma das evidências mais visíveis de que ocorreu uma transformação química.', example: 'Quando o ferro enferruja, ele muda de cinza para marrom-avermelhado, pois forma um novo composto (óxido de ferro).', caution: 'Nem toda mudança de cor indica reação química — misturar tintas também muda a cor, mas é uma mudança física.' },
  { id: 'gas', icon: '💨', title: 'Formação de Gás', text: 'O aparecimento de bolhas ou efervescência indica que um gás está sendo liberado como produto da reação. O gás pode ser identificado por testes específicos, como o "estalo" do hidrogênio ou o "apagamento" do gás carbônico.', example: 'Zn + 2HCl → ZnCl₂ + H₂↑ libera gás hidrogênio, que produz um estalo característico próximo a uma chama.', caution: 'A fervura da água também produz bolhas, mas é uma mudança física (vaporização), não uma reação química.' },
  { id: 'precipitado', icon: '🧊', title: 'Formação de Precipitado', text: 'Quando dois líquidos reagem e formam um sólido insolúvel que se deposita no fundo do recipiente, chamamos de precipitado. Isso indica que um novo composto, não solúvel, foi formado durante a reação.', example: 'AgNO₃ + NaCl → AgCl↓ (precipitado branco) + NaNO₃. O cloreto de prata é insolúvel em água.', caution: 'A sedimentação natural também forma depósitos, mas sem reação química — é apenas um processo físico.' },
  { id: 'temperatura', icon: '🌡️', title: 'Alteração de Temperatura', text: 'Reações exotérmicas liberam calor (a temperatura sobe) e reações endotérmicas absorvem calor (a temperatura desce). Essa variação de temperatura é uma evidência de que ligações químicas foram rompidas e formadas, trocando energia com o ambiente.', example: 'A combustão libera muito calor (exotérmica). A fotossíntese absorve energia solar (endotérmica).', caution: 'O aquecimento por uma fonte externa (fogão, lâmpada) não é uma reação química — é transferência de calor.' },
  { id: 'luz', icon: '💡', title: 'Emissão de Luz', text: 'Algumas reações liberam energia na forma de luz visível, como a combustão do magnésio ou reações de luminescência (fluorescência e fosforescência). Essa emissão luminosa indica uma grande liberação de energia durante a formação de novas ligações.', example: '2Mg + O₂ → 2MgO + luz branca intensa. O magnésio queima com uma chama muito brilhante.', caution: 'Uma lâmpada também emite luz, mas por aquecimento elétrico do filamento, não por reação química.' },
];

export const learnTopics = [
  { id: 'reacao', title: 'O que é uma Reação Química?', icon: '🧪', sections: [
    { text: 'Uma reação química é o resultado da transformação que ocorre nas substâncias, onde os átomos rearranjam-se modificando seu estado inicial. Os compostos químicos sofrem alterações gerando novas moléculas, enquanto os átomos dos elementos permanecem inalterados.' },
    { text: 'Nem toda mudança é uma reação química. Mudanças de estado físico (derreter gelo, ferver água) são transformações físicas — a substância continua a mesma, apenas muda de estado. Em uma reação química, a substância se transforma em outra completamente diferente.' },
    { text: 'As ligações químicas entre os átomos são rompidas e novas ligações são formadas. Esse processo envolve absorção ou liberação de energia, pois romper ligações consome energia e formá-las libera energia.' },
  ], example: 'H₂ + O₂ → H₂O\nReagentes (H₂ e O₂) se transformam\nno produto (H₂O — água).' },
  { id: 'reagentes', title: 'Reagentes e Produtos', icon: '🔄', sections: [
    { text: 'Reagentes são as substâncias presentes no início da reação, escritas à esquerda da seta. Produtos são as novas substâncias formadas, escritas à direita. A seta (→) indica o sentido da transformação.' },
    { text: 'A quantidade de reagentes determina a quantidade de produtos, conforme a lei das proporções definidas. Cada reação segue uma proporção fixa entre os átomos participantes.' },
    { text: 'Algumas reações são reversíveis e usam a seta dupla (⇌), indicando que podem ocorrer nos dois sentidos. Outras são irreversíveis e só ocorrem em um sentido.' },
  ], example: '2H₂ + O₂ → 2H₂O\nReagentes: H₂ e O₂ (esquerda)\nProdutos: H₂O (direita)\n\nReversível: N₂ + 3H₂ ⇌ 2NH₃' },
  { id: 'atomos', title: 'Átomos e Moléculas', icon: '⚛️', sections: [
    { text: 'Átomo é a menor parte de um elemento que mantém suas propriedades. Molécula é um grupo de átomos unidos por ligações químicas. Um elemento é formado por um único tipo de átomo; um composto é formado por átomos de elementos diferentes unidos em proporções fixas.' },
    { text: 'Durante uma reação química, os átomos não são criados nem destruídos — eles apenas se reorganizam, formando novas moléculas. As propriedades do produto são diferentes das propriedades dos reagentes.' },
    { text: 'As ligações entre átomos podem ser covalentes (compartilhamento de elétrons), iônicas (transferência de elétrons) ou metálicas (mar de elétrons). O tipo de ligação determina as propriedades da substância formada.' },
  ], example: 'H₂ — molécula do elemento hidrogênio\nH₂O — molécula do composto água\nNaCl — composto iônico (sal de cozinha)' },
  { id: 'equacoes', title: 'Equações Químicas', icon: '📝', sections: [
    { text: 'Uma equação química é a representação escrita de uma reação, usando fórmulas químicas. A seta (→) separa reagentes (esquerda) de produtos (direita). Os coeficientes (números antes das fórmulas) indicam quantas moléculas participam, e os subscritos (números pequenos dentro das fórmulas) indicam quantos átomos há em cada molécula.' },
    { text: 'Acima da seta podem aparecer informações sobre as condições da reação, como calor (Δ), catalisador, pressão, ou luz. Abaixo da seta podem aparecer estados físicos: (s) sólido, (l) líquido, (g) gasoso, (aq) aquoso.' },
  ], example: '2H₂ + O₂ → 2H₂O\n\n"2" antes de H₂ = 2 moléculas\n"₂" em H₂ = 2 átomos de H por molécula\n\nCom condições: N₂ + 3H₂ → 2NH₃\n          (alta pressão, catalisador)' },
  { id: 'conservacao', title: 'Conservação da Massa (Lei de Lavoisier)', icon: '🔬', sections: [
    { text: 'A Lei de Lavoisier (Lei da Conservação da Massa) estabelece que a massa total dos reagentes é igual à massa total dos produtos. Em uma reação química, nada é criado nem destruído — a matéria apenas se transforma.' },
    { text: 'Os átomos se rearranjam, mas o número e o tipo de átomos permanecem os mesmos antes e depois. Por isso, a equação química precisa estar balanceada: o número de átomos de cada elemento deve ser igual nos dois lados.' },
    { text: 'Posteriormente, Proust complementou com a Lei das Proporções Definidas: uma substância pura sempre contém seus elementos na mesma proporção em massa, independentemente de como foi obtida.' },
  ], example: '4g de H₂ + 32g de O₂ = 36g de H₂O\nMassa dos reagentes = 4 + 32 = 36g\nMassa dos produtos = 36g\n\nA massa é conservada!' },
  { id: 'tipos', title: 'Tipos de Reação', icon: '🔀', sections: [
    { text: 'As reações químicas são classificadas em quatro tipos principais: síntese (ou adição), decomposição (ou análise), simples troca (ou deslocamento) e dupla troca (ou metátese). Além dessas, existem reações de combustão, neutralização e oxirredução.' },
    { text: 'Síntese: A + B → AB (união de reagentes). Decomposição: AB → A + B (quebra de um composto). Simples troca: A + BC → AC + B (deslocamento). Dupla troca: AB + CD → AD + CB (permuta de íons).' },
    { text: 'Cada tipo segue um padrão de rearranjo que ajuda a prever os produtos. Conhecer os padrões facilita a identificação e a escrita de equações químicas.' },
  ], example: 'Síntese:      C + O₂ → CO₂\nDecomposição: 2H₂O → 2H₂ + O₂\nSimples troca: Zn + CuSO₄ → ZnSO₄ + Cu\nDupla troca:  AgNO₃ + NaCl → AgCl + NaNO₃' },
  { id: 'evidencias', title: 'Evidências de Reações', icon: '👁️', sections: [
    { text: 'Para saber se uma reação ocorreu, observamos algumas evidências visíveis: mudança de cor, formação de gás (efervescência), formação de precipitado (sólido insolúvel), alteração de temperatura (exotérmica ou endotérmica) e emissão de luz.' },
    { text: 'Importante: nenhuma evidência isolada é prova absoluta em todos os contextos. A mudança de cor pode ser apenas uma mistura física; as bolhas podem ser fervura. É necessário analisar o contexto e, quando possível, verificar a formação de novas substâncias com propriedades diferentes.' },
    { text: 'A melhor confirmação de que ocorreu uma reação química é identificar que as substâncias resultantes têm propriedades (ponto de fusão, densidade, solubilidade, reatividade) diferentes das substâncias iniciais.' },
  ], example: 'Zn + 2HCl → ZnCl₂ + H₂↑\n\nEvidência: efervescência (gás H₂)\nConfirmação: o gás produz "estalo"\npróximo a uma chama acesa.' },
  { id: 'acidos', title: 'Ácidos e Bases', icon: '🧴', sections: [
    { text: 'Ácidos são substâncias que liberam íons H⁺ (prótons) em solução aquosa. Têm sabor azedo, conduzem eletricidade e têm pH menor que 7. Exemplos: HCl (ácido clorídrico), H₂SO₄ (ácido sulfúrico), HNO₃ (ácido nítrico).' },
    { text: 'Bases são substâncias que liberam íons OH⁻ (hidroxila) em solução. Têm sabor amargo, sensação escorregadia ao toque e pH maior que 7. Exemplos: NaOH (soda cáustica), Ca(OH)₂ (cal hidratada), NH₄OH (amônia).' },
    { text: 'A reação entre um ácido e uma base forma sal e água — é a neutralização. O pH da solução resultante depende da força relativa do ácido e da base envolvidos.' },
  ], example: 'HCl (ácido) + NaOH (base) → NaCl (sal) + H₂O (água)\n\npH < 7: ácido | pH = 7: neutro | pH > 7: base' },
  { id: 'oxireducao', title: 'Oxidação e Redução (Oxirredução)', icon: '⚡', sections: [
    { text: 'Reações de oxirredução são aquelas em que ocorre transferência de elétrons entre as substâncias. Oxidação é a perda de elétrons (aumento do número de oxidação). Redução é o ganho de elétrons (diminuição do número de oxidação).' },
    { text: 'Sempre ocorrem juntas: uma substância se oxida (perde elétrons) enquanto outra se reduz (ganha elétrons). Por isso o nome "oxirredução". A substância que causa a oxidação é o agente oxidante, e a que causa a redução é o agente redutor.' },
    { text: 'A mnemônica LEO GER ajuda a memorizar: "LEO says GER" — Lose Electrons = Oxidation, Gain Electrons = Reduction. Ou em português: "Oxi-perde, Reduz-ganha".' },
  ], example: '2Na + Cl₂ → 2NaCl\n\nNa⁰ → Na⁺ + e⁻  (oxidação: perde e⁻)\nCl₂ + 2e⁻ → 2Cl⁻  (redução: ganha e⁻)\n\nNa = agente redutor\nCl₂ = agente oxidante' },
  { id: 'energia', title: 'Energia nas Reações', icon: '🔥', sections: [
    { text: 'Toda reação química envolve energia. As reações exotérmicas liberam energia (calor, luz) para o ambiente — a temperatura ao redor aumenta. As reações endotérmicas absorvem energia do ambiente — a temperatura ao redor diminui.' },
    { text: 'A energia de ativação é a energia mínima necessária para que a reação ocorra. Sem essa energia inicial, os reagentes não conseguem romper suas ligações para formar os produtos. Catalisadores são substâncias que diminuem a energia de ativação, acelerando a reação sem ser consumidos.' },
  ], example: 'Exotérmica: Combustão (libera calor e luz)\nEndotérmica: Fotossíntese (absorve luz solar)\n\nCatalisador: MnO₂ acelera a decomposição\ndo peróxido de hidrogênio (H₂O₂).' },
];

export const aboutContent = {
  mission: 'O Química Lab é uma plataforma educacional gratuita que ajuda estudantes a visualizar e compreender reações químicas de forma interativa, com simulador visual, catálogo de reações e conteúdo didático.',
  note: 'Este site é uma ferramenta educacional. As simulações são simplificações didáticas e não substituem a realização de experimentos em laboratório. Sempre siga as normas de segurança ao realizar experimentos reais em laboratório supervisionado por um profissional habilitado.',
  author: 'Site desenvolvido por Rebecca Santos Gurski, aluna do 8º ano da Escola Referência Mundo Mágico.',
  features: [
    'Simulador visual com animação molecular em tempo real',
    'Equações quimicamente corretas e balanceadas',
    'Catálogo de reações com filtros por tipo',
    'Conteúdo educativo organizado por tópicos, inspirado em fontes didáticas confiáveis',
    'Tema escuro para conforto visual',
    'Acessibilidade: VLibras, leitura de tela, alto contraste, texto grande, redução de movimento',
  ],
};
