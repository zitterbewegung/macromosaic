from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "paper"
OUT.mkdir(parents=True, exist_ok=True)
source = (OUT / "manuscript.md").read_text()

def inline(s: str) -> str:
    s = s.replace("∎", r"\hfill$\square$")
    s = re.sub(r"\*\*([^*]+)\*\*", r"\\textbf{\1}", s)
    s = re.sub(r"\[([^]]+)\]\((https?://[^)]+)\)", r"\\href{\2}{\1}", s)
    def code(m):
        value=m.group(1)
        for old,new in [("\\",r"\textbackslash{}"),("_",r"\_"),("#","@@HASH@@"),("%",r"\%"),("&",r"\&"),("^",r"\^{}"),("{",r"\{"),("}",r"\}")]: value=value.replace(old,new)
        return r"\texttt{"+value+"}"
    s = re.sub(r"`([^`]+)`", code, s)
    s = s.replace("#P", r"\#P").replace("@@HASH@@",r"\#")
    return s

lines = source.splitlines()[1:]
body=[]; in_math=False; list_kind=None
for raw in lines:
    line=raw.rstrip()
    if line == r"\[": in_math=True; body.append(line); continue
    if line == r"\]": in_math=False; body.append(line); continue
    if in_math: body.append(line); continue
    m=re.match(r"^(#{2,3}) (.*)", line)
    if m:
        if list_kind: body.append(r"\end{"+list_kind+"}"); list_kind=None
        cmd="section" if len(m.group(1))==2 else "subsection"
        title=re.sub(r"^(Lemma|Theorem|Corollary) \d+\.\d+", r"\1", m.group(2))
        body.append("\\"+cmd+"{"+inline(title)+"}"); continue
    num=re.match(r"^\d+\. (.*)",line); bullet=re.match(r"^- (.*)",line)
    if num or bullet:
        kind="enumerate" if num else "itemize"
        if list_kind!=kind:
            if list_kind: body.append(r"\end{"+list_kind+"}")
            body.append(r"\begin{"+kind+"}"); list_kind=kind
        body.append(r"\item "+inline((num or bullet).group(1))); continue
    if list_kind and not line.startswith("  "):
        body.append(r"\end{"+list_kind+"}"); list_kind=None
    if not line: body.append(""); continue
    if line.startswith("**") and line.endswith("**"): body.append(r"\textbf{"+inline(line[2:-2])+"}"); continue
    body.append(inline(line))
if list_kind: body.append(r"\end{"+list_kind+"}")

abstract_start = next(i for i,x in enumerate(body) if x.strip()==r"\section{Abstract}")
intro_start = next(i for i,x in enumerate(body) if x.strip().startswith(r"\section{1. Introduction}"))
abstract = "\n".join(body[abstract_start+1:intro_start]).strip()
rest = body[intro_start:]
rest = [re.sub(r"\\(section|subsection)\{\d+\.\s*", r"\\\1{", x) for x in rest]

header=r'''\documentclass[11pt]{article}
\usepackage[margin=1in]{geometry}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{lmodern,microtype,amsmath,amssymb,mathtools}
\usepackage{enumitem,xcolor,booktabs}
\usepackage[colorlinks=true,linkcolor=black,citecolor=teal!60!black,urlcolor=teal!60!black]{hyperref}
\setlist{nosep,leftmargin=1.5em}
\newcommand{\SpanP}{\mathsf{SpanP}}
\newcommand{\UP}{\mathsf{UP}}
\title{Counting Fixed-Knot Completions in the Standard-Eleven Mosaic Model}
\author{Anonymous Authors}
\date{Manuscript prepared August 2026}
\begin{document}
\maketitle
\begin{abstract}
'''
footer=r'''
\section*{Data and code availability}
The accompanying repository contains claim registries, machine-readable witnesses, independent finite regressions, and a browser-native Pyodide demonstrator. The paper distinguishes finite computational checks from the symbolic arguments proving the all-size statements.
\section*{Declarations}
The authors declare no competing interests. Author identities, affiliations, funding, and acknowledgments are intentionally left blank for journal submission preparation.
\nocite{*}
\bibliographystyle{plain}
\bibliography{references}
\end{document}
'''
(OUT/"main.tex").write_text(header+abstract+"\n\\end{abstract}\n"+"\n".join(rest)+footer)
