"use client";

import { useMemo, useState } from "react";

type Edge = [number, number];
type Example = { name: string; vertices: number; edges: Edge[]; forced: Edge[]; note: string };
type CountResult = { two_factors: number; hamiltonian: number; histogram: Record<string, number> };
type PyodideRuntime = {
  runPython: (source: string) => unknown;
  globals: { set: (name: string, value: unknown) => void };
};

declare global {
  interface Window { loadPyodide?: (options: { indexURL: string }) => Promise<PyodideRuntime>; }
}

const examples: Example[] = [
  { name: "Ladder", vertices: 6, edges: [[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]], forced: [[0,1],[2,5],[3,4]], note: "The forced edges touch every vertex; exactly one qualifying two-factor is Hamiltonian." },
  { name: "Two cycles", vertices: 8, edges: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[1,5]], forced: [[0,1],[2,3],[4,5],[6,7]], note: "The qualifying two-factor has two components, so the corresponding filling is rejected." },
  { name: "Ring + chords", vertices: 8, edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,4],[2,6]], forced: [[0,1],[2,3],[4,5],[6,7]], note: "Python checks every edge subset while preserving the marked forced edges." },
];

const python = String.raw`
def analyze(n, edges, forced):
    forced = {tuple(sorted(e)) for e in forced}
    factors = []
    for mask in range(1 << len(edges)):
        chosen = [tuple(edges[i]) for i in range(len(edges)) if mask >> i & 1]
        if not forced.issubset({tuple(sorted(e)) for e in chosen}):
            continue
        degree = [0] * n
        for a, b in chosen:
            degree[a] += 1; degree[b] += 1
        if degree != [2] * n:
            continue
        adj = [[] for _ in range(n)]
        for a, b in chosen:
            adj[a].append(b); adj[b].append(a)
        seen, components = set(), 0
        for v in range(n):
            if v not in seen:
                components += 1; stack = [v]; seen.add(v)
                while stack:
                    x = stack.pop()
                    for y in adj[x]:
                        if y not in seen: seen.add(y); stack.append(y)
        factors.append(components)
    return {
        "two_factors": len(factors),
        "hamiltonian": sum(c == 1 for c in factors),
        "histogram": {k: factors.count(k) for k in sorted(set(factors))},
    }
`;

const edgeKey = ([a,b]: Edge) => `${Math.min(a,b)}-${Math.max(a,b)}`;

