# MacroMosaic

MacroMosaic is the public research companion for **Counting Fixed-Knot Completions in the Standard-Eleven Mosaic Model**. It combines a journal-style paper with a browser-native Python demonstrator for the exact counting core.

## Main result

On a polynomially recognizable crossing-blocked class of raw standard-eleven mosaic seeds, counting one-component unknot completions is parsimoniously `#P`-complete. The reduction is microscopic: optional corridors are Boolean, vertices select degree two, and strand components coincide with cycles of a spanning two-factor. The manuscript also extends the result to every fixed classical knot and identifies the unrestricted `SpanP/UP` boundary.

The website deliberately does not present the earlier carrier-phase architecture as solved; that construction remains outside the main theorem's scope.

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

The interactive explorer downloads Pyodide on first use, then runs its counting algorithm entirely in the browser.

## Build

```bash
npm run build          # full vinext production build
npm run build:pages    # static GitHub Pages build
```

The GitHub Actions workflow publishes `dist-pages` whenever `main` is pushed. In repository settings, choose **GitHub Actions** as the Pages source.

## Paper

- `public/paper/main.pdf` — compiled manuscript
- `public/paper/main.tex` — editable LaTeX
- `public/paper/manuscript.md` — canonical prose draft
- `public/paper/references.bib` — bibliography

The source preparation helper rebuilds the manuscript package from the audited research synthesis. Author names and affiliations remain anonymous placeholders until the submission team supplies them.

## Research integrity

The surrounding research workspace contains the proof, claim registries, prior-art search record, finite regressions, and reproducibility manifests. Finite computations validate implementation details; the all-size results rely on the symbolic corridor, vertex, bijection, and tag-erasure arguments.

## License

No license has been selected. Add one before public reuse is invited.
