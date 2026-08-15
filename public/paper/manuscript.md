# Counting fixed-knot completions in the standard-eleven mosaic model

## Abstract

We study completion counting for the fixed eleven-tile
Lomonaco--Kauffman knot-mosaic alphabet.  An input is only a finite partial
assignment of ordinary microscopic tiles; every hole admits all eleven
tiles.  We define a polynomially recognizable crossing-blocked exact-core
class on which every legal one-component completion is automatically a
planar unknot.  By a solution-bijective reduction from maximum-degree-three
grid Hamiltonicity with marked forced edges, we prove that counting these
raw completions is `#P`-complete under parsimonious reductions.  The proof is
microscopic: optional corridors are Boolean, vertex cells select a unique
degree-two mask, and completed mosaic components are exactly the cycles of a
spanning two-factor.

For every fixed classical knot `J`, we then replace one forced corridor by a
frozen two-terminal long-knot diagram of `J`.  Every legal completion becomes
the split union of `J` with planar unknots, without changing a single free
choice.  Counting completions of knot type `J` is therefore parsimoniously
`#P`-complete in the raw unit-tile model.  On the same syntactic family,
Jones-polynomial equality with `V_J`, determinant equality with `det(J)`, and
positivity of the Jones value at `-1` select exactly the one-component
completions and are likewise parsimoniously complete.  These are counting
results over exponentially many completions; evaluating `V_L(-1)` for one
diagram remains polynomial-time.

We also identify the exact unrestricted boundary.  Exact-core raw unknot
counting is `#P`-hard and belongs to `SpanP`; it belongs to `#P` if and only if
mosaic unknot recognition belongs to `UP`.  Counting distinct blank-padded
rectangles is zero or infinite rather than a `#P` function.  Finally, the
guarded functions are fixed-parameter tractable by hole count and board width,
while an FPRAS would imply `NP=RP`.

## 1. Introduction

Knot mosaics encode link diagrams by the eleven oriented local tiles
introduced by Lomonaco and Kauffman.  Existing work establishes equivalence
with tame-knot theory after stabilization, develops mosaic and tile numbers,
enumerates small mosaics, and implements SAT/ALLSAT and modern SageMath tools.
The question here is different: how hard is it to count completions of a
partially frozen microscopic mosaic when the completed diagram must have one
specified topology?

There are two traps.  First, a role-labelled macrotile reduction does not
automatically prove a theorem about arbitrary unit-cell choices.  Second,
unknot recognition being in `NP` does not automatically put the number of
distinct unknot completions in `#P`: one diagram may have many accepting
topological certificates.  Our reduction avoids both issues.  Every hole is
a genuine unrestricted standard-eleven cell, while a local blocked-side guard
prevents all four-port tiles.  Thus topology collapses to a deterministic
component-count test on every input in the promised syntactic class.

The hardness source is the ASP-completeness theorem of the MIT Hardness Group
et al. for undirected maximum-degree-three grid Hamiltonicity.  ASP here is
the solution-bijection notion, not answer-set programming.  The constructive
proof supplies marked edges forced in every output solution.  Retaining those
marks gives exactly the local forcing needed at a mosaic vertex while
preserving the solution bijection.

The fixed-target extension is unusually clean.  A fixed long-knot tangle is
frozen into one already-forced corridor.  Replacing it by a boundary-parallel
arc preserves every component and every free tile choice.  With the tag
present, precisely one planar component is tied into `J`; all others remain
split unknots.  The result therefore covers every fixed classical knot and
also gives genuine Jones/determinant selectors without invoking the open
question whether the Jones polynomial detects the unknot.

### Contributions

1. A parsimonious `#P`-completeness theorem for raw standard-eleven
   one-component unknot completion on a polynomially recognizable domain.
2. A literal microscopic bijection with forced-edge spanning two-factors,
   including polynomial area, malformed inputs, and multiplicity one.
3. For every fixed knot `J`, a raw tagged theorem for knot type, Jones
   equality, determinant equality, and determinant positivity.
4. The exact `SpanP/UP` boundary for unrestricted exact-core unknot counting.
5. A proof that literal all-rectangle counting is zero or infinite.
6. Exact fixed-parameter algorithms and an FPRAS barrier.

## 2. Related work

