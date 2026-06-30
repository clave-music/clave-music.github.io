---
title: Chords & Tuplets
description: Bracketed simultaneous and grouped events.
---

## Chords

A chord is a bracketed list of pitches with a single duration applied to the
whole chord, written **after** the closing bracket:

```clave
[C4 E4 G4]/4     // C major chord, quarter
[C4 E4 G4]/4.    // C major chord, dotted quarter
[C4 E4 G4]       // inherits the previous duration
[D4 F#4 A4]/2    // D major chord, half
```

The duration and dot live on the chord as a whole. Individual members carry
**pitch and octave only** — they have no per-member duration or dot. A chord
may be dotted (`[C4 E4 G4]/4.`); the dot applies to the whole chord.

## Tuplets

A tuplet is a leading integer immediately before a bracketed group of
events, with a single duration applied to the whole group, written **after**
the closing bracket — the same shape as a chord, but the brackets hold a
*sequence* of events instead of a simultaneous set of pitches:

```clave
3[C4 D4 E4]/8     // eighth-note triplet: 3 notes in the time of 2 eighths
3[C4 D4 E4]/4     // quarter-note triplet: 3 notes in the time of 2 quarters
```

The leading integer `N` is the number of events the bracket holds; the
duration after the bracket is the value each of those `N` events would
normally have, but the group as a whole occupies the time of the
next-smaller power-of-two grouping (for `N = 3`, the group occupies 2 units
of that duration rather than 3 — the standard meaning of "triplet"). Within
a tuplet bracket, individual events are plain pitches like chord members,
all sharing the bracket's duration equally.

```clave title="tuplets.clave"
title: Tuplets Demo
time: 4/4

voice 1 {
  3[C4/8 D4 E4]/8 3[F4/8 G4 A4]/8 C5/4 D5/4 |
  3[C4/4 D4 E4]/4 G4/4 |]
}
```
