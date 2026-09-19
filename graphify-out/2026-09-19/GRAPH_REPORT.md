# Graph Report - BEEQUERY  (2026-09-19)

## Corpus Check
- 5 files · ~10,250 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .example 1, (none) 1)

## Summary
- 42 nodes · 41 edges · 8 communities (5 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8c5ff689`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- index.js
- package.json
- BeeQuery Backend 🐝
- dependencies
- scripts
- devDependencies
- engines

## God Nodes (most connected - your core abstractions)
1. `BeeQuery Backend 🐝` - 5 edges
2. `Configuração` - 4 edges
3. `scripts` - 3 edges
4. `express` - 3 edges
5. `cors` - 2 edges
6. `engines` - 2 edges
7. `main` - 1 edges
8. `dev` - 1 edges
9. `cheerio` - 1 edges
10. `cheerio` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 2 thin omitted)

### Community 0 - "index.js"
Cohesion: 0.22
Nodes (8): cors, express, app, cors, express, redirectRoutes, express, router

### Community 1 - "package.json"
Cohesion: 0.22
Nodes (8): description, license, main, name, version, cheerio, dotenv, nodemon

### Community 2 - "BeeQuery Backend 🐝"
Cohesion: 0.22
Nodes (8): 1. Instale as dependências, 2. Configure as variáveis de ambiente, 3. Rodando, BeeQuery Backend 🐝, Configuração, Deploy sugerido, Estrutura, Rotas disponíveis

### Community 3 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, cheerio, cors, dotenv, express

### Community 4 - "scripts"
Cohesion: 0.67
Nodes (3): scripts, dev, start

## Knowledge Gaps
- **28 isolated node(s):** `name`, `version`, `description`, `main`, `start` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 31 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `index.js` to `package.json`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._