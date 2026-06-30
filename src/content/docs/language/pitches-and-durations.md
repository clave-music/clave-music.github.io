---
title: Pitches & Durations
description: Pitch syntax, duration syntax, and duration inheritance.
---

Clave describes **musical content**, not engraving. The grammar is built
around one rule that removes the most common source of confusion in terse
music DSLs:

> **A number attached to a pitch letter is always the octave.
> Duration is always written separately, after a slash.**

`letter + number` answers *which note*. `/number` answers *how long*. The two
never overlap, so `C4` is unambiguously "C in octave 4" and can never be read
as "C quarter-note".

## Pitches

```
<letter><accidental?><octave>
```

- `letter` — `A`–`G` (uppercase).
- `accidental` — optional `#` (sharp) or `b` (flat). Doubles: `##`, `bb`.
- `octave` — a single digit, **required**, using scientific pitch notation
  (middle C is `C4`).

Case is significant and load-bearing: note letters are always uppercase
(`A`–`G`) and the flat accidental is always lowercase `b`. This is what lets
`Bb3` read unambiguously as "B-flat, octave 3" rather than two notes.

```clave
C4      // middle C
F#4     // F sharp, octave 4
Bb3     // B flat, octave 3
```

The octave is mandatory. Keeping it explicit guarantees the no-ambiguity
rule.

:::note
An *inheritable* octave (so `C4 D E F` would mean all notes in octave 4) was
considered and deliberately not pursued: a misread inherited octave puts a
note in the wrong register entirely — a much larger, more jarring error than
a misread inherited duration — while melodies cross octave boundaries far
more often than they change rhythm.
:::

## Durations

A duration is an optional suffix:

```
/<value><dot?>
```

- `value` — a note-value denominator: `1` (whole), `2` (half), `4`
  (quarter), `8` (eighth), `16`, `32`, `64`.
- `dot` — optional `.` or `..` for dotted values (`/4.` = dotted quarter,
  1.5× the base value; `/4..` = double-dotted quarter, 1.75×).

At most two dots are allowed — this prevents `/4...` from being silently
collapsed to a shorter dotted value and corrupting timing.

```clave
C4/1     // whole note
C4/2     // half note
C4/4     // quarter note
C4/4.    // dotted quarter
C4/4..   // double-dotted quarter
C4/8     // eighth note
```

### Double-dotting

Each dot adds half the value of the previous dot, so a double-dotted quarter
is 1.75× a plain quarter (1 + 0.5 + 0.25):

```clave
C4/4..    // double-dotted quarter: 1.75 beats
C4/2..    // double-dotted half: 3.5 beats
```

In quarter-note units:

```
quarter_units = 4.0 / duration_denominator * dot_multiplier
```

where `dot_multiplier` is `1.0` (no dot), `1.5` (one dot), or `1.75` (two
dots).

### Duration inheritance

If a note omits `/<value>`, it inherits the duration of the **previous event
in the same voice**. The initial default, before any duration is stated, is
a quarter note (`/4`).

```clave
C4 D4 E4 F4          // all quarter notes (initial default)
C4/8 D4 E4 F4        // all eighth notes (inherited from C4/8)
C4/4 D4 E4/8 F4      // quarter, quarter, eighth, eighth
```

**Inheritance copies the base note value only (the denominator), not dots.**
After a dotted event, a bare note is *undotted*:

```clave
C4/4. D4         // C4 is a dotted quarter; D4 is a plain quarter, not dotted
C4/4. D4/4.      // to repeat a dotted value, restate it
```

A dotted value must always be written explicitly with its slash and dot —
there is no way to inherit a dot.

Inheritance is scoped to the voice, not the measure. A `|` barline does
**not** reset the current duration; the last stated duration carries forward
into the next measure unchanged. Inheritance also crosses source-line and
newline boundaries within the same measure.
