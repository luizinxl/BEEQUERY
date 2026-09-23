# Graph Report - BEEQUERY  (2026-09-19)

## Corpus Check
- 7 files · ~13,839 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .example 1, (none) 1, .ico 1)

## Summary
- 52 nodes · 50 edges · 11 communities (7 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e743a47c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- src/index.js
- package.json
- BeeQuery Backend 🐝
- dependencies
- scripts
- devDependencies
- engines
- redirect.js
- vercel.json
- api/index.js

## God Nodes (most connected - your core abstractions)
1. `BeeQuery Backend 🐝` - 5 edges
2. `Configuração` - 4 edges
3. `scripts` - 3 edges
4. `express` - 3 edges
5. `cors` - 2 edges
6. `engines` - 2 edges
7. `app` - 1 edges
8. `main` - 1 edges
9. `dev` - 1 edges
10. `@vercel/analytics` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 3 thin omitted)

### Community 0 - "src/index.js"
Cohesion: 0.25
Nodes (7): cors, app, cors, express, path, publicPath, redirectRoutes

### Community 1 - "package.json"
Cohesion: 0.20
Nodes (9): description, license, main, name, version, cheerio, dotenv, nodemon (+1 more)

### Community 2 - "BeeQuery Backend 🐝"
Cohesion: 0.22
Nodes (8): 1. Instale as dependências, 2. Configure as variáveis de ambiente, 3. Rodando, BeeQuery Backend 🐝, Configuração, Deploy sugerido, Estrutura, Rotas disponíveis

### Community 3 - "dependencies"
Cohesion: 0.33
Nodes (6): dependencies, cheerio, cors, dotenv, express, @vercel/analytics

### Community 4 - "scripts"
Cohesion: 0.67
Nodes (3): scripts, dev, start

### Community 8 - "redirect.js"
Cohesion: 0.50
Nodes (3): express, express, router

### Community 9 - "vercel.json"
Cohesion: 0.50
Nodes (3): cleanUrls, rewrites, version

## Knowledge Gaps
- **36 isolated node(s):** `app`, `name`, `version`, `description`, `main` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 39 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `express` connect `redirect.js` to `src/index.js`, `package.json`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `cors` connect `src/index.js` to `package.json`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `app`, `name`, `version` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._