---
title: Examples
description: Worked .clave scores covering every language feature.
---

Full source for every example below also lives in
[`clave-lang/examples`](https://github.com/clave-music/clave-lang/tree/main/examples).

## Articulations

Accent, tenuto, staccato, staccatissimo.

```clave title="articulations.clave"
title: Articulations Demo
time: 4/4

voice 1 {
  C4/4^ D4/4_ E4/4' F4/4" |
  [C4 E4 G4]/4^ [D4 F4 A4]/4' G4/2 |]
}
```

## Barline family

A normal barline (`|`), a double barline (`||`), and a final barline (`|]`).

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

## Clef changes

Header `clef:` sets a staff's initial clef; inline `clef name` changes clef
without consuming duration.

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

## Double dots

The first dot adds half the base value; the second dot adds half of the
first dot. A double-dotted half is 3.5 beats.

```clave title="double-dots.clave"
title: Double Dots Demo
time: 4/4
key: C

voice 1 {
  C4/2.. D4/8 |
  E4/4.. F4/16 G4/2 |]
}
```

## Dynamics and tempo

Dynamics directives (`@p`, `@f`, ...) and tempo (header `tempo:` and inline
`@tempo:N`).

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

## Lyrics with tuplets

A lyric-bearing note immediately followed by a tuplet — the leading `N` of
the tuplet is not mistaken for the previous note's lyric verse number.

```clave title="lyrics-tuplet.clave"
title: Lyrics with Tuplets
time: 4/4

voice 1 {
  C4/4`Sing-` 3[D4 E4 F4]/8 G4/4`a` A4/4`song` |
  B4/4`with` 3[A4 G4 F4]/8 E4/4`a` 2`zwei` D4/4`tune` |]
}
```

## Lyrics

Backtick-quoted syllables attached to notes, with hyphenation and melisma.

```clave title="lyrics.clave"
title: Ode to Joy (with Lyrics)
composer: Beethoven
time: 4/4
key: D major
tempo: 120

voice 1 {
  E4/4`Freu-` E4`-de,` F4`schö-` G4`-ner` |
  G4/4`Göt-` F4`-ter-` E4`-fun-` D4`-ken,` |
  C4/4`Toch-` C4`-ter` D4`aus` E4`E-_` |
  E4/2.`-ly-_` D4/4 |
  D4/4`Freu-` D4`-de,` E4`schö-` F4`-ner` |
  E4/4`Göt-` D4`-ter-` C4`-fun-` D4`-ken,` |
  E4/4`Toch-` D4`-ter` C4`aus` D4`E-_` |
  C4/2.`-ly-_` r/4 |]
}
```

## Mid-piece changes

Inline `@key:`, `@time:`, and `@tempo:` directives that take effect from
their position forward.

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

## Mixed markings

Ties (`~`), a slur, and per-note articulations — accent, tenuto, staccato —
all in one voice.

```clave title="mixed-markings.clave"
title: Markings Test
key: C major
time: 4/4

voice 1 {
  C4/2~ C4/4 D4^ |
  (E4/8 D4 C4 D4) E4/4_ F4' |
  F4/4~ F4/2 G4/4 |]
}
```

## Repeats and voltas

A repeated section (`|: ... :|`) with first- and second-ending alternatives
(`end1` / `end2`) that play on their respective passes.

```clave title="repeats-voltas.clave"
title: Simple Duo
composer: Anonymous
time: 4/4
key: G

voice 1 {
  |: C4/4 D4 E4 F4 :| end1 G4/4 A4 B4 C5 | end2 G4/4 A4 B4 C5 |]
}
```

## Slurs

Notes of different pitches grouped under one phrase mark; a slur may span
barlines.

```clave title="slurs.clave"
title: Slurs Demo
time: 4/4

voice 1 {
  (C4/4 D4 E4 F4) |
  (G4/4 A4 B4 C5 | D5/4 E5 F5 G5) |
  A5/4 G5 F5 E5 |]
}
```

## Solo flute

A single-instrument score: one `instrument` block wrapping one staff and one
voice.

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

## Ties

A trailing `~` joins a note to the next note of the same pitch into one
sustained sound, including across a barline.

```clave title="ties.clave"
title: Ties Demo
time: 4/4

voice 1 {
  C4/2~ | C4/2 D4/4 E4/4 | F4/4~ F4/4 G4/2 |]
}
```

## Tuplets

A leading integer before a bracketed group, with the per-event duration
after the bracket.

```clave title="tuplets.clave"
title: Tuplets Demo
time: 4/4

voice 1 {
  3[C4/8 D4 E4]/8 3[F4/8 G4 A4]/8 C5/4 D5/4 |
  3[C4/4 D4 E4]/4 G4/4 |]
}
```

## Violin & cello duo

A multi-instrument score: two `instrument` blocks that become separate
parts, the cello on a bass-clef staff.

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

## Whole-measure rest

Uppercase `R` fills exactly one full measure in the prevailing meter,
regardless of the note value that came before it.

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
