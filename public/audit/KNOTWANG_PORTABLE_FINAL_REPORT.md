# Knotwang: portable final theorem report

**Report date:** 2026-08-14  
**Report version:** 1.0  
**Purpose:** self-contained mathematical and computational handoff suitable for attachment to another chat.

## Import instruction

When this file is imported into another chat, treat it as the authoritative
status summary for the Knotwang audit and repair.  Preserve the model
distinctions and theorem statuses below.  In particular, do not turn an
`OPEN` claim into a theorem, do not conflate the bounded and unbounded
languages, and do not re-use a failed claim identifier for a repaired claim.

## Direct answer

The central **bounded raw standard-eleven seed-completion problem is solved**.
There is an unconditional, seed-only, fixed-alphabet NP-completeness theorem,
proved directly at the microscopic tile level.  Its exact-core counting
version is parsimoniously `#P`-complete on a syntactically crossing-blocked
class.

The claim that *every conceivable issue is solved* would nevertheless be
false.  The existentially unbounded raw language is proved NP-hard and
recursively enumerable, but it is not proved NP-complete, r.e.-hard, or
r.e.-complete.  The remaining topological subproblem is relative signed
tangle embedding into the unknot when a finite cut has at least four strings.
Positive instances are semidecidable, and the problem is decidable through
three strings; no general four-or-more-string decision theorem is asserted.

Thus the correct concise verdict is:

| Objective | Final status |
|---|---|
| Bounded raw standard-eleven seed-only decision problem | **PROVED NP-complete** |
| Crossing-blocked exact-core counting | **PROVED parsimoniously #P-complete** |
| Unbounded raw seed-only completion | **PROVED NP-hard and r.e.** |
| Unbounded raw completion with no frozen signed crossing | **PROVED decidable** |
| Relative signed-tangle completion with 1--3 strings | **PROVED decidable** |
| Relative signed-tangle completion with at least 4 strings | **OPEN** |
| r.e.-hardness or r.e.-completeness of unrestricted raw completion | **OPEN** |
| Original protected-factor PF-3SAT atom/parser architecture | **SUPERSEDED for bounded hardness; not proved as originally stated** |

## 1. Exact model

Let

```text
T = {0,1,...,10}
```

be the eleven oriented Lomonaco--Kauffman microscopic mosaic tiles.  Tile `0`
is blank; tiles `1,...,6` contain one noncrossing arc; tiles `7,8` contain two
noncrossing arcs; and tiles `9,10` are the two over/under choices for a
crossing.  Rotations are not implicit.

A seed is a finite partial map

```text
s : N^2 -> T.
```

A completion chooses one tile for every unseeded cell of an anchored finite
rectangle containing `dom(s)`.  It accepts exactly when:

1. every pair of neighboring microscopic ports matches;
2. no port reaches the outer rectangle boundary;
3. the resulting diagram has exactly one component; and
4. that component is ambient-isotopic in `S^3` to the unknot.

There is no role template, dimension field, macrotile alphabet, frame
predicate, parsing predicate, crossing-sign assignment phase, or auxiliary
acceptance condition.  Frozen tile-`0` entries are literal seed entries, and
blank outer rows and columns are allowed.

Define the seed-only bounded language

```text
BKW11_U = { s : some accepting containing rectangle has area
                 at most max(1, |dom(s)|)^2 }.
```

The bound is derived from the seed itself; it is not a second input channel.

## 2. Main theorem

### Theorem A -- bounded raw decision complexity

`BKW11_U` is NP-complete under polynomial-time many-one reductions with the
standard eleven tiles fixed and the finite seed as the only instance data.

### Proof

The source is Plesnik's NP-complete directed Hamiltonian-cycle problem for
planar digraphs in which every vertex has type `(indegree,outdegree)=(1,2)`
or `(2,1)`.

**Step 1: split every source vertex.**  Replace a source vertex `v` by two
mosaic junctions joined by a forced connector:

```text
incoming optional arcs -> v_in == forced connector == v_out
                         -> outgoing optional arcs
```

