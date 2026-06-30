---
title: Ties & Slurs
description: Sustaining a note across events, and phrasing marks.
---

## Ties

A trailing `~` after a note's duration ties it to the following note of the
same pitch, meaning the two are sounded as one continuous note whose
duration is the sum of both:

```clave
C4/2~ C4/4     // C4 held for a half + a quarter (3 beats total)
C4/4 D4/4      // not tied: two separate, distinct quarter notes
```

A tie always joins exactly two **adjacent** notes and requires the same
pitch and octave on both sides (`C4/2~ D4/4` is invalid — that's two
different pitches, not one held note). A note may be tied into and out of at
once, chaining across any number of notes:

```clave
C4/4~ C4/4~ C4/4     // one continuous C4 lasting three quarters
```

Ties are the mechanism for sustaining a note across a barline, which nothing
else in the grammar permits:

```clave title="ties.clave"
title: Ties Demo
time: 4/4

voice 1 {
  C4/2~ | C4/2 D4/4 E4/4 | F4/4~ F4/4 G4/2 |]
}
```

For measure-length validation, each tied note is counted in the
quarter-note-unit sum of the measure it physically appears in — a tie does
not move duration across the barline, it only asserts that the two notes
sound as one.

A rest cannot be tied (`r/4~` is an error) since there is no sustained pitch
to continue.

## Slurs

A slur groups a sequence of notes of *different* pitches under one bow
stroke or breath — a phrasing mark, not a duration extension. This is
distinct from a tie, which joins two notes of the *same* pitch into one
sustained sound: a tie affects timing, a slur affects articulation (the
notes are played legato as a unit but each sounds at its own pitch and
duration).

Parentheses wrap the slurred group, with no duration suffix (slurs carry no
rhythmic meaning of their own):

```clave
(C4/4 D4 E4 F4)    // four notes slurred together
(E4/8 D4 C4)       // a three-note slur
```

Parentheses are unambiguous here: brackets `[ ]` are taken by chords and
tuplets, and braces `{ }` by blocks.

A slur may not be empty (`()` is an error). A slur may span one or more
barlines by including `|` tokens inside the parentheses:

```clave title="slurs.clave"
title: Slurs Demo
time: 4/4

voice 1 {
  (C4/4 D4 E4 F4) |
  (G4/4 A4 B4 C5 | D5/4 E5 F5 G5) |
  A5/4 G5 F5 E5 |]
}
```

The `|` tokens inside a slur mark measure boundaries the same way they do
outside; the notes before and after each `|` belong to the respective
measures. The slur phrasing mark spans from the first note across all
measures to the last note.

Slurs round-trip to MusicXML: the first note of a slurred group emits
`<notations><slur type="start"/></notations>` and the last emits
`<notations><slur type="stop"/></notations>`. Slurs carry no timing —
durations and tick positions of slurred notes are identical to the same
notes written without the slur.
