---
title: Rests
description: Duration rests and the whole-measure rest.
---

A rest uses the same duration rule — no pitch, no octave, so there is no
ambiguity to resolve, but it follows the slash convention for consistency:

```clave
r/4      // quarter rest
r/8      // eighth rest
r        // inherits the previous duration
```

A trailing number normally means octave, which a rest does not have — so
rest durations always use the slash (there is no bare `r4` form).

The rest token is lowercase `r` only. Note letters (`A`–`G`) are always
uppercase, so case is what tells a rest apart from a pitch at a glance.

## Whole-measure rest

Uppercase `R` (no duration suffix) is a **whole-measure rest**: it is silent
for the entire measure, with its length defined by the prevailing time
signature rather than a note value.

```clave
R          // whole-measure rest — fills one full bar in any meter
```

A whole-measure rest is semantically distinct from a duration-based rest:
`r/4` is always a quarter rest, while `R` in `3/8` is 1.5 quarter-note units
and in `4/4` is 4 quarter-note units. Engravers render it as a centered
measure-rest glyph rather than a specific rest value.

`R` does **not** participate in duration inheritance — a following bare note
or rest inherits from the last explicit duration before the `R`, not from
the whole-measure rest itself. `R` with a duration suffix (e.g. `R/4`) is a
grammar error.

```clave title="whole-measure-rest.clave"
title: Whole-Measure Rest Demo
time: 3/8
key: C

voice 1 {
  C4/8 D4 E4 |
  R |
  F4/8 G4 A4 |]
}
```