The resulting undirected graph is planar and subcubic.

**Step 2: route the split graph.**  A polynomial orthogonal-grid embedding,
followed by constant scaling, makes edge paths internally disjoint and leaves
at least one frozen blank cell between nonincident paths.  Every path has an
internal cell, and the paths at a junction use distinct compass sides.

**Step 3: form the raw seed.**  Freeze every internal forced-connector cell to
its unique path tile.  Leave each junction and each optional source-arc
corridor unseeded.  Freeze every other cell to tile `0`, including a one-cell
blank moat around the construction.

**Step 4: optional corridors are Boolean.**  At an internal optional-corridor
cell, only the predecessor and successor sides do not face frozen blanks.
The only compatible tiles are therefore tile `0` and the unique degree-two
tile following the path.  Port matching propagates this choice, so an entire
optional source arc is selected all-or-none.

**Step 5: junctions select exactly one arc.**  The forced connector supplies
one occupied side at `v_in`.  The remaining available sides are the one or
two optional incoming arcs, while a fourth side faces a frozen blank.  Every
standard tile has even occupied degree, and the blank neighbor excludes every
four-port tile.  Hence exactly one incoming arc is selected.  The identical
argument at `v_out` selects exactly one outgoing arc.

**Step 6: fillings are cycle covers.**  Steps 4 and 5 give a bijection between
suitably connected microscopic fillings and directed cycle covers of the
source graph.  Following a mosaic strand follows precisely one cycle of the
cover, so mosaic components are in bijection with cover cycles.

**Step 7: one component is Hamiltonicity.**  The mosaic has exactly one
component if and only if the cover has exactly one cycle, which is exactly a
directed Hamiltonian cycle.

**Step 8: the knot predicate is automatic.**  Every available nonblank cell
in a legal filling has degree two, and every four-port tile is blocked.  Thus
the one-component diagram is a crossing-free Jordan curve and therefore the
unknot.

**Step 9: the all-rectangle quantifier is sound.**  The frozen tile-`0` moat
is a strand firewall.  No strand can cross it.  A nonblank exterior filling
would create an additional component, so every accepting completion on every
larger rectangle is blank outside the moat.  There is no shifted parse,
alternate frame, padding corridor, or exterior bypass.

The compiler has polynomial area.  For an inner `h x w` core, the moat alone
contains `2h+2w+4` frozen entries, while the canonical board has area
`(h+2)(w+2)`.  Therefore

```text
(h+2)(w+2) <= (2h+2w+4)^2 <= |dom(s)|^2.
```

Every compiled yes-instance lies inside the definition of `BKW11_U`.
Membership in NP follows by guessing the polynomial-area matrix, checking
ports and component count, and supplying a polynomial unknot certificate.
This completes the proof.

## 3. Counting theorem

Define `#CB-RKW11_U` on a seed-recovered finite core satisfying all of the
following syntactic conditions:

- no frozen tile is `9` or `10`;
- every hole has at least one side facing the board boundary or a frozen
  tile-`0` neighbor;
- the recovered area is at most `max(1,|dom(s)|)^2`;
- the entire board boundary is frozen blank; and
- at least one interior tile is frozen nonblank.

### Theorem B -- parsimonious raw counting

`#CB-RKW11_U` is `#P`-complete under parsimonious reductions.

The reduction starts with maximum-degree-three grid Hamiltonicity with a
computably marked forced edge incident to every vertex.  Forced edges become
frozen path corridors; optional edges and graph vertices remain microscopic
holes.  Every legal vertex has exactly two selected incident edges, and every
optional corridor is blank or uniquely filled.  Hence there is a literal
bijection

```text
spanning two-factors containing the forced edges
        <-> suitably connected microscopic fillings.
```

Components correspond to two-factor cycles.  Exactly-one-component fillings
therefore correspond one-for-one to Hamiltonian cycles.  The blocked-side
condition excludes all four-port tiles, so a one-component filling is already
a crossing-free unknot.  No multiplicity correction and no general unknot
certificate are needed.