export default function App() {
  const [example, setExample] = useState(0);
  const [status, setStatus] = useState("Python is loaded only when you run the example.");
  const [result, setResult] = useState<CountResult | null>(null);
  const graph = examples[example];
  const forced = new Set(graph.forced.map(edgeKey));
  const positions = useMemo(() => Array.from({ length: graph.vertices }, (_, i) => {
    const angle = Math.PI * 2 * i / graph.vertices - Math.PI / 2;
    return { x: 150 + 112 * Math.cos(angle), y: 150 + 112 * Math.sin(angle) };
  }), [graph]);

  async function runPython() {
    try {
      setStatus("Loading CPython through Pyodide…");
      if (!window.loadPyodide) await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Pyodide failed to load"));
        document.head.appendChild(script);
      });
      const py = await window.loadPyodide!({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/" });
      py.runPython(python);
      py.globals.set("n_js", graph.vertices);
      py.globals.set("edges_js", graph.edges);
      py.globals.set("forced_js", graph.forced);
      const raw = py.runPython("import json; json.dumps(analyze(n_js, edges_js.to_py(), forced_js.to_py()))") as string;
      setResult(JSON.parse(raw));
      setStatus("Computed locally with Python; no graph data left this page.");
    } catch {
      setStatus("Python could not load. Check the network connection and try again.");
    }
  }

  return <>
    <header className="site-header">
      <a className="wordmark" href="#top">MacroMosaic</a>
      <nav aria-label="Page sections"><a href="#abstract">Abstract</a><a href="#results">Results</a><a href="#demo">Demo</a><a href="#reproduce">Reproduce</a></nav>
    </header>

    <main id="top" className="paper-page">
      <section className="paper-heading">
        <p className="venue-line">Computational topology · research artifact · August 2026</p>
        <h1>Complexity and Decidability Frontiers for Raw Standard-Eleven Knot-Mosaic Completion</h1>
        <p className="authors">Anonymous authors</p>
        <p className="affiliation">Manuscript prepared for journal review</p>
        <div className="paper-links">
          <a className="link-button primary" href="paper/main.pdf">Paper</a>
          <a className="link-button" href="paper/main.tex">LaTeX</a>
          <a className="link-button" href="https://github.com/zitterbewegung/macromosaic">Code</a>
          <a className="link-button" href="audit/KNOTWANG_PORTABLE_FINAL_REPORT.md">Canonical audit</a>
          <a className="link-button" href="audit/KNOTWANG_PORTABLE_CLAIMS.json">Claims</a>
        </div>
      </section>

      <section className="tldr" aria-label="Summary">
        <strong>TL;DR</strong>
        <p>Bounded raw seed completion is NP-complete, and crossing-blocked exact-core counting is parsimoniously #P-complete. The unbounded problem is only known to be NP-hard and r.e.; its signed-tangle frontier remains open from four strings onward.</p>
      </section>

      <section id="abstract" className="paper-section">
        <h2>Abstract</h2>
        <p>We study finite completion in the fixed eleven-tile Lomonaco–Kauffman knot-mosaic model with a finite microscopic seed as the only input. A direct Hamiltonian compiler proves NP-completeness of the seed-bounded language <code>BKW11_U</code>. A separate forced-edge compiler proves parsimonious #P-completeness for crossing-blocked, seed-recovered exact-core counting. A frozen tile-0 moat makes the bounded construction sound over every larger containing rectangle.</p>
        <p>These theorems do not classify existentially unbounded completion. That language is NP-hard and recursively enumerable, but NP membership, r.e.-hardness, and r.e.-completeness are not established. The fragment with no frozen signed crossing is decidable. General instances reduce to relative signed-tangle completion, which is r.e. for every finite string number, decidable for one to three strings, and open for four or more. In genus at least three there is one hyperelliptic conjugacy class; the missing step is extension over a fixed complementary handlebody, equivalently equivariant embedding of the prescribed branched-cover pair.</p>
      </section>

      <section id="results" className="paper-section">
        <h2>Canonical result map</h2>
        <p className="section-intro">The bounded decision problem, the finite-core counting problem, and the unbounded decision problem are different objects.</p>
        <div className="result-map" role="list">
          <div className="result-row" role="listitem"><div><span className="tag proved">Proved</span><h3>Bounded raw decision</h3><code>BKW11_U</code></div><p><strong>NP-complete.</strong> The accepting area is at most <code>max(1, |dom(s)|)²</code>, derived from the seed itself.</p></div>
          <div className="result-row" role="listitem"><div><span className="tag proved">Proved</span><h3>Exact-core counting</h3><code>#CB-RKW11_U</code></div><p><strong>Parsimoniously #P-complete.</strong> The recovered polynomial core has a frozen blank boundary, at least one frozen nonblank interior tile, no frozen tile 9 or 10, and a blocked side at every hole. Counts are modulo exterior blank padding.</p></div>
          <div className="result-row" role="listitem"><div><span className="tag partial">Partial</span><h3>Unbounded raw decision</h3><code>UKW11_U</code></div><p><strong>NP-hard and r.e.</strong> No NP upper bound, r.e.-hardness, or r.e.-completeness theorem is claimed.</p></div>
          <div className="result-row" role="listitem"><div><span className="tag proved">Proved</span><h3>No frozen signed crossing</h3><code>{"seed ⊂ {0,…,8}"}</code></div><p><strong>Decidable.</strong> Unseeded cells may still choose either signed crossing tile.</p></div>
          <div className="result-row" role="listitem"><div><span className="tag proved">Proved</span><h3>Signed tangles, 1–3 strings</h3><code>boundary genus ≤ 2</code></div><p><strong>R.e. for every finite string number; decidable for one to three.</strong> Ordinary embedding is sufficient in these low genera.</p></div>
          <div className="result-row open-row" role="listitem"><div><span className="tag open">Open</span><h3>Signed tangles, ≥4 strings</h3><code>boundary genus ≥ 3</code></div><p><strong>Equivariant embedding remains open.</strong> The issue is extension over the fixed handlebody, not multiple hyperelliptic conjugacy classes.</p></div>
        </div>
      </section>

      <section className="paper-section">
        <h2>Two microscopic compilers</h2>
        <div className="method-grid">
          <article><p className="method-label">Decision theorem</p><h3>Directed cycle covers</h3><ol><li>Split each directed vertex into forced in/out junctions.</li><li>Propagate one Boolean choice along each optional corridor.</li><li>Identify one mosaic component with one Hamiltonian cover cycle.</li><li>Use the blank moat to block every exterior bypass.</li></ol></article>
          <article><p className="method-label">Counting theorem</p><h3>Forced-edge two-factors</h3><ol><li>Freeze marked graph edges as path corridors.</li><li>Let each free vertex choose its unique degree-two tile.</li><li>Obtain one filling for each spanning two-factor.</li><li>Count one-cycle factors as crossing-free unknots.</li></ol></article>
        </div>
        <p className="scope-note"><strong>Model note.</strong> The earlier PF-3SAT atom/parser/copy architecture was superseded for bounded hardness. Its literal open lemmas were not retroactively proved.</p>
      </section>

      <section id="demo" className="paper-section">
        <h2>Browser verification example</h2>
        <p className="section-intro">This small demonstrator illustrates the forced-edge two-factor bijection used by the counting theorem. It is not a substitute for the symbolic proof.</p>
        <div className="example-tabs" role="tablist" aria-label="Graph examples">{examples.map((item, i) => <button role="tab" aria-selected={i === example} className={i === example ? "selected" : ""} key={item.name} onClick={() => { setExample(i); setResult(null); }}>{item.name}</button>)}</div>
        <div className="demo-panel">
          <div className="graph-panel">
            <svg viewBox="0 0 300 300" role="img" aria-label={`${graph.name} forced-edge graph`}>
              {graph.edges.map((edge, i) => { const [a,b] = edge; return <line className={forced.has(edgeKey(edge)) ? "forced-edge" : "optional-edge"} key={i} x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y}/>; })}
              {positions.map((p, i) => <g key={i}><circle cx={p.x} cy={p.y} r="13"/><text x={p.x} y={p.y + 4}>{i}</text></g>)}
            </svg>
            <div className="legend"><span><i className="forced-swatch"/>forced</span><span><i className="optional-swatch"/>optional</span></div>
            <p>{graph.note}</p>
          </div>
          <div className="python-panel">
            <div className="code-heading"><span>Python / Pyodide</span><span>runs locally</span></div>
            <pre>{`analyze(\n  n=${graph.vertices},\n  edges=${JSON.stringify(graph.edges)},\n  forced=${JSON.stringify(graph.forced)}\n)`}</pre>
            <button className="run-button" onClick={runPython}>Run exact enumeration</button>
            <p className="runtime-status" aria-live="polite">{status}</p>
            {result && <div className="count-output"><div><strong>{result.two_factors}</strong><span>qualifying two-factors</span></div><div><strong>{result.hamiltonian}</strong><span>one-cycle fillings</span></div><p>Component histogram: <code>{JSON.stringify(result.histogram)}</code></p></div>}
          </div>
        </div>
      </section>

      <section className="paper-section frontier">
        <h2>What remains open</h2>
        <p>For four or more strings, the double branched cover has boundary genus at least three. Hyperelliptic involutions have one conjugacy class in each such genus, but that fact does not decide whether the prescribed deck involution extends over the particular complementary handlebody produced by an ordinary embedding. The corresponding equivariant <code>S³</code>-embedding problem remains open.</p>
        <p>Separately, proving or refuting r.e.-hardness or r.e.-completeness of unrestricted unbounded raw completion remains future work. The bounded firewall construction cannot establish it because a total computable witness bound yields a decidable reduction image.</p>
      </section>

      <section id="reproduce" className="paper-section">
        <h2>Reproducibility</h2>
        <p>The canonical validator reports 33 completion claims: 27 proved, two conditional, one finite regression, and three open; it also checks five former-open crosswalk entries and reproduces six result files byte-for-byte.</p>
        <pre className="command-block"><code>python3 completion/code/validate_completion.py{`\n`}python3 -O completion/code/validate_completion.py</code></pre>
        <p className="quiet">Finite tests check the implementations. The all-size bounded and exact-core results rely on the symbolic corridor, junction, firewall, and bijection proofs.</p>
      </section>

      <section className="paper-section citation-section">
        <h2>Citation and audit record</h2>
        <p>The manuscript is anonymous pending submission metadata. Until author information and an archival identifier are supplied, cite the canonical report by title, version, and date rather than inventing bibliographic fields.</p>
        <div className="record-links"><a href="paper/main.pdf">Download manuscript PDF</a><a href="audit/KNOTWANG_PORTABLE_FINAL_REPORT.md">Read canonical theorem report</a><a href="audit/KNOTWANG_PORTABLE_CLAIMS.json">Inspect machine-readable claims</a></div>
      </section>
    </main>

    <footer className="page-footer"><p>MacroMosaic · canonical status reconciled 14 August 2026</p><a href="https://github.com/zitterbewegung/macromosaic">GitHub repository</a></footer>
  </>;
}
