# Complexity and Decidability Frontiers for Raw Standard-Eleven Knot-Mosaic Completion

## Abstract

We determine the bounded complexity and part of the unbounded decidability
frontier for completion problems in the fixed eleven-tile
Lomonaco--Kauffman knot-mosaic model.  An input is only a finite partial seed
of ordinary microscopic tiles; there is no board-dimension field, role
template, macrotile alphabet, frame predicate, or parsing predicate.  We first
prove that the seed-only bounded language `BKW11_U`, whose accepting rectangle
has area at most $\max(1,|\operatorname{dom}s|)^2$, is NP-complete.  The reduction is a direct
microscopic compiler from planar directed Hamiltonian cycle: optional
corridors are Boolean, split junctions select one incoming and one outgoing
arc, mosaic components are exactly cycle-cover cycles, and a frozen blank moat
prevents every larger-rectangle bypass.

For counting, we define a polynomially recognizable crossing-blocked exact
core and prove that counting its one-component unknot fillings is
parsimoniously `#P`-complete.  A second solution-bijective compiler maps
forced-edge spanning two-factors to raw microscopic fillings with multiplicity
one.  These bounded theorems do not classify the existentially unbounded
language.  We prove only that the unbounded raw problem is NP-hard and
recursively enumerable; NP membership, recursively-enumerable hardness, and
recursively-enumerable completeness remain unestablished.

We then isolate a decidability frontier.  The unbounded fragment with no
frozen signed crossing is decidable and has a computable witness bound.
General instances reduce to relative signed-tangle unknot completion.  This
problem is recursively enumerable for every finite number of strings and
decidable for one, two, and three strings.  It remains open for four or more
strings.  In boundary genus at least three the hyperelliptic involutions form
one conjugacy class; the unresolved issue is not a multiplicity of such
classes, but whether the prescribed involution extends over the particular
handlebody arising from an embedding, equivalently whether the branched-cover
pair admits an equivariant embedding in the standard involutive 3-sphere.
Finally, we record that the earlier protected-factor PF-3SAT atom/parser
architecture was superseded for bounded hardness, not proved as originally
stated.

## 1. Introduction

Knot mosaics encode link diagrams by the eleven oriented local tiles of
Lomonaco and Kauffman.  Stabilization recovers tame-knot theory, while mosaic
number, tile number, enumeration, and SAT/ALLSAT formulations provide a
concrete computational setting.  This paper asks a different question: given
only finitely many frozen microscopic tiles, how hard is it to decide or count
finite completions whose diagram is a one-component unknot?

The formulation has two distinct axes that must not be conflated.  A bounded
problem supplies a polynomial witness bound derived from the finite seed.  An
existentially unbounded problem ranges over all finite containing rectangles.
Likewise, a raw microscopic problem gives every hole access to all eleven
ordinary tiles; a role-labelled or atomic-macrotile construction is a
different input model unless a sound parser is proved.  These distinctions
were decisive in the Knotwang audit.

Our results give a complete answer for the bounded raw seed-only decision
problem and for a natural finite-core counting problem.  They give only a
partial answer for existentially unbounded completion.  The correct status is:

1. `BKW11_U` is NP-complete.
2. Crossing-blocked exact-core raw counting is parsimoniously `#P`-complete.
3. Existentially unbounded raw completion is NP-hard and recursively
   enumerable, with no NP upper bound or r.e.-hardness theorem established.
4. Unbounded completion is decidable when the seed freezes no signed crossing.
5. Relative signed-tangle completion is decidable through three strings and
   open from four strings onward.

Thus the bounded program is solved, but not every Knotwang open problem is
solved.  In particular, neither unrestricted r.e.-hardness nor unrestricted
r.e.-completeness follows from the results here.

### Contributions

1. A direct microscopic NP-completeness theorem for a seed-only bounded
   standard-eleven language.
2. A frozen tile-0 firewall theorem that controls every larger containing
   rectangle without an auxiliary frame predicate.
3. A parsimonious `#P`-completeness theorem for a crossing-blocked exact-core
   count.
4. A finite-state decision procedure for the no-frozen-signed-crossing
   unbounded fragment.
5. A double-branched-cover formulation of the residual signed-tangle problem,
   a decision theorem through three strings, and a precise equivariant
   embedding open problem for four or more strings.
6. A status-preserving crosswalk that separates the direct bounded compiler
   from the superseded PF-3SAT atom/parser program.

## 2. Raw microscopic model

Let

\[
 T=\{0,1,\ldots,10\}
\]

be the oriented standard-eleven alphabet.  Tile `0` is blank; tiles `1--6`
contain one noncrossing arc; tiles `7,8` contain two noncrossing arcs; and
tiles `9,10` are the two signed crossings.  Rotations are distinct tile IDs.

A seed is a finite partial map

\[
 s:\mathbb N^2\rightharpoonup T.
\]

A candidate chooses a finite anchored rectangle containing `dom(s)` and fills
every unseeded cell with one tile from `T`.  It accepts exactly when adjacent
microscopic ports match, no occupied port reaches the outer boundary, the
diagram has exactly one component, and that component is ambient-isotopic in
$S^3$ to the unknot.  Frozen blank entries are literal seed entries.

No role template, board dimension, macrotile library, parsing predicate,
crossing-sign phase, or frame-validity predicate is an input or acceptance
condition.  This raw model is strictly different from a role-template model
in which a coordinate carries an externally imposed allowed set.

Define the bounded seed-only language

\[
 \mathrm{BKW11}_U=\{s:\text{some accepting containing rectangle has area at
 most }\max(1,|\operatorname{dom}s|)^2\}.
\]

The area bound is computed from the seed; it is not a second input channel.
The existentially unbounded language `UKW11_U` uses the same acceptance rule
but omits the area bound.

## 3. Bounded raw decision complexity

### Theorem 3.1 -- bounded seed-only completeness

`BKW11_U` is NP-complete under polynomial-time many-one reductions with the
standard eleven tiles fixed and the finite seed as the only instance data.

### Proof architecture

The source is Plesnik's NP-complete directed Hamiltonian-cycle problem for
planar digraphs in which every vertex has type `(1,2)` or `(2,1)`.  Split each
source vertex `v` into an incoming junction and an outgoing junction joined by
a forced connector.  The split graph is planar and subcubic.  A polynomial
orthogonal-grid embedding, followed by constant scaling, isolates every
nonincident path by at least one blank cell.

Freeze each internal forced-connector cell to its unique path tile.  Leave the
two junctions and every optional source-arc corridor unseeded.  Freeze every
other cell to tile `0`, including a one-cell blank moat.

### Lemma 3.2 -- optional corridors are Boolean

An optional corridor is either entirely blank or entirely its unique path
filling.

**Proof.**  At an internal corridor cell the transverse neighbors are frozen
blank.  The only locally compatible tiles are blank and the unique tile that
joins predecessor to successor.  Port matching propagates that binary choice
along the whole corridor. ∎

### Lemma 3.3 -- split junctions select a cycle cover

Every legal filling selects exactly one optional incoming arc at each incoming
junction and exactly one optional outgoing arc at each outgoing junction.

**Proof.**  The forced connector occupies one side.  One or two optional arcs
occupy the available sides, and at least one remaining side faces a frozen
blank.  Every standard tile has even occupied degree; the blank side excludes
all four-port tiles.  Exactly one optional side must therefore be selected. ∎

Lemmas 3.2 and 3.3 give a bijection between legal microscopic fillings and
directed cycle covers of the source graph.  Following a mosaic strand follows
one cover cycle, so mosaic components are exactly cycle-cover cycles.  A
one-component filling therefore corresponds precisely to a directed
Hamiltonian cycle.  Four-port tiles are blocked everywhere, so the completed
diagram is crossing-free; a one-component completion is a Jordan curve and
hence an unknot.

### Lemma 3.4 -- the blank moat is an all-rectangle firewall

Every accepting completion on every larger containing rectangle is blank
outside the compiled core.

**Proof.**  No strand crosses the frozen tile-0 moat.  Any nonblank exterior
filling contains an additional closed component, contradicting the
one-component acceptance rule.  Thus padding, shifted parses, alternative
frames, and exterior loops cannot create a bypass. ∎

For an inner `h x w` core, the moat contains `2h+2w+4` frozen entries and the
canonical board has area `(h+2)(w+2)`.  Consequently

\[
 (h+2)(w+2)\leq (2h+2w+4)^2\leq |\operatorname{dom}(s)|^2.
\]

The compiler has polynomial area and its outputs meet the seed-derived bound.
Membership in NP follows by guessing the bounded matrix, checking ports and
components, and providing a polynomial unknot certificate.  This proves
Theorem 3.1.

## 4. Crossing-blocked exact-core counting

A seed-recovered exact core is crossing-blocked when:

1. no frozen tile is `9` or `10`;
2. every hole has a side facing the exterior or a frozen tile-0 neighbor;
3. its area is at most $\max(1,|\operatorname{dom}s|)^2$;
4. every boundary cell is frozen blank; and
5. at least one interior cell is frozen nonblank.

Malformed or non-guarded inputs have value zero.  Let `#CB-RKW11_U(s)` count
one-component unknot fillings of this finite recovered core.

### Lemma 4.1 -- guarded normal form

Every legal crossing-blocked filling is crossing-free and is an unknot exactly
when it has one strand component.

**Proof.**  Each hole has a blocked side, excluding tiles `7--10`; frozen
crossings are forbidden.  A connected closed one-manifold embedded in the
plane is a simple closed curve. ∎

### Theorem 4.2 -- parsimonious raw counting

`#CB-RKW11_U` is `#P`-complete under parsimonious reductions.

**Proof.**  Start with maximum-degree-three grid Hamiltonicity together with a
computably marked forced edge incident to every vertex.  Freeze forced edges
as path corridors and leave optional edges and graph vertices as unrestricted
microscopic holes.  The blocked-side condition forces each optional corridor
to be either blank or uniquely filled and each vertex to select exactly two
incident edges.  Therefore

\[
 \{\text{spanning two-factors containing the forced edges}\}
 \longleftrightarrow
 \{\text{legal raw microscopic fillings}\}
\]

is a bijection.  Components correspond to two-factor cycles, so
one-component fillings correspond one-for-one to Hamiltonian cycles.  By
Lemma 4.1 each such filling is already an unknot.  A nondeterministic machine
guesses each hole once and checks the local rules and component count, giving
membership in `#P` with multiplicity one. ∎

The theorem counts the recovered finite core, equivalently completions modulo
exterior blank padding.  Counting every larger blank-padded rectangle as a
distinct witness would give zero or infinitely many witnesses and would not
define a `#P` function.

## 5. The existentially unbounded language

The bounded and unbounded languages have different upper-bound obligations.
Removing the area bound does not preserve NP membership merely because every
positive instance has some finite witness.

### Theorem 5.1 -- proved unbounded classification

`UKW11_U` is NP-hard and recursively enumerable.

**Proof.**  NP-hardness follows from the bounded compiler: its blank moat makes
the same reduction sound when all finite containing rectangles are allowed.
For recursive enumerability, enumerate rectangles and tile assignments and
run a total classical unknot-recognition algorithm on every closed
one-component candidate. ∎

### Nonclaims

Theorem 5.1 does not establish any of the following:

1. NP membership for arbitrary unbounded seeds;
2. r.e.-hardness of `UKW11_U`;
3. r.e.-completeness of `UKW11_U`; or
4. a computable witness bound for every seed.

Indeed, any reduction image with a total computable accepting-witness area
bound is decidable.  A fixed finite firewall can establish bounded hardness,
but cannot by itself establish r.e.-hardness for an undecidable source.

## 6. A decidable unbounded fragment

### Theorem 6.1 -- no-frozen-signed-crossing decidability

If a seed freezes only tiles `0--8`, then existentially unbounded raw
completion is decidable and has a computable accepting-witness bound, even
though unseeded cells may still use tiles `9` and `10`.

**Proof sketch.**  Cut at the south and east boundary of the seed's
north-west bounding box.  Enumerate the finitely many unsigned shadow states,
identifying the two signed crossings by their common pairing.  A shadow
extends to one component exactly when it contains either no already closed
component and any number of cut arcs, or exactly one closed component and no
cut arc.  The cut arcs can be joined in an outer routing region.  Because the
crossing signs outside the frozen seed remain free, orient the resulting
one-component shadow and make the first traversal of every crossing the
overpass.  The diagram is descending and hence an unknot.  Finite shadow
enumeration therefore supplies a terminating decision algorithm and a
computable witness bound. ∎

Frozen over/under data is therefore necessary for any remaining r.e.-hardness
route.  It is not known to be sufficient.

## 7. Relative signed-tangle frontier

For a general seed, finitely many internal choices reduce the unresolved part
to a signed tangle in the seed box with exact labelled boundary stubs.  The
question is whether a complementary tangle can attach to those same stubs and
produce one unknot.

For an `n`-string tangle `(B,T)`, let `M_T` be the double cover of `B` branched
over `T`, equipped with its deck involution `tau_T`.  Its boundary has genus
`n-1`.  Relative signed-tangle completion is equivalent to

\[
 (M_T,\tau_T)\ \text{embedding equivariantly in}\
 (S^3,\text{the standard half-turn}).
\]

### Theorem 7.1 -- semidecision and ordinary obstruction

Positive relative signed-tangle instances are recursively enumerable for
every finite `n`.  Ordinary $S^3$-embeddability of `M_T` is a decidable
necessary condition for every `n`.

The first statement follows by enumerating complementary finite mosaics.  The
second follows by constructing the branched cover effectively and applying
the decision theorem for ordinary 3-manifold embeddability in $S^3$.

### Theorem 7.2 -- the one-through-three-string decision theorem

Relative signed-tangle unknot completion is decidable for `n=1,2,3`.

**Proof sketch.**  Here the boundary genus is at most two.  After ordinary Fox
re-embedding, the hyperelliptic boundary involution can be extended
point-for-point over a complementary handlebody.  Gluing the involutions gives
a locally linear involution of $S^3$; the Smith theorem identifies its fixed
circle model with the standard half-turn.  Thus ordinary embeddability is also
sufficient in these low genera, and the ordinary decision algorithm becomes a
decision algorithm for the relative tangle problem. ∎

### Open Problem 7.3 -- four or more strings

Decide relative signed-tangle unknot completion for `n>=4`, equivalently decide
prescribed-involution equivariant $S^3$-embeddability for the branched-cover
pair `(M_T,tau_T)`.

When `n>=4`, the boundary genus is at least three.  There is one conjugacy
class of hyperelliptic involutions in each such genus.  The obstruction is
therefore not the existence of several hyperelliptic conjugacy classes.
Rather, an ordinary embedding of `M_T` determines a particular complementary
handlebody, and the prescribed boundary involution need not be known to extend
over that fixed handlebody.  Existing handlebody-involution classifications
do not give an effective search over embeddings of the prescribed interior
pair, and ordinary embeddability forgets the deck involution entirely.

A solution needs either a decision procedure for equivariant embedding or an
effective bound on an invariant exterior meridian/disk system.  A naive
normal-surface shortcut is insufficient: a spanning disk may meet the cut
sphere in essential circles, so its intersection with the input ball can be a
disconnected planar-surface system of unbounded apparent type.