Counting every larger blank-padded rectangle as a distinct object would make
each yes-instance have infinitely many completions.  The theorem therefore
counts the finite seed-recovered core, equivalently completions modulo
exterior blank padding.

## 4. What was repaired and what was retired

The original audit found several genuine failures.  They remain recorded as
failures; no failed statement was silently renamed as a theorem.

| Original mechanism | Audit result | Correct disposition |
|---|---|---|
| Coupled `A/B` local transition grammar | It preserves the channel on every edge, so every positive board has an even number of components | **Retired** |
| Claimed crossing-free `STRAIGHT` role | Its north--south and east--west pairs alternate in a disk and force intersections | **False as stated** |
| Ribbon identity `b=c+beta` for arbitrary orientable ribbon graphs | The general formula is `b=c+beta-2g` | **Restricted to genus zero** |
| Eulerian connected carrier implies one circuit | A transition system can split an Eulerian graph into several circuits | **False as stated** |
| Equality detector independent of closure convention | Ordinary braid closure works; cap--cup closure accepts every exponent | **False without a fixed Artin closure** |
| Open two-braid detector is safe in every context | An inverse-braid context cancels an erroneous exponent | **False; protected two-point factor required** |
| One physical crossing can drive multiple disjoint factors | A local crossing ball can change at most one fixed disjoint factor | **False in that fixed-support model** |
| Role-template search proves unrestricted microscopic placement | It does not supply atomicity, parsing, or no-bypass | **False implication** |

Several useful auxiliary constructions were then proved under new `KWR-*`
identifiers:

- a finite common-interface equality detector with a fixed odd-crossing
  harness;
- an explicit binary standard-eleven capsule, `29 x 5`, whose ordinary Artin
  cap gives exponent `1+4(c-d)`;
- protected two-point insertion balls, so detector knots aggregate by literal
  connected sum rather than cancellable tangle multiplication;
- a one-circuit carrier obtained as the boundary of a plane verification
  tree, with all fifteen nonempty square-grid live-side masks compiled as
  `13 x 13` standard-eleven patches; and
- an NP-complete and logically `#P`-complete protected-factor role/template
  model (`M3-F`).

Those constructions are valid at their stated scopes.  They are not needed
for Theorem A: the direct Hamiltonian compiler bypasses the missing PF-3SAT
atom, copied-state network, and global macrotile parser entirely.

The former open claims therefore have the following disciplined status:

| Former identifier | Status after Theorem A |
|---|---|
| `KWR-OPEN-001` protected PF-3SAT atom | Superseded for raw NP-hardness; not proved as stated |
| `KWR-OPEN-002` PF decoder/protected coverage | Superseded by the cycle-cover decoder and blank firewall; not proved as stated |
| `KWR-OPEN-003` seed compiler | Polynomial NP branch proved; unbounded r.e.-hard branch remains separate |
| `KWR-CAR-008` verification-tree parse | Superseded for raw NP-hardness |
| `KWR-CAR-009` copied-state delivery | Superseded because the new reduction has independent edge variables |

## 5. The existentially unbounded language

Let `UKW11_U` omit the area bound and ask whether *some* finite containing
rectangle accepts.

### Proved facts

1. `UKW11_U` is NP-hard by the same compiler used in Theorem A.
2. `UKW11_U` is recursively enumerable: enumerate finite rectangles and tile
   assignments and run a total classical unknot-recognition algorithm.
3. NP membership is not implied, because an arbitrary accepting rectangle may
   be superpolynomial or have no known polynomial bound.
4. Any compiler with a total computable accepting-witness area bound has a
   decidable image language, so a fixed finite firewall cannot establish
   r.e.-hardness for an undecidable source.

### No-frozen-crossing collapse

If a seed freezes only tiles `0,...,8`, acceptance is decidable even though
unseeded cells may still choose either signed crossing tile.

