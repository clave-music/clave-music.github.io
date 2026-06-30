---
title: Voices, Staves & Instruments
description: Independent melodic lines, five-line systems, clefs, and multi-part scores.
---

## Voices

```clave
voice 1 {
  E4/4 E4 F4 G4 | G4 F4 E4 D4 |
}

voice 2 {
  C4/4 C4 D4 C4 | B3 A3 G3 G3 |
}
```

Each `voice N { ... }` introduces an independent stream of measures. The
voice number `N` is a **required** positive integer (there is no bare
`voice { ... }`). Numbers are unique among top-level voices, and scoped per
staff when nested inside a `staff` block.

A voice with no measures (`voice 1 { }`) is an error — a voice exists to
hold musical content, so an empty one is almost certainly a mistake.

**Blocks always use braces.** `staff` and `voice` are delimited by `{ ... }`
everywhere — standalone or nested — so block structure never depends on
indentation. The colon `:` is reserved exclusively for metadata key/value
pairs and never opens a block.

## Staves and voices

A **voice** and a **staff** are different things, and music needs both:

- A **voice** is one independent melodic line — its own stream of notes and
  rhythms (e.g. a melody, or a bass line).
- A **staff** is one five-line system. On piano it usually corresponds to
  one hand: the upper staff (treble) to the right hand, the lower staff
  (bass) to the left.

The key relationship: **a single staff can hold more than one voice.** A
pianist's right hand might play a melody and an inner accompaniment line on
the same staff; a hymn puts soprano + alto on the top staff and tenor + bass
on the bottom — four voices across two staves. So "left hand / right hand"
is a *staff* distinction, not a voice distinction. This mirrors how
MusicXML and MEI model the page (parts → staves → voices).

### Syntax

A `staff` block groups one or more `voice` blocks. An optional label after
`staff` names the staff (e.g. `RH`/`LH`); voices are numbered within the
staff:

```clave
staff RH {
  voice 1 {
    E4/4 E4 F4 G4 | G4 F4 E4 D4 |
  }
  voice 2 {
    C4/4 C4 A3 B3 | B3 A3 G3 G3 |
  }
}

staff LH {
  voice 1 {
    C3/2 G3 | G3 D3 |
  }
}
```

- `staff <label> { ... }` — a staff, optionally labelled. Unlabelled staves
  are numbered top-to-bottom in source order.
- `voice <n> { ... }` — a voice within the staff. Voice numbers are scoped
  to their staff, so `staff RH` and `staff LH` can each have a `voice 1`.

### Top-level voices

A `voice` block written with no enclosing `staff` is shorthand for a single
implicit staff:

```clave
voice 1 {
  E4/4 E4 F4 G4 |
}
```

is equivalent to:

```clave
staff {
  voice 1 {
    E4/4 E4 F4 G4 |
  }
}
```

## Clefs

A staff may declare its initial clef with a `clef: <name>` property
immediately after the optional label:

```clave title="clef-changes.clave"
title: Clef Changes Demo
time: 4/4
key: C

instrument Strings {
  staff Viola clef: alto {
    voice 1 {
      C4/4 D4 E4 F4 |
      clef tenor G4/4 A4 B4 C5 |]
    }
  }

  staff VC clef: bass {
    voice 1 {
      C3/2 G3 |
      clef treble C4/4 D4 E4 F4 |]
    }
  }
}
```

**Header `clef:` form** sets the initial clef for the entire staff; when
omitted it defaults to `treble`.

**Mid-staff `clef` event** — `clef <name>` written between notes changes the
clef from that point forward. It is a zero-duration event: it consumes no
time and does not affect measure-length totals. Duration inheritance is
unaffected (the note following a `clef` event inherits from the note before
it, skipping the clef event entirely).

Supported clefs and their MusicXML mapping:

| clave name | `<sign>` | `<line>` |
|-----------|----------|----------|
| `treble`  | G        | 2        |
| `bass`    | F        | 4        |
| `alto`    | C        | 3        |
| `tenor`   | C        | 4        |

An unknown clef name (e.g. `clef: weird`) is a parse error.

## Instruments

An `instrument <name> { ... }` block wraps one or more `staff` blocks and
becomes a separate part in the output — the unit for multi-instrument
scores. A solo score still needs an `instrument` block when you want a
named part; a bare top-level `voice`/`staff` (see above) is shorthand only
for the single-implicit-staff case with no named instrument.

```clave title="solo-flute.clave"
title: Minuet
composer: Anonymous
time: 3/4
key: G

instrument Solo_Flute {
  staff {
    voice 1 {
      D5/4 G5 A5 | B5/4 A5 G5 | F#5/4 G5 A5 | G5/2. |]
    }
  }
}
```

Multiple `instrument` blocks produce multiple parts:

```clave title="violin-cello-duo.clave"
title: Simple Duo
composer: Anonymous
time: 4/4
key: G

instrument Violin {
  staff RH {
    voice 1 {
      D5/4 G5 B5 D6 | E6/4 D6 B5 G5 | A5/4 G5 F#5 E5 | D5/2. |]
    }
  }
}

instrument Vcello {
  staff LH clef: bass {
    voice 1 {
      G3/1 | G3/1 | D3/1 | G3/2. |]
    }
  }
}
```