Lomonaco--Kauffman introduced the fixed eleven-tile model
([2008](https://doi.org/10.1007/s11128-008-0076-7)); Kuriya--Shehab proved its
stable equivalence with tame knots
([2014](https://doi.org/10.1142/S0218216514500035)).  Mosaic-number and
enumeration foundations include Lee--Hong--Lee--Oh
([2014](https://doi.org/10.1142/S0218216514500692)) and
Oh--Hong--Lee--Lee
([2015](https://doi.org/10.1007/s11128-014-0895-7)).  Miller's SAT and ALLSAT
work ([2022](https://doi.org/10.1609/aaai.v36i11.21645),
[2023](https://doi.org/10.1609/aaai.v37i13.27002)) is the closest direct
computational predecessor, but does not prove fixed-knot completion hardness.
Heap et al. provide a current low-crossing tabulation
([2025](https://doi.org/10.2140/involve.2025.18.91)); Deng et al. provide the
2026 KnotMosaics SageMath package ([arXiv:2605.14189](https://arxiv.org/abs/2605.14189)).

Valiant introduced `#P`
([1979](https://doi.org/10.1137/0208032)).  Köbler--Schöning--Torán introduced
span functions, counting the distinct outputs of an NP transducer
([1989](https://doi.org/10.1007/BF00276023)).  That is the appropriate upper
bound when an object is guessed together with a potentially nonunique
certificate.  Unknot recognition is in `NP` by Hass--Lagarias--Pippenger
([1999](https://doi.org/10.1145/301970.301971)); Lackenby gives efficient
knottedness certificates ([2021](https://doi.org/10.1016/j.aim.2021.107796)).
Neither result supplies certificate uniqueness.

The source theorem is FUN 2024, Theorem 18
([DOI 10.4230/LIPIcs.FUN.2024.23](https://doi.org/10.4230/LIPIcs.FUN.2024.23));
the May 2026 full revision is [arXiv:2405.08377](https://arxiv.org/abs/2405.08377).
The latter updates authorship and puzzle applications; the proceedings result
is the peer-reviewed hardness source.

For the Jones consequences, Kauffman's state model supplies normalization
([1987](https://doi.org/10.1016/0040-9383(87)90009-7)), and Boninger gives a
recent direct Jones/Goeritz treatment of
`det(K)=|V_K(-1)|`
([2023](https://doi.org/10.1112/blms.12753)).  Our result does not contradict
the easy evaluation at `-1`: it counts completions satisfying that predicate.

No predecessor satisfying all of the following axes was located in the
documented primary-source search through 14 August 2026: fixed standard-eleven
library, raw partial-matrix input, exact one-component fixed-knot acceptance,
and a parsimonious counting reduction.  This is a corpus-scoped search result,
not an absolute priority claim.

## 3. Model and finite counting convention

Let `T={0,...,10}` be the oriented standard-eleven alphabet.  Tile `0` is
blank; tiles `1,...,6` have one noncrossing arc; tiles `7,8` have two disjoint
arcs; and `9,10` are the two crossings.  Rotations are distinct tile IDs.

A seed is a canonical finite partial map

\[
  s:\mathbb N^2\rightharpoonup T
\]

with nonnegative, duplicate-free coordinates.  A nonempty seed recovers

\[
 B_s=[0,h)\times[0,w),\quad
 h=1+\max\{r:(r,c)\in\operatorname{dom}s\},\quad
 w=1+\max\{c:(r,c)\in\operatorname{dom}s\}.
\]

A witness is one row-major tile value for every hole in `B_s`.  Adjacent ports
must match and no occupied port may leave the board.  Strand components are
cycles of the resulting degree-two graph, keeping the two strands at a
crossing distinct.

A seed is **crossing-blocked** when:

1. it has no frozen crossing;
2. every hole has a side facing the exterior or a frozen blank neighbor;
3. `hw <= max(1,|dom(s)|)^2`;
4. every boundary cell is frozen blank; and
5. at least one interior cell is frozen nonblank.

Malformed and non-guarded inputs have value zero.  This makes the counting
function total and the board polynomial in its encoding.

### Lemma 3.1 — guarded normal form

Every suitably connected filling of a crossing-blocked seed is crossing-free.
It is an unknot exactly when it has one strand component.

**Proof.**  Every four-port tile occupies the blocked side, so tiles `7--10`
are impossible at a hole; frozen crossings are forbidden.  A closed connected
one-manifold embedded in the plane is a simple closed curve. ∎

## 4. The parsimonious raw reduction

Define `#FGridHam_3(G,F)` to count Hamiltonian edge sets of an undirected
maximum-degree-three grid graph `G` that contain the explicitly supplied set
`F`, where `F` is incident to every vertex.  Invalid instances have value
zero.  Retaining the marked black/tentacle edges in the constructive proof of
FUN 2024, Theorem 18, and marking an arbitrary incident edge at any remaining
degree-two vertex yields this total marked source without changing any
solution.  It is parsimoniously `#P`-complete.

Translate a connected source graph to nonnegative coordinates and scale the
grid by four.  Freeze every internal cell of an edge in `F` to its unique path
tile.  Leave every source vertex and every internal cell of an optional edge
free.  Freeze all remaining cells blank and add a one-cell blank moat.  A
connected `n`-vertex unit-grid graph has coordinate span at most `n-1`, so the
compiled dense board has polynomial area even when source coordinates are
binary.

### Lemma 4.1 — optional corridors

An optional corridor is either entirely blank or entirely its unique path
tiles.

**Proof.**  At an internal corridor cell both transverse neighbors are frozen
blank.  Exactly two standard tiles are compatible: blank and the unique tile
joining predecessor to successor.  Port matching propagates that Boolean
choice along the whole corridor. ∎

### Lemma 4.2 — vertex selection

Every suitable filling selects exactly two source edges incident to each
vertex and contains every edge in `F`.

**Proof.**  A forced corridor occupies at least one side.  Maximum degree
three leaves a blank-blocked side, excluding four-port tiles.  Every standard
tile has even occupied degree, so the free vertex cell has degree exactly two;
its two-side mask determines a unique tile. ∎

### Lemma 4.3 — microscopic bijection

Suitable fillings are in bijection with spanning two-factors containing `F`,
and mosaic components are the cycles of the two-factor.

**Proof.**  Lemmas 4.1--4.2 map a filling to a consistent selected edge set
of degree two.  Conversely, a two-factor uniquely sets every corridor to
blank or its path tile and uniquely sets each vertex tile.  The two maps are
inverse, and strand tracing follows graph cycles. ∎

### Theorem 4.4 — raw parsimonious completeness

Let `#CB-RKW11_U(s)` count one-component unknot fillings of a crossing-blocked
exact core.  Then

\[
 \#\mathrm{CB\text{-}RKW11}_U(s_{G,F})
   =\#\mathrm{FGridHam}_3(G,F),
\]

and `#CB-RKW11_U` is `#P`-complete under parsimonious reductions.

**Proof.**  By Lemma 4.3, one component is exactly one two-factor cycle, hence
a Hamiltonian cycle.  Lemma 3.1 makes it an unknot.  A `#P` machine guesses
one four-bit code per hole, rejects codes `11--15`, and checks ports and
components deterministically.  Each matrix has exactly one accepted code. ∎

## 5. Every fixed target knot

Fix an unoriented tame classical knot `J`.  Choose a diagram, remove a
noncrossing subarc adjacent to the unbounded face, rectilinearize the remaining
one-string tangle on the standard-eleven grid, and add a blank collar.  Denote
the resulting two-terminal matrix by `T_J`.  Let `T_0` be a boundary-parallel
arc on the same rectangle with the same two gates.  Both are constants because
`J` is fixed.

A seed is **`J`-guarded** when it has one fully frozen translated copy of
`T_J`, every frozen crossing lies in that copy, every hole has a frozen blank
side, the area is quadratically bounded, and the outer boundary is a frozen
blank moat.  This is recognized by scanning constant-size translated
patterns; no knot-equivalence test occurs in the guard.

Replace the tag by `T_0` without changing the holes.  The resulting completed
matrix is planar and has the same components.  Therefore every suitable
`J`-guarded completion with `k>=1` components has the complete topology

\[
 L(P)\cong J\sqcup U^{\sqcup(k-1)}.                 \tag{5.1}
\]

Indeed, the tag ties `J` into the unique planar component passing through its
two-point ball, while the other planar components remain split unknots.

To compile hardness, choose the first marked forced edge, rotate the entire
grid orientation-preservingly if needed, enlarge the constant grid scale, and
replace that forced corridor by `T_J` and two frozen leads.  All optional
cells and vertex cells are exactly those of the untagged reduction.  Tag
erasure gives a component-preserving bijection with the original fillings.

### Theorem 5.1 — raw fixed-target completeness

For every fixed classical knot `J`, counting `J`-guarded raw standard-eleven
fillings of knot type `J` is `#P`-complete under parsimonious reductions.
Hardness holds with all holes initially permitting all eleven tiles and with
only the constant number of crossings in the frozen tag.

**Proof.**  The source-to-filling bijection survives tag insertion.  By (5.1),
a filling has knot type `J` exactly when its two-factor has one cycle.  For
membership, guess each hole once and accept by deterministic local checks and
component count; (5.1) supplies the semantic equivalence. ∎

### Corollary 5.2 — genuine Jones and determinant selectors

Let `V_U(t)=1` and `delta(t)=-(t^{1/2}+t^{-1/2})`.  On every suitable
`J`-guarded completion,

\[
 V_{L(P)}(t)=\delta(t)^{k-1}V_J(t).                 \tag{5.2}
\]

Consequently the following four predicates are equivalent on this family:

1. `k=1`;
2. `L(P)` has knot type `J`;
3. `V_{L(P)}(t)=V_J(t)`;
4. `|V_{L(P)}(-1)|=det(J)`; equivalently `|V_{L(P)}(-1)|>0`.

If `k>1`, (5.2) differs from `V_J` in the Laurent integral domain, and
`delta(-1)=0`; if `k=1`, equality is immediate.  Counting completions
satisfying any predicate is therefore parsimoniously `#P`-complete.  A
Goeritz determinant computes the fourth predicate for one diagram in
polynomial time.  The theorem concerns counting all completing matrices.

## 6. Unrestricted counting and padding

Let `F_raw(s)` count one-component unknot fillings of a polynomially bounded
exact core without the crossing-blocked syntax.  It is `#P`-hard because the
guarded instances are ordinary raw instances.  It belongs unconditionally to
`SpanP`: an NP transducer guesses a matrix and an unknot certificate, verifies
them, and outputs only the matrix, so different certificates for the same
matrix are collapsed.

Moreover,

\[
 F_{raw}\in\#P
 \quad\Longleftrightarrow\quad
 \mathrm{UNKNOT}_{mosaic}\in UP.                  \tag{6.1}
\]

If `F_raw` has a `#P` machine, freeze every cell of a supplied closed mosaic;
its count is zero or one, giving an unambiguous unknot machine.  Conversely,
combine a canonical filling guess with an unambiguous unknot verifier.

If each larger rectangle is a distinct witness, any accepting core extends
by arbitrarily many blank rows and columns.  The literal all-size count is
therefore zero or infinite.  The exact-core convention is equivalent to a
quotient by exterior blank padding on guarded instances: the moat prevents a
strand crossing, and any nonblank exterior produces an additional component.

## 7. Algorithms and approximation boundary

With `h` holes, exact enumeration takes `O(11^h poly(|B_s|))` time.  After
erasing the fixed tag, a width-`w` scan stores the occupied frontier ports,
their noncrossing connectivity, and whether a component has closed.  There
are Catalan-many states, giving `|B_s| 2^{O(w)}` arithmetic operations.
Hardness already holds at crossing count zero for `J=U`, at the constant tag
crossing count for fixed `J`, and at target component count one.

A parsimonious reduction transfers any FPRAS to `#SAT`.  SAT self-reduction,
amplification, and final witness verification then give an RP algorithm for
SAT.  Thus an FPRAS for any guarded fixed-target count implies `NP=RP`; a
deterministic multiplicative scheme that treats zero exactly implies `P=NP`.
No conclusion follows for a coarse additive error scaled by all `11^h`
assignments, and no `BPP/BQP` collapse follows.

## 8. Limitations

The theorem is total on a natural, polynomially recognizable guarded family;
it does not establish `#P` membership for unrestricted topological
completion.  It counts an exact recovered core or blank-padding equivalence
class, not every padded rectangle.  It does not require or imply a macrotile
parser.  Targets are unoriented classical knot types; framed, oriented,
satellite, concordance, and multi-component target classifications are not
claimed.  Jones equality is used only on the proved split-union family, not as
a general polynomial-time predicate.

## 9. Reproducibility

The raw baseline regressions exhaust all local source types and several
finite graphs.  The tagged regression replaces one forced edge of the marked
`2x4` ladder with a literal protected trefoil tangle, recovers the two expected
two-factors with component histogram `{1:1,2:1}`, verifies that tag erasure
preserves both component counts, and checks determinant three on the tagged
one-cycle example.  Corruption tests alter the tag, gate, moat, and source
marking and must be rejected.

The exact commands, environment, hashes, and evidence limits are recorded in
`08_REPRODUCIBILITY.md`.  Finite tests guard implementation details; Lemmas
3.1 and 4.1--4.3 and the tag-erasure argument prove the unbounded statements.

## References

The complete bibliography, including foundational work and the 2021--2026
search record, is in `07_REFERENCES.bib`; the theorem-by-theorem inclusion and
exclusion matrix is `06_LITERATURE_MATRIX.csv`.