Take the north-west bounding box of the seed and enumerate its finitely many
shadow states, replacing both signed crossings by one unsigned crossing
pairing.  A state can extend to one component exactly when it contains:

- no already closed component and any number of cut arcs; or
- exactly one closed component and no cut arc.

The cut arcs can be joined in an outer routing region.  Because every crossing
sign is still free, orient the resulting one-component shadow and make the
first visit to every crossing the overpass.  The diagram is descending and
hence an unknot.  This gives a terminating finite decision procedure and a
computable witness bound.

Consequently, an r.e.-hard construction cannot use only frozen tiles
`0,...,8`.  Frozen over/under information is necessary for any remaining
route, though it is not known to be sufficient.

## 6. Exact signed-tangle frontier

For a general seed, cut at the south and east boundary of its finite seed box.
After finitely many internal tile choices, the only unresolved states are
finite signed tangles with exact labelled boundary stubs.  The question is
whether a complementary tangle can attach to those exact stubs and make one
unknot.

For an `n`-string tangle `(B,T)`, compute the double cover `M_T` of `B`
branched over `T`, together with its deck involution `tau_T`.  Its boundary has
genus `n-1`.  The tangle has an unknot completion if and only if

```text
(M_T, tau_T) equivariantly embeds in (S^3, standard half-turn).
```

This yields the following proved statements:

- positive instances are recursively enumerable for every finite `n`;
- ordinary `S^3`-embeddability of `M_T` is a decidable necessary obstruction
  for every `n`; and
- for `n=1,2,3`, ordinary embeddability is also sufficient, so the relative
  tangle problem is decidable.

The low-string sufficiency uses boundary genus at most two.  In those genera,
the hyperelliptic boundary involution can be extended point-for-point over a
handlebody after Fox re-embedding.  Gluing the involutions gives a locally
linear involution of `S^3`; the Smith theorem identifies it with the standard
half-turn.

For `n>=4`, ordinary embeddability forgets the prescribed involution.  The
missing theorem would have to decide equivariant `S^3`-embeddability, or give
an effective bound on an invariant exterior meridian/disk system.  Existing
ordinary embeddability, handlebody-involution, mapping-class, and
two-string-tangle results do not supply that bound.  Therefore:

```text
General relative signed-tangle unknot completion for n >= 4: OPEN.
Unrestricted raw r.e.-hardness/r.e.-completeness: OPEN.
```

This is a statement about the present theorem package and the cited search,
not a categorical claim that no solution can exist.

A naive normal-surface shortcut does not close the gap.  If `D` is a spanning
disk for a completing unknot and `S` is the cut sphere, `D intersect S` may
contain essential circles in the punctured sphere.  Consequently `D intersect
B` can be a disconnected planar-surface system rather than one surface of a
fixed boundary type.  No cited normal-surface theorem bounds that system while
preserving the exact labelled stubs and deck involution.  Likewise, attaching
one abstract spanning disk to the full input ball is locally non-embeddable
along the interior tangle arcs; attaching it only outside instead imposes the
strictly stronger trivial-complement condition.  These observations explain
why ordinary finite `2`-complex embeddability cannot simply be quoted as the
missing decision procedure.

## 7. Reproducibility

The validated workspace contains 33 completion claims:

```text
27 proved
2 proved with explicit premises
1 finite verified regression
3 open
```

The validator checks claim identifiers, dependency acyclicity, the complete
five-claim crosswalk, local links, release hashes, and six committed result
files reproduced byte-for-byte.  It passes with and without Python
optimization.

From the project root, run:

```text
python3 completion/code/validate_completion.py
python3 -O completion/code/validate_completion.py
```

Expected output for each command:

```text
PASS: 33 completion claims (27 proved, 2 conditional, 1 finite regression, 3 open), 5/5 former repair opens crosswalked, and six results reproduced byte-for-byte
```

The earlier repair package independently validates with:

```text
python3 repair/code/validate_repair.py
```

Expected output:

```text
PASS: 30 repair claims (23 proved, 2 bounded, 5 open), 54/54 original claims crosswalked, dependency graph acyclic, and six result files reproduced byte-for-byte
```

