# Graph Report - BEEQUERY  (2026-09-23)

## Corpus Check
- 8 files · ~17,217 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 77 nodes · 92 edges · 7 communities
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6275e52`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src/index.js
- package.json
- BeeQuery Backend 🐝
- dependencies
- animations.js
- initTerminalSimulator
- vercel.json

## God Nodes (most connected - your core abstractions)
1. `init()` - 7 edges
2. `initTerminalSimulator()` - 7 edges
3. `playTechSound()` - 5 edges
4. `createBeeBotWidget()` - 5 edges
5. `BeeQuery Backend 🐝` - 5 edges
6. `initMobileMenu()` - 4 edges
7. `init()` - 4 edges
8. `Configuração` - 4 edges
9. `scripts` - 3 edges
10. `express` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "src/index.js"
Cohesion: 0.15
Nodes (11): app, cors, express, app, cors, express, path, publicPath (+3 more)

### Community 1 - "package.json"
Cohesion: 0.12
Nodes (16): description, devDependencies, nodemon, engines, node, license, main, name (+8 more)

### Community 2 - "BeeQuery Backend 🐝"
Cohesion: 0.22
Nodes (8): 1. Instale as dependências, 2. Configure as variáveis de ambiente, 3. Rodando, BeeQuery Backend 🐝, Configuração, Deploy sugerido, Estrutura, Rotas disponíveis

### Community 3 - "dependencies"
Cohesion: 0.33
Nodes (6): dependencies, cheerio, cors, dotenv, express, @vercel/analytics

### Community 4 - "animations.js"
Cohesion: 0.24
Nodes (8): animateCounter(), init(), initAccordion(), initCounters(), initFooterYear(), initMobileMenu(), initNavbarScroll(), initScrollReveal()

### Community 7 - "initTerminalSimulator"
Cohesion: 0.26
Nodes (11): createBeeBotWidget(), togglePopover(), updateTip(), getAudioContext(), init(), initRoiCalculator(), initTerminalSimulator(), escapeHtml() (+3 more)

### Community 9 - "vercel.json"
Cohesion: 0.50
Nodes (3): cleanUrls, rewrites, version

## Knowledge Gaps
- **36 isolated node(s):** `app`, `name`, `version`, `description`, `main` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 43 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `src/index.js` to `package.json`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `cors` connect `src/index.js` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `app`, `name`, `version` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._