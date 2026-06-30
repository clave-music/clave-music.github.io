---
title: Directives & Articulation
description: Inline @ directives for dynamics, tempo, meter, and key, plus per-note articulation marks.
---

## Inline directives

Standalone events that are not notes — dynamics, tempo changes, mid-piece
meter changes — are written as `@keyword` or `@key:value` directives, placed
inline in the voice at the point where they take effect:

```clave
voice 1 {
  @mf
  C4/4 D4 E4 F4 | @f G4 A4 B4 C5 |
  @tempo:80
  C5/2 B4/4 A4 |
}
```

The `@` sigil is unambiguous: it is not a valid pitch letter, accidental, or
duration character. A directive applies from its position forward until the
next directive of the same kind overrides it. Directives are scoped to the
voice they appear in.

**Dynamics** — `pp`, `p`, `mp`, `mf`, `f`, `ff`, `fff`, `ppp`, `sfz`, `fp`,
`cresc`, `decresc`, `dim`. Each lowers to a zero-duration dynamics marking
emitted as MusicXML `<dynamics>` (or `<words>` for `cresc`/`decresc`/`dim`,
which are not dynamics-level marks) and MEI `<dynam>`.

**Tempo** — `@tempo:<bpm>`, a mid-piece tempo change, emitted as MusicXML
`<sound tempo="...">` and MEI `<tempo>` at the point where it occurs.

**Meter change** — `@time:<n>/<d>` (same value format as the `time:`
metadata key, but mid-piece). Also updates the expected measure length used
by measure-sum validation for that measure and all later measures in the
voice, until the next `@time:` directive.

**Key change** — `@key:<Tonic>[ major|minor]` (same tonic vocabulary as the
`key:` metadata value, but mid-piece), e.g. `@key:G` or `@key:A minor`.

```clave title="dynamics-tempo.clave"
title: Dynamics and Tempo Demo
time: 4/4
tempo: 60

voice 1 {
  @p C4/4 D4 E4 F4 |
  @f G4/4 F4 E4 D4 |
  @tempo:120
  C4/4 D4 E4 F4 |
  @mp G4/4 F4 E4 D4 |]
}
```

```clave title="mid-piece-changes.clave"
title: Inline Fields Test
key: C major
time: 4/4

voice 1 {
  C4/4 D4 E4 F4 |
  @key:G
  @time:3/4
  G4/4 A4 B4 |
  @tempo:120
  C5/4 B4 A4 |]
}
```

## Per-note articulation

Articulation marks attach to a single event as a trailing suffix after the
duration (or after `~` for a tied note):

| Suffix | Articulation  | Meaning                    |
|--------|---------------|-----------------------------|
| `^`    | Accent        | Emphasized attack           |
| `_`    | Tenuto        | Full value, slight emphasis |
| `'`    | Staccato      | Shortened, detached         |
| `"`    | Staccatissimo | Very short, more detached   |

```clave title="articulations.clave"
title: Articulations Demo
time: 4/4

voice 1 {
  C4/4^ D4/4_ E4/4' F4/4" |
  [C4 E4 G4]/4^ [D4 F4 A4]/4' G4/2 |]
}
```

Multiple articulations on one note are written in sequence (`C4/4^'` =
accented staccato). Articulation does not affect duration for measure-sum
validation purposes.