The completion package supersedes the repair package's older statement that
raw bounded hardness was still open.

## 8. Primary theorem inputs

1. S. J. Lomonaco and L. H. Kauffman, *Quantum Knots and Mosaics*,
   [arXiv:0805.0339](https://arxiv.org/abs/0805.0339).
2. J. Plesnik, *The NP-completeness of the Hamiltonian cycle problem in
   planar digraphs with degree bound two*,
   [doi:10.1016/0020-0190(79)90023-1](https://doi.org/10.1016/0020-0190(79)90023-1).
3. R. Tamassia and I. G. Tollis, *Planar grid embedding in linear time*,
   [doi:10.1109/31.34669](https://doi.org/10.1109/31.34669).
4. J. Hass, J. Lagarias, and N. Pippenger, *The Computational Complexity of
   Knot and Link Problems*,
   [doi:10.1145/301970.301971](https://doi.org/10.1145/301970.301971).
5. MIT Hardness Group et al., *ASP-Completeness of Hamiltonicity in Grid
   Graphs, with Applications to Loop Puzzles*,
   [doi:10.4230/LIPIcs.FUN.2024.23](https://doi.org/10.4230/LIPIcs.FUN.2024.23).
6. J. Matousek, E. Sedgwick, M. Tancer, and U. Wagner, *Embeddability in the
   3-sphere is decidable*,
   [doi:10.1145/3078632](https://doi.org/10.1145/3078632).
7. J. M. Nogueira and A. Salgueiro, *On embeddings of 2-string tangles into
   the unknot, the unlink and split links*,
   [doi:10.1016/j.topol.2021.107866](https://doi.org/10.1016/j.topol.2021.107866).
8. J. S. Birman and H. M. Hilden, *On isotopies of homeomorphisms of Riemann
   surfaces*, [doi:10.2307/1970830](https://doi.org/10.2307/1970830).
9. S. Pantaleoni and R. Piergallini, *Involutions of 3-dimensional
   handlebodies*, [arXiv:0806.0904](https://arxiv.org/abs/0806.0904).

## 9. Rules for future use

An assistant continuing from this report should obey these constraints:

1. State the bounded theorem as `BKW11_U is NP-complete`, not as an
   unqualified theorem about every unbounded completion model.
2. State the counting theorem only for the crossing-blocked finite-core
   function, or explicitly discuss why unrestricted unknot counting has a
   different upper-bound issue.
3. Do not claim the old coupled two-channel carrier has one component.
4. Do not call the `STRAIGHT` endpoint pairing crossing-free.
5. Use `b=c+beta-2g` for a general orientable ribbon surface.
6. Use the equality detector only with its fixed ordinary Artin closure and
   protected two-point-ball insertion.
7. Do not infer raw microscopic atomicity from a role-template search.
8. Do not claim NP membership for existentially unbounded rectangles without
   a polynomial witness bound.
9. Do not cite infinite-plane completion as an r.e.-complete finite-witness
   precedent; the quantifier polarity is different.
10. Keep the `n>=4` prescribed-involution tangle problem marked `OPEN` unless
    a new proof supplies a terminating negative procedure.

## 10. One-paragraph portable conclusion

Knotwang's bounded raw standard-eleven seed-only completion problem has a
complete microscopic solution: a polynomial dense seed compiles planar
directed Hamiltonian cycle into isolated optional corridors and forced split
junctions; legal fillings are exactly directed cycle covers, components are
exactly cover cycles, and a blank moat makes the equivalence sound over every
larger rectangle.  Therefore `BKW11_U` is NP-complete, and a related
crossing-blocked exact-core count is parsimoniously `#P`-complete.  The
unbounded language is NP-hard and r.e., while seeds with no frozen signed
crossing are decidable.  General unbounded classification reduces to relative
signed-tangle unknot completion: it is decidable for at most three strings
and remains open from four strings onward.  Any stronger claim would exceed
the proved results.