## 8. Superseded protected-factor architecture

The original protected-factor program sought a PF-3SAT atom, copied-state
network, verification-tree parser, and a global no-bypass theorem.  Several
components of that broader program remain valid in their restricted
role/template scope, but its literal open lemmas were not proved for raw
microscopic placement.

The bounded compiler of Section 3 supersedes that architecture: independent
edge variables, split junctions, and a blank firewall give raw NP-hardness
without a PF-3SAT atom or macrotile parser.  The correct dispositions are:

1. the protected PF-3SAT atom is superseded for bounded raw hardness, not
   proved as originally stated;
2. the PF decoder/protected-coverage claim is superseded by the cycle-cover
   decoder and blank firewall, not retroactively proved;
3. the polynomial seed-compiler branch is proved, while the unbounded
   r.e.-hard branch remains separate and open;
4. verification-tree parsing and copied-state delivery are unnecessary for
   the direct bounded reduction, not established as raw parsing theorems.

This status discipline prevents a new theorem from silently reusing a failed
or open identifier.

## 9. Reproducibility and evidence boundary

The validated artifact contains 33 completion claims: 27 proved, two proved
with explicit premises, one finite verified regression, and three open.  The
validator checks identifiers, dependency acyclicity, five former-open
crosswalk entries, local links, hashes, and six committed result files
reproduced byte-for-byte.  It passes both normally and under Python
optimization.

Finite computations validate the microscopic mask table, local corridor and
junction behavior, firewall regressions, and representative compiled graphs.
They do not replace the symbolic all-size proofs in Lemmas 3.2--3.4 and
Theorem 4.2.  Likewise, the `n>=4` item is an explicitly open mathematical
frontier, not a failed finite experiment.

## 10. Discussion and future work

The most direct future problem is Open Problem 7.3: decide whether a compact
branched-cover pair with prescribed involution embeds equivariantly in the
standard involutive $S^3$.  The key difficulty is extension over the
particular complementary handlebody, despite the uniqueness of the
hyperelliptic conjugacy class on its boundary.  Useful progress could take one
of three forms:

1. an effective invariant disk-system bound for the complementary handlebody;
2. an equivariant refinement of ordinary 3-manifold embeddability; or
3. a counterexample separating ordinary from equivariant embeddability in the
   exact branched-cover family arising from signed tangles.

A second frontier is complexity-theoretic: prove or refute r.e.-hardness of
unrestricted `UKW11_U`.  Any proposed reduction must freeze essential signed
crossing information and cannot rely on a fixed firewall with a computable
witness bound.  A third direction is quantitative: tighten exact algorithms
for bounded raw completion by hole count, width, or crossing number without
conflating those finite algorithms with a classification of the unbounded
language.

The superseded PF-3SAT architecture may still motivate restricted atomic or
role-template models, but completing it would be a separate theorem.  It is
not a prerequisite for the bounded raw results proved here.

## 11. Conclusion

The bounded raw standard-eleven seed-only problem has a complete microscopic
solution: `BKW11_U` is NP-complete, and crossing-blocked exact-core counting is
parsimoniously `#P`-complete.  The blank moat makes the bounded compiler sound
over every larger rectangle.  The existentially unbounded problem is known to
be NP-hard and recursively enumerable, but its NP membership, r.e.-hardness,
and r.e.-completeness are not established.  Its no-frozen-signed-crossing
fragment is decidable.  General completion reduces to relative signed-tangle
completion, which is decidable through three strings and open for four or
more.  The genus-at-least-three gap concerns extension of a prescribed
involution over a fixed complementary handlebody and equivariant embedding,
not multiple hyperelliptic conjugacy classes.  The earlier PF-3SAT atom/parser
program was superseded for bounded hardness rather than proved.  These
statements resolve the bounded objectives while preserving the remaining open
frontier.
