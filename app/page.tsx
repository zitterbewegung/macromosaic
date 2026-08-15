"use client";
import {useMemo,useState} from "react";
type Edge=[number,number]; type Example={name:string;vertices:number;edges:Edge[];note:string};
declare global{interface Window{loadPyodide?:(o:{indexURL:string})=>Promise<any>}}
const examples:Example[]=[
 {name:"Ladder",vertices:6,edges:[[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]],note:"One Hamiltonian boundary cycle."},
 {name:"Double loop",vertices:8,edges:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[1,5]],note:"A disconnected two-factor, rejected by the one-component condition."},
 {name:"Grid ring",vertices:8,edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[0,4],[2,6]],note:"Several local choices, counted exactly in Python."}
];
const python=String.raw`
def analyze(n, edges):
 factors=[]
 for mask in range(1 << len(edges)):
  chosen=[edges[i] for i in range(len(edges)) if mask >> i & 1]
  degree=[0]*n
  for a,b in chosen: degree[a]+=1; degree[b]+=1
  if degree != [2]*n: continue
  adj=[[] for _ in range(n)]
  for a,b in chosen: adj[a].append(b); adj[b].append(a)
  seen=set(); components=0
  for v in range(n):
   if v not in seen:
    components+=1; stack=[v]; seen.add(v)
    while stack:
     x=stack.pop()
     for y in adj[x]:
      if y not in seen: seen.add(y); stack.append(y)
  factors.append(components)
 return {"two_factors":len(factors),"hamiltonian":sum(c==1 for c in factors),"histogram":{k:factors.count(k) for k in sorted(set(factors))}}
`;
export default function App(){
 const[example,setExample]=useState(0),[status,setStatus]=useState("Ready to run locally in your browser");
 const[result,setResult]=useState<{two_factors:number;hamiltonian:number;histogram:Record<string,number>}|null>(null),graph=examples[example];
 const positions=useMemo(()=>Array.from({length:graph.vertices},(_,i)=>{const a=Math.PI*2*i/graph.vertices-Math.PI/2;return{x:150+112*Math.cos(a),y:150+112*Math.sin(a)}}),[graph]);
 async function runPython(){setStatus("Loading Python…");if(!window.loadPyodide)await new Promise<void>((ok,bad)=>{const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";s.onload=()=>ok();s.onerror=()=>bad(new Error("Pyodide failed to load"));document.head.appendChild(s)});const py=await window.loadPyodide!({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"});py.runPython(python);py.globals.set("n_js",graph.vertices);py.globals.set("edges_js",graph.edges);const raw=py.runPython("import json; json.dumps(analyze(n_js, edges_js.to_py()))");setResult(JSON.parse(raw));setStatus("Computed entirely with Python + Pyodide")}
 return <main><nav><a href="#top" className="brand"><span>◌</span> MacroMosaic</a><div><a href="#result">Result</a><a href="#explorer">Explorer</a><a href="#paper">Paper</a></div></nav>
 <section className="hero" id="top"><div className="eyebrow">COMPUTATIONAL TOPOLOGY · EXACT COUNTING</div><h1>Counting knot-mosaic completions is <em>#P-complete.</em></h1><p className="lede">A microscopic, solution-bijective reduction turns forced-edge grid Hamiltonian cycles into completions of the standard eleven-tile mosaic model—without macrotiles, hidden role predicates, or certificate ambiguity.</p><div className="actions"><a className="primary" href="#explorer">Open the live proof object</a><a className="secondary" href="paper/main.pdf">Read the paper ↗</a></div><div className="metrics"><div><strong>#P</strong><span>parsimonious completeness</span></div><div><strong>11</strong><span>fixed microscopic tiles</span></div><div><strong>1 ↔ 1</strong><span>Hamiltonian cycles to unknots</span></div></div></section>
 <section className="claim" id="result"><div className="section-no">01 / MAIN RESULT</div><h2>Topology becomes a deterministic component count.</h2><div className="claim-grid"><p>On a polynomially recognizable crossing-blocked seed class, every legal filling is crossing-free. A completed mosaic is therefore an unknot exactly when it has one strand component.</p><blockquote>“Optional corridors are Boolean; vertex cells choose degree two; mosaic components are exactly two-factor cycles.”</blockquote></div></section>
 <section className="explorer" id="explorer"><div className="section-no">02 / BROWSER LAB</div><div className="explorer-head"><div><h2>Run the counting core.</h2><p>Select a graph. Python enumerates its spanning two-factors and separates the one-cycle witnesses counted by the theorem.</p></div><div className="tabs">{examples.map((x,i)=><button key={x.name} className={i===example?"active":""} onClick={()=>{setExample(i);setResult(null)}}>{x.name}</button>)}</div></div><div className="lab"><div className="graph"><svg viewBox="0 0 300 300" role="img" aria-label={`${graph.name} graph`}>{graph.edges.map(([a,b],i)=><line key={i} x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y}/>)}{positions.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="14"/><text x={p.x} y={p.y+4}>{i}</text></g>)}</svg><p>{graph.note}</p></div><div className="console"><div className="console-top"><span>PYODIDE / CPYTHON</span><i>● LOCAL</i></div><pre>{`analyze(n=${graph.vertices},\n  edges=${JSON.stringify(graph.edges)})`}</pre><button onClick={runPython}>Run exact count <span>→</span></button><small>{status}</small>{result&&<div className="output"><div><b>{result.two_factors}</b><span>two-factors</span></div><div><b>{result.hamiltonian}</b><span>one-cycle / unknot</span></div><p>component histogram {JSON.stringify(result.histogram)}</p></div>}</div></div></section>
 <section className="proof"><div className="section-no">03 / PROOF ARCHITECTURE</div><h2>Three local facts. One exact bijection.</h2><div className="steps"><article><b>1</b><h3>Propagate</h3><p>A blank-blocked corridor is either entirely empty or its unique path. One bit travels end to end.</p></article><article><b>2</b><h3>Select</h3><p>At every subcubic vertex, parity and a blocked side force a unique degree-two tile.</p></article><article><b>3</b><h3>Count</h3><p>Two-factors map to fillings with multiplicity one; a single cycle maps to a planar unknot.</p></article></div></section>
 <section className="paper" id="paper"><div><div className="section-no">04 / MANUSCRIPT</div><h2>A submission package built for computational topology.</h2><p>The manuscript states the finite counting convention precisely, proves the raw microscopic reduction, extends it to every fixed classical knot, and isolates the <span className="mono">SpanP / UP</span> boundary.</p><div className="actions"><a className="primary" href="paper/main.pdf">Download PDF</a><a className="secondary" href="paper/main.tex">LaTeX source</a></div></div><aside><span>TARGET VENUE</span><strong>Journal of Applied and<br/>Computational Topology</strong><hr/><span>ALSO APPROPRIATE</span><p>Journal of Knot Theory and Its Ramifications<br/>ACM Transactions on Computation Theory<br/>Computational Complexity</p></aside></section>
 <footer><div className="brand"><span>◌</span> MacroMosaic</div><p>Research artifact · Reproducible in the browser · 2026</p><a href="https://github.com/">Source on GitHub ↗</a></footer></main>}
