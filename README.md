# MacroMosaic

Research website and manuscript for **Complexity and Decidability Frontiers for Raw Standard-Eleven Knot-Mosaic Completion**.

> **TL;DR:** The seed-bounded raw language `BKW11_U` is NP-complete, and crossing-blocked exact-core counting is parsimoniously `#P`-complete. Existentially unbounded raw completion is NP-hard and recursively enumerable; its no-frozen-signed-crossing fragment is decidable. Relative signed-tangle completion is decidable for one to three strings and open for four or more.

## Canonical status

- **Proved:** `BKW11_U` is NP-complete with only a finite standard-eleven seed as input and area bound `max(1, |dom(s)|)^2`.
- **Proved:** crossing-blocked, seed-recovered exact-core counting is parsimoniously `#P`-complete.
- **Proved:** existentially unbounded raw completion is NP-hard and r.e.
- **Not established:** NP membership, r.e.-hardness, or r.e.-completeness for arbitrary unbounded seeds.
- **Proved:** seeds freezing only tiles `0,…,8` form a decidable unbounded fragment, although holes may use signed crossings.
- **Proved:** relative signed-tangle completion is r.e. for every finite string number and decidable for one, two, and three strings.
- **Open:** relative signed-tangle completion for `n ≥ 4`, equivalently prescribed-involution/equivariant `S³`-embeddability.
- **Superseded, not proved as stated:** the earlier protected-factor PF-3SAT atom/parser/copy architecture.

For boundary genus at least three, hyperelliptic involutions form one conjugacy class. The unresolved issue is extension over the particular complementary handlebody/equivariant embedding, not multiple conjugacy classes. Not every Knotwang open problem is solved.

The authoritative status sources are [`public/audit/KNOTWANG_PORTABLE_FINAL_REPORT.md`](public/audit/KNOTWANG_PORTABLE_FINAL_REPORT.md) and [`public/audit/KNOTWANG_PORTABLE_CLAIMS.json`](public/audit/KNOTWANG_PORTABLE_CLAIMS.json).

## Website

The site follows an academic paper-page structure: title and manuscript links, TL;DR, abstract, canonical result map, proof architecture, a small Pyodide verification example, open problems, and reproducibility instructions.

```bash
npm install
npm run dev
```

The interactive example downloads Pyodide on first use and runs its forced-edge two-factor enumeration locally in the browser.

## Build and deployment

```bash
npm run build          # vinext production build
npm run build:pages    # static GitHub Pages build
```

The GitHub Actions workflow deploys `dist-pages` from `main`.

## Paper

- `public/paper/main.pdf` — compiled anonymous manuscript
- `public/paper/main.tex` — editable LaTeX
- `public/paper/manuscript.md` — canonical manuscript prose
- `public/paper/references.bib` — bibliography

Rebuild the LaTeX source from the manuscript with `python3 scripts/prepare_paper.py`, then compile it with the standard LaTeX/BibTeX sequence.

## Validation

In the full research artifact:

```bash
python3 completion/code/validate_completion.py
python3 -O completion/code/validate_completion.py
```

Both runs report 33 completion claims: 27 proved, two conditional, one finite regression, and three open; five former-open crosswalk entries; and six byte-identical reproduced result files.

## License

No license has been selected. Add one before inviting public reuse.
