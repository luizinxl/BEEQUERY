/**
 * BeeQuery — Tech Bee Companion & Pipeline Simulator
 * Integrates the BeeQuery mascot into a high-tech corporate data assistant.
 * Includes: Interactive Terminal Runner, Web Audio Tech Feedback, Knowledge Pills, and Drone Animations.
 */
(function () {
  'use strict';

  const BEE_URL = '/img/bee.png?v=4';

  /* ═══════════════════════════════════════════════
     1. SYNTHESIZED TECH AUDIO (Web Audio API)
     Zero external audio dependencies, 100% lightweight.
     ═══════════════════════════════════════════════ */
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioContext() {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTechSound(type) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'buzz') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.08);
        osc.frequency.linearRampToValueAtTime(380, now + 0.16);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'success') {
        // High-tech chord (dual frequency)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'scan') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      // Audio not supported or blocked by browser policy
    }
  }

  /* ═══════════════════════════════════════════════
     2. BEE KNOWLEDGE PILLS (Tech Tips)
     ═══════════════════════════════════════════════ */
  const BEE_TIPS = [
    {
      title: "Table.Buffer() para Performance",
      text: "Ao fazer múltiplos joins ou agrupamentos pesados no Power Query, carregar a tabela em memória com Table.Buffer() pode acelerar o processamento em até 10x!",
      code: "Table.Buffer(Fonte_Vendas)"
    },
    {
      title: "Unpivot Dinâmico sem Travar",
      text: "Nunca transforme colunas manualmente. Use 'Desdinamizar Outras Colunas' para que novas filiais ou meses futuros sejam absorvidos automaticamente.",
      code: "Table.UnpivotOtherColumns(Fonte, {\"ID\", \"Filial\"}, \"Atributo\", \"Valor\")"
    },
    {
      title: "Consolidação Automática de Pastas",
      text: "Com Folder.Files() você conecta uma pasta inteira. Novos arquivos .xlsx jogados na rede são integrados com 1 clique em 'Atualizar Tudo'.",
      code: "Folder.Files(\"C:\\Dados\\Matriz\")"
    },
    {
      title: "Tipagem Preventiva de Dados",
      text: "90% dos erros em relatórios ocorrem por números salvos como texto. O M-Engine permite tipagem estrita na extração, blindando o fechamento.",
      code: "Table.TransformColumnTypes(Tabela, {{\"Valor\", Currency.Type}})"
    },
    {
      title: "Substituto do PROCV",
      text: "Mesclar consultas no Power Query realiza joins indexados em memória, eliminando fórmulas pesadas e impedindo que o Excel congele.",
      code: "Table.NestedJoin(Tabela1, {\"SKU\"}, Tabela2, {\"SKU\"}, \"Dados\", JoinKind.LeftOuter)"
    }
  ];

  let currentTipIndex = 0;

  /* ═══════════════════════════════════════════════
     3. FLOATING BEEBOT HUD COMPONENT
     ═══════════════════════════════════════════════ */
  function createBeeBotWidget() {
    // Check if already exists
    if (document.getElementById('beebot-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'beebot-widget';
    widget.className = 'fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 font-sans select-none transition-all duration-300 translate-y-0 opacity-100 pointer-events-auto';

    widget.innerHTML = `
      <!-- Tip Popover Card -->
      <div id="beebot-popover" class="hidden w-80 sm:w-96 rounded-2xl bg-surface-container-highest/95 backdrop-blur-xl border border-primary-container/40 p-5 shadow-2xl shadow-black/60 mb-2 transition-all duration-300 transform scale-95 opacity-0">
        <div class="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span class="text-xs font-mono text-primary font-bold uppercase tracking-wider">BeeQuery AI Copilot</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="beebot-sound-toggle" class="p-1 text-on-surface-variant hover:text-primary transition-colors" title="Alternar Som">
              <span class="material-symbols-outlined text-base" id="beebot-sound-icon">volume_up</span>
            </button>
            <button id="beebot-close-tip" class="p-1 text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>

        <div class="mt-3 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs px-2 py-0.5 rounded-lg bg-primary-container/15 text-primary-container font-mono font-semibold" id="beebot-tip-badge">Pílula #1</span>
            <h4 class="text-sm font-bold text-on-surface" id="beebot-tip-title">Table.Buffer()</h4>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed" id="beebot-tip-text"></p>
          <div class="p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 font-mono text-[11px] text-primary overflow-x-auto" id="beebot-tip-code"></div>
        </div>

        <div class="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
          <button id="beebot-prev-tip" class="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-mono">
            <span class="material-symbols-outlined text-sm">arrow_back</span> Anterior
          </button>
          <button id="beebot-next-tip" class="text-xs px-3 py-1 rounded-xl bg-primary-container/20 text-primary hover:bg-primary-container/30 border border-primary-container/30 transition-all font-mono font-semibold flex items-center gap-1">
            Próxima Dica <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Trigger Button / Cyber Capsule -->
      <button id="beebot-trigger" class="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-surface-container-high/90 hover:bg-surface-container-highest backdrop-blur-md border border-outline-variant/30 hover:border-primary-container/50 shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]">
        <div class="relative w-8 h-8 flex items-center justify-center">
          <img id="beebot-avatar" src="${BEE_URL}" alt="BeeQuery Bot" class="w-7 h-7 object-contain transition-transform duration-300 group-hover:rotate-12">
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface"></span>
        </div>
        <div class="flex flex-col text-left">
          <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
            BeeBot <span class="text-[10px] font-mono text-primary-container px-1.5 py-0.2 rounded bg-primary-container/15">M-Engine</span>
          </span>
          <span class="text-[10px] text-on-surface-variant font-mono">Clique para dicas de ETL</span>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-sm ml-1 transition-colors">chat_bubble</span>
      </button>
    `;

    document.body.appendChild(widget);

    // Wire up events
    const trigger = document.getElementById('beebot-trigger');
    const popover = document.getElementById('beebot-popover');
    const closeBtn = document.getElementById('beebot-close-tip');
    const prevBtn = document.getElementById('beebot-prev-tip');
    const nextBtn = document.getElementById('beebot-next-tip');
    const soundToggle = document.getElementById('beebot-sound-toggle');
    const soundIcon = document.getElementById('beebot-sound-icon');
    const avatar = document.getElementById('beebot-avatar');

    function updateTip(index) {
      const tip = BEE_TIPS[index];
      document.getElementById('beebot-tip-badge').textContent = `Pílula #${index + 1} de ${BEE_TIPS.length}`;
      document.getElementById('beebot-tip-title').textContent = tip.title;
      document.getElementById('beebot-tip-text').textContent = tip.text;
      document.getElementById('beebot-tip-code').textContent = tip.code;
    }

    function togglePopover() {
      const isHidden = popover.classList.contains('hidden');
      if (isHidden) {
        updateTip(currentTipIndex);
        popover.classList.remove('hidden');
        requestAnimationFrame(() => {
          popover.classList.remove('scale-95', 'opacity-0');
          popover.classList.add('scale-100', 'opacity-100');
        });
        playTechSound('buzz');
        // Do a cute bee spin
        if (avatar) {
          avatar.style.transform = 'rotate(360deg) scale(1.15)';
          setTimeout(() => {
            avatar.style.transform = '';
          }, 400);
        }
      } else {
        popover.classList.add('scale-95', 'opacity-0');
        popover.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => popover.classList.add('hidden'), 250);
        playTechSound('click');
      }
    }

    trigger.addEventListener('click', togglePopover);
    closeBtn.addEventListener('click', togglePopover);

    nextBtn.addEventListener('click', () => {
      currentTipIndex = (currentTipIndex + 1) % BEE_TIPS.length;
      updateTip(currentTipIndex);
      playTechSound('click');
    });

    prevBtn.addEventListener('click', () => {
      currentTipIndex = (currentTipIndex - 1 + BEE_TIPS.length) % BEE_TIPS.length;
      updateTip(currentTipIndex);
      playTechSound('click');
    });

    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? 'volume_up' : 'volume_off';
      if (soundEnabled) playTechSound('click');
    });

    // --- SCROLL BEHAVIOR ---
    // Hide when scrolling or near footer, show when scroll stops
    let scrollTimeout;
    const footer = document.querySelector('footer');
    
    window.addEventListener('scroll', () => {
      // Hide widget visually during scroll
      widget.classList.add('translate-y-[150%]', 'opacity-0', 'pointer-events-none');
      widget.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      
      // Also hide the popover if it's open
      if (!popover.classList.contains('hidden')) {
        togglePopover();
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // When scroll stops, check if we are near the footer
        const isNearBottom = footer ? 
          (window.scrollY + window.innerHeight >= footer.offsetTop - 20) : 
          (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100);
          
        if (!isNearBottom) {
          widget.classList.remove('translate-y-[150%]', 'opacity-0', 'pointer-events-none');
          widget.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }
      }, 350);
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════
     4. HERO TERMINAL INTERACTIVE PIPELINE RUNNER (Multi-Scenario)
     ═══════════════════════════════════════════════ */
  function initTerminalSimulator() {
    const runBtn = document.getElementById('terminal-run-btn');
    const termCode = document.getElementById('terminal-code-body');
    const termStatus = document.getElementById('terminal-status-badge');
    const termLog = document.getElementById('terminal-footer-log');
    const copyBtn = document.getElementById('terminal-copy-btn');
    const toast = document.getElementById('tech-toast');
    const scenarioBadge = document.getElementById('terminal-scenario-badge');

    // Scenario definitions
    const SCENARIOS = {
      'filiais': {
        name: '36 Filiais em Lote',
        badge: 'Folder.Files • Lote',
        time: '1,2s',
        saving: '14h economizadas',
        mCode: `// 01. Consolidação Automática em Lote
let
    Fonte = Folder.Files("C:\\Relatorios\\Matriz_Vendas"),
    Parsed = Table.AddColumn(Fonte, "Dados", each Excel.Workbook([Content])),
    Filtrado = Table.SelectRows(Parsed, each ([Extension] = ".xlsx")),
    Tabela = Table.Combine(Filtrado[Dados]),
    Tipado = Table.TransformColumnTypes(Tabela, {{"Valor", Currency.Type}, {"ID", Int64.Type}})
in
    Tipado`,
        rawData: `// Amostra de Dados Brutos (36 arquivos despadronizados em rede)
[Arquivo 01]  FILIAL_SP_JAN.xlsx  | #N/D   | R$ 14.200,00 | Layout V1 (Coluna mesclada)
[Arquivo 02]  FILIAL_RJ_JAN.csv   | 29019  | NULL         | Erro de tipagem (Texto em valor)
[Arquivo 03]  FILIAL_MG_JAN.xlsx  | #REF!  | R$  9.850,50 | Layout V2 (3 colunas extras)
... (33 outros arquivos com nomes e estruturas variantes)`,
        cleanData: `// Tabela Normalizada em Memória (VertiPaq Engine • 14.820 Linhas)
ID_VENDA | FILIAL      | DATA_COMPETENCIA | VALOR_LIQUIDO | STATUS_CONCILIACAO
100491   | SP_MATRIZ   | 01/01/2025       | R$ 14.200,00  | ✓ VALIDADO
100492   | RJ_CAPITAL  | 02/01/2025       | R$  8.430,00  | ✓ VALIDADO
100493   | MG_CENTRO   | 03/01/2025       | R$  9.850,50  | ✓ VALIDADO
... [14.817 linhas consolidadas em 1.2s sem abrir arquivo por arquivo!]`,
        steps: [
          { delay: 300, log: "Escaneando diretório de rede: 36 planilhas detectadas..." },
          { delay: 650, log: "Descompactando binários OpenXML e harmonizando colunas..." },
          { delay: 1000, log: "Tipagem estrita aplicada: integridade 100% garantida..." },
          { delay: 1250, log: "Pipeline concluído: 14.820 linhas consolidadas em 1,2s!" }
        ],
        summary: "36 arquivos unificados em lote"
      },
      'sap': {
        name: 'Limpeza ERP SAP / TOTVS',
        badge: 'Higienização & Unpivot',
        time: '0,9s',
        saving: '6h economizadas',
        mCode: `// 02. Higienização & Unpivot de ERP Corporativo
let
    Fonte = Excel.CurrentWorkbook(){[Name="Extracao_SAP"]}[Content],
    CabecalhoPromovido = Table.PromoteHeaders(Fonte, [PromoteAllScalars=true]),
    FiltroLixo = Table.SelectRows(CabecalhoPromovido, each not Text.StartsWith([Conta], "TOTAL")),
    PreenchidoAbaixo = Table.FillDown(FiltroLixo, {"Centro_Custo", "Filial"}),
    UnpivotMeses = Table.UnpivotOtherColumns(PreenchidoAbaixo, {"Centro_Custo", "Conta"}, "Mes", "Realizado")
in
    UnpivotMeses`,
        rawData: `// Amostra Bruta de ERP (Cabeçalhos repetidos e subtotais que quebram o Excel)
[Linha 1]  *** RELATÓRIO SAP R/3 - EMISSÃO 21/09/2025 - PÁGINA 1 ***
[Linha 2]  FILIAL: SP-01 (Célula Mesclada) | CENTRO_CUSTO: NULL
[Linha 3]  CONTA 4.1.01 | Jan: 12.000 | Fev: 14.500 | Mar: 11.200
[Linha 4]  TOTAL PARCIAL DO GRUPO: R$ 37.700 (Linha lixo que quebra média)
... (4.200 linhas de subtotal repetido a cada quebra de página)`,
        cleanData: `// Tabela Tabular Perfeita para Power BI (18.400 Registros)
CENTRO_CUSTO | CONTA_CONTABIL | COMPETENCIA | VALOR_REALIZADO | STATUS_LINHA
CC_ADMIN_SP  | 4.1.01         | Jan/2025    | R$ 12.000,00    | ✓ HIGIENIZADO
CC_ADMIN_SP  | 4.1.01         | Fev/2025    | R$ 14.500,00    | ✓ HIGIENIZADO
CC_ADMIN_SP  | 4.1.01         | Mar/2025    | R$ 11.200,00    | ✓ HIGIENIZADO
... [4.200 linhas de lixo eliminadas; pronto para tabela dinâmica e DAX]`,
        steps: [
          { delay: 250, log: "Lendo extração bruta do SAP: 4.200 linhas com poluição visual..." },
          { delay: 550, log: "Expurgando cabeçalhos repetidos e linhas de TOTAL..." },
          { delay: 800, log: "FillDown aplicado em Centro de Custo e Unpivot dinâmico..." },
          { delay: 950, log: "Concluído! Base higienizada e 100% tabular em 0,9s!" }
        ],
        summary: "4.200 linhas de lixo de ERP expurgadas"
      },
      'procv': {
        name: 'Substituto do PROCV (120k)',
        badge: 'NestedJoin & Buffer',
        time: '1,5s',
        saving: 'Zero travamentos',
        mCode: `// 03. Join Relacional Indexado de 120.000 Linhas
let
    Vendas = Table.Buffer(Excel.CurrentWorkbook(){[Name="Vendas_120k"]}[Content]),
    Produtos = Table.Buffer(Excel.CurrentWorkbook(){[Name="Cadastro_SKU"]}[Content]),
    JoinIndexado = Table.NestedJoin(Vendas, {"SKU"}, Produtos, {"SKU"}, "ProdInfo", JoinKind.LeftOuter),
    Expandido = Table.ExpandTableColumn(JoinIndexado, "ProdInfo", {"Margem_Pct", "Categoria"}),
    CalculoMargem = Table.AddColumn(Expandido, "Lucro_Liquido", each [Receita] * [Margem_Pct])
in
    CalculoMargem`,
        rawData: `// Cenário Tradicional de PROCV (Excel consome 100% de CPU e congela)
[Vendas 120.000 linhas]  SKU: 99402 | Qtd: 15 | =PROCV(A2; 'Cadastro'!A:D; 4; 0)
[Comportamento Excel]    Cálculo em 4 threads... Máquina travada há 6 minutos.
[Falhas Frequentes]      Coluna nova inserida na origem desloca índice e gera #REF!`,
        cleanData: `// Join Vetorial em 64-bit com Table.Buffer() (120.000 Linhas Conciliadas)
SKU   | FILIAL | RECEITA_BRUTA | CATEGORIA_PROD | MARGEM_PCT | LUCRO_LIQUIDO
99402 | SP-01  | R$ 4.500,00   | Industrial     | 32.0%      | R$ 1.440,00
99403 | RJ-02  | R$ 1.200,00   | Consumo        | 18.5%      | R$   222,00
99404 | MG-01  | R$ 7.800,00   | Eletrônicos    | 25.0%      | R$ 1.950,00
... [120.000 linhas cruzadas em 1.5s sem NENHUMA fórmula na célula!]`,
        steps: [
          { delay: 350, log: "Alocando 120.000 linhas em memória com Table.Buffer()..." },
          { delay: 800, log: "Construindo tabela hash de alta densidade no M-Engine..." },
          { delay: 1200, log: "Executando LeftOuter Join vetorial em 64-bit..." },
          { delay: 1500, log: "Sucesso! 120.000 linhas conciliadas em 1,5s com 0 travamento!" }
        ],
        summary: "120.000 linhas cruzadas sem fórmulas lentas"
      }
    };

    let activeScenarioKey = 'filiais';
    let activeTabKey = 'm-code';

    // Scenario Selector buttons
    const scenarioBtns = document.querySelectorAll('[data-scenario-btn]');
    const tabBtns = document.querySelectorAll('[data-term-tab]');

    function renderCurrentView() {
      const scenario = SCENARIOS[activeScenarioKey];
      if (!scenario || !termCode) return;

      if (scenarioBadge) {
        scenarioBadge.textContent = scenario.badge;
      }

      if (termStatus) {
        termStatus.innerHTML = `
          <span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
          <span class="text-[11px] font-mono text-primary-container">Pronto (${scenario.time})</span>
        `;
      }

      if (termLog) {
        termLog.innerHTML = `
          <span class="material-symbols-outlined text-primary-container text-sm">info</span>
          <span>Exemplo carregado: <strong class="text-on-surface">${scenario.name}</strong></span>
        `;
      }

      if (activeTabKey === 'm-code') {
        renderHighlightedCode(scenario.mCode);
      } else if (activeTabKey === 'raw-data') {
        termCode.innerHTML = `<pre class="font-mono text-xs leading-relaxed text-amber-200/70 whitespace-pre-wrap">${escapeHtml(scenario.rawData)}</pre>`;
      } else if (activeTabKey === 'clean-data') {
        termCode.innerHTML = `<pre class="font-mono text-xs leading-relaxed text-green-300/85 whitespace-pre-wrap">${escapeHtml(scenario.cleanData)}</pre>`;
      }
    }

    function renderHighlightedCode(rawM) {
      if (!termCode) return;
      const escaped = escapeHtml(rawM);
      // Basic syntax highlighting for M-code
      const highlighted = escaped
        .replace(/\b(let|in|each|if|then|else|as|meta|type|try|otherwise)\b/g, '<span class="code-keyword">$1</span>')
        .replace(/(Folder\.Files|Excel\.Workbook|Table\.\w+|Json\.\w+|Web\.\Contents|Text\.\w+|Splitter\.\w+)/g, '<span class="code-variable">$1</span>')
        .replace(/(".*?")/g, '<span class="code-string">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>');
      termCode.innerHTML = `<div class="font-mono text-[12px] leading-[1.65] space-y-0.5 whitespace-pre-wrap">${highlighted}</div>`;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Scenario Switching
    scenarioBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.scenarioBtn;
        if (SCENARIOS[key]) {
          activeScenarioKey = key;
          scenarioBtns.forEach((b) => {
            b.classList.remove('bg-primary-container', 'text-on-primary', 'font-bold', 'border-primary-container');
            b.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border-outline-variant/30');
          });
          btn.classList.add('bg-primary-container', 'text-on-primary', 'font-bold', 'border-primary-container');
          btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border-outline-variant/30');

          renderCurrentView();
          playTechSound('click');
        }
      });
    });

    // Tab Switching
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => {
          b.classList.remove('bg-surface-container-high', 'text-primary', 'border-primary-container/40');
          b.classList.add('text-on-surface-variant', 'border-transparent');
        });
        btn.classList.add('bg-surface-container-high', 'text-primary', 'border-primary-container/40');
        btn.classList.remove('text-on-surface-variant', 'border-transparent');

        activeTabKey = btn.dataset.termTab;
        renderCurrentView();
        playTechSound('click');
      });
    });

    // Copy M-Code button
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const scenario = SCENARIOS[activeScenarioKey];
        navigator.clipboard.writeText(scenario.mCode).then(() => {
          showToast(`✓ Código M (${scenario.name}) copiado!`);
          playTechSound('click');
        }).catch(() => {
          showToast('Código pronto para uso no Power Query.');
        });
      });
    }

    function showToast(msg) {
      if (!toast) return;
      const msgEl = document.getElementById('tech-toast-msg');
      if (msgEl) {
        msgEl.textContent = msg;
      } else {
        toast.textContent = msg;
      }
      toast.classList.remove('hidden', 'opacity-0');
      toast.classList.add('opacity-100');
      setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
      }, 3000);
    }

    // Run Pipeline Simulation
    let isRunning = false;
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;

        const scenario = SCENARIOS[activeScenarioKey];
        playTechSound('scan');
        runBtn.disabled = true;
        runBtn.classList.add('opacity-70', 'cursor-not-allowed');

        const originalBtnHtml = runBtn.innerHTML;
        runBtn.innerHTML = `
          <span class="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
          <span>Processando ${scenario.name}...</span>
        `;

        if (termStatus) {
          termStatus.innerHTML = `
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
            <span class="text-[11px] font-mono text-primary-container">Executando M-Engine...</span>
          `;
        }

        scenario.steps.forEach((step, idx) => {
          setTimeout(() => {
            if (termLog) {
              termLog.innerHTML = `
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-container text-sm">autorenew</span>
                  <span class="text-primary font-mono text-xs">${step.log}</span>
                </div>
              `;
            }
            playTechSound('click');

            // Final step
            if (idx === scenario.steps.length - 1) {
              setTimeout(() => {
                // Switch to clean-data tab to show the results
                activeTabKey = 'clean-data';
                tabBtns.forEach((b) => {
                  b.classList.remove('bg-surface-container-high', 'text-primary', 'border-primary-container/40');
                  b.classList.add('text-on-surface-variant', 'border-transparent');
                  if (b.dataset.termTab === 'clean-data') {
                    b.classList.add('bg-surface-container-high', 'text-primary', 'border-primary-container/40');
                    b.classList.remove('text-on-surface-variant', 'border-transparent');
                  }
                });
                renderCurrentView();

                if (termStatus) {
                  termStatus.innerHTML = `
                    <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span class="text-[11px] font-mono text-green-400">Concluído em ${scenario.time}</span>
                  `;
                }
                if (termLog) {
                  termLog.innerHTML = `
                    <div class="flex items-center justify-between w-full">
                      <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-green-400 text-sm">verified</span>
                        <span class="text-on-surface font-mono text-xs">${scenario.summary}</span>
                      </div>
                      <span class="text-primary-container font-mono text-xs font-bold">${scenario.saving}</span>
                    </div>
                  `;
                }

                playTechSound('success');
                showToast(`🚀 ${scenario.name} executado com sucesso em ${scenario.time}!`);

                runBtn.disabled = false;
                runBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                runBtn.innerHTML = originalBtnHtml;
                isRunning = false;
              }, 250);
            }
          }, step.delay);
        });
      });
    }

    // Initial render
    renderCurrentView();
  }

  /* ═══════════════════════════════════════════════
     5. INTERACTIVE ROI CALCULATOR
     ═══════════════════════════════════════════════ */
  function initRoiCalculator() {
    const hoursSlider = document.getElementById('calc-hours');
    const teamSlider = document.getElementById('calc-team');
    const hoursDisplay = document.getElementById('calc-hours-val');
    const teamDisplay = document.getElementById('calc-team-val');
    const savedHoursDisplay = document.getElementById('calc-saved-hours');
    const savedMoneyDisplay = document.getElementById('calc-saved-money');

    if (!hoursSlider || !teamSlider) return;

    function recalculate() {
      const hoursPerWeek = parseInt(hoursSlider.value, 10);
      const teamSize = parseInt(teamSlider.value, 10);

      if (hoursDisplay) hoursDisplay.textContent = `${hoursPerWeek}h / semana`;
      if (teamDisplay) teamDisplay.textContent = `${teamSize} ${teamSize === 1 ? 'analista' : 'analistas'}`;

      // 52 weeks per year. Power Query automates ~92% of repetitive data munging time.
      const totalHoursWasted = hoursPerWeek * teamSize * 52;
      const hoursSavedPerYear = Math.round(totalHoursWasted * 0.92);

      // Average analyst cost in Brazil: ~R$ 45/hour loaded cost
      const moneySavedPerYear = Math.round(hoursSavedPerYear * 45);

      if (savedHoursDisplay) {
        savedHoursDisplay.textContent = `+${hoursSavedPerYear.toLocaleString('pt-BR')}h`;
      }
      if (savedMoneyDisplay) {
        savedMoneyDisplay.textContent = `R$ ${moneySavedPerYear.toLocaleString('pt-BR')}`;
      }
    }

    hoursSlider.addEventListener('input', recalculate);
    teamSlider.addEventListener('input', recalculate);
    recalculate();
  }

  /* ═══════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════ */
  function init() {
    createBeeBotWidget();
    initTerminalSimulator();
    initRoiCalculator();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
