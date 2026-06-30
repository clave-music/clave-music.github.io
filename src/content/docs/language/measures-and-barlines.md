---
title: Measures & Barlines
description: Barline types, repeats, voltas, and measure-length validation rules.
---

A measure is a sequence of events terminated by a pipe `|`:

```clave
C4 D4 E4 F4 | G4 A4 B4 C5 |
```

## Barline types

Three barline styles are recognized, in increasing order of "weight":

| Syntax | Meaning        |
|--------|----------------|
| `\|`   | normal barline |
| `\|\|` | double barline |
| `\|]`  | final barline  |

```clave title="barlines.clave"
title: Barline Family Test
key: C major
time: 4/4

voice 1 {
  C4/4 D4 E4 F4 |
  G4/4 A4 B4 C5 ||
  C5/4 B4 A4 G4 |]
}
```

A barline applies to the measure it closes; each measure's barline type is
independent of its neighbors. Omitting the trailing barline (see Rule 1
below) is equivalent to a normal barline.

## Repeats

A repeated section is opened with `|:` immediately before its first
measure's events, and closed with `:|` as the barline of its last measure:

```clave
voice 1 {
  |: C4 D4 E4 F4 :|
}
```

This plays the measure twice (the default repeat count). An explicit repeat
count may follow `:|` to play the section more than twice — e.g. `:|3` plays
the section three times in total. If a repeated section has no explicit
`|:`, the repeat is assumed to start at the beginning of the voice.

## Voltas / endings

An `end` marker may precede a measure (or run of measures) to mark it as
belonging only to specific pass(es) of the nearest preceding repeated
section. Ending measures conventionally follow the section's `:|` barline:

```clave title="repeats-voltas.clave"
title: Simple Duo
composer: Anonymous
time: 4/4
key: G

voice 1 {
  |: C4/4 D4 E4 F4 :| end1 G4/4 A4 B4 C5 | end2 G4/4 A4 B4 C5 |]
}
```

On the first pass through the repeated section, only the `end1` measure
plays; on the second pass, only the `end2` measure plays. A single measure
may belong to more than one ending with a comma-separated list, e.g.
`end1,2`, in which case it plays on both of those passes.

## Rule 1 — Trailing pipe is optional

The final `|` at the end of a voice block may be omitted:

```clave
// trailing pipe present
voice 1 { C4 D4 E4 F4 | G4 A4 B4 C5 | }

// trailing pipe absent — equivalent
voice 1 { C4 D4 E4 F4 | G4 A4 B4 C5 }
```

A pipe is always a *terminator*, not a separator. The closing brace `}` of
the voice block acts as an implicit barline when no trailing `|` is present.

## Rule 2 — Measures may span source lines

A measure boundary is determined by `|`, not by newlines. A measure may be
written across as many source lines as needed; whitespace (including
newlines) between events is insignificant. Duration inheritance also crosses
newlines.

```clave
voice 1 {
  C4 D4
  E4 F4 |
}
```

is identical to `voice 1 { C4 D4 E4 F4 | }`.

## Rule 3 — Pickup / anacrusis (first measure)

The first measure of a voice may be shorter than one full measure of the
time signature (a pickup). The parser does **not** raise an error for an
incomplete first measure — but the first measure must still not exceed the
full measure length implied by the time signature; a pickup may be partial,
but it may not be over-full. Every measure after the first must sum to
exactly one full measure.

```clave
time: 4/4

voice 1 {
  E4/4 | E4 F4 G4 G4 |
}
```

The first measure (one beat) is a valid pickup; the second measure sums to
exactly 4 beats.

## Rule 4 — Partial / over-full measure validation

Any interior measure whose events do not sum to exactly one full measure of
the time signature is invalid. The first measure may be a pickup, and the
last measure may be a partial final measure; both may be shorter than a
full measure, but neither may be over-full.

Duration in quarter-note units for a single event:

```
quarter_units = 4.0 / duration_denominator * dot_multiplier
```

where `dot_multiplier` is `1.0` (undotted), `1.5` (one dot), or `1.75` (two
dots).

| Event  | denominator | dotted | Quarter-note units |
|--------|-------------|--------|---------------------|
| `/4`   | 4           | false  | 1.0                 |
| `/4.`  | 4           | true   | 1.5                 |
| `/2`   | 2           | false  | 2.0                 |
| `/8`   | 8           | false  | 0.5                 |
| `/1`   | 1           | false  | 4.0                 |

A conforming implementation identifies the offending measure (by its 1-based
index within the voice — the pickup, if present, is measure 1) and reports
both the expected and actual duration in quarter-note units.

## Rule 5 — Empty measures are an error

A measure with no events (`| |`, or a leading `|` with nothing before it) is
an error, including as the first measure — an empty pickup is meaningless,
since a pickup is defined by *having* a partial beat.
