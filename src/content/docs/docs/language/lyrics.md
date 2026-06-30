---
title: Lyrics
description: Syllables, hyphenation, melisma, and verse numbers.
---

A lyric syllable attaches to a single note or chord as a trailing,
backtick-quoted marker, written after duration/tie/articulations:

```clave
C4/4`Joy` D4`ful,` E4`joy`
```

Backticks were chosen over double quotes because `"` is already the
staccatissimo articulation token — a quoted-string syntax using `"` would
collide with that bare keyword. Backtick is otherwise unused in the grammar.

## Hyphenation

A syllable that continues into the following note's syllable is marked with
a trailing `-` written *inside* the backticks, immediately before the
closing backtick:

```clave
C4`con-` D4`tin-` E4`ued`
```

This lowers to MusicXML `<syllabic>begin|middle|end</syllabic>` (a syllable
with no hyphen on either side is `single`) and to MEI's lyric `<syl>` with a
matching `wordpos`/`con` convention.

## Melisma (extend)

A syllable held across multiple notes — one syllable, several pitches — is
marked with a trailing `_` written *inside* the backticks, immediately
before the closing backtick, on the **first** note of the held syllable.
Subsequent notes carry no new lyric syllable at all; the melisma continues
until the next note that does carry a lyric syllable (or the voice ends):

```clave
C4`held_` D4 E4 F4`next`
```

Here `held` is sung across `C4`, `D4`, and `E4`; `next` begins fresh on
`F4`. This lowers to MusicXML `<extend>` inside the `<lyric>` of the
syllable-bearing note, and to MEI's `<verse>`/`<syl>` analogous extension
marker.

Combining the hyphen and extend markers on one syllable is not supported — a
syllable is either hyphenated to the next syllable or extended across
multiple notes, never both.

## Verse number

A syllable may be prefixed with a verse number (a bare integer immediately
before the backtick, no space) to assign it to a specific verse. A syllable
with no verse-number prefix is verse 1:

```clave
C4`Joy` D4`ful,`            // verse 1 (implicit)
C4 1`Joy` 2`Freu` D4 1`ful,` 2`de,`   // explicit verse 1 and verse 2
```

A single note may carry more than one lyric syllable — one per verse — by
writing multiple backtick-quoted markers in sequence, each with its own
verse number. This lowers to multiple MusicXML `<lyric number="N">` elements
per note and multiple MEI `<verse n="N">` elements per note.

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

```clave title="lyrics-tuplet.clave"
title: Lyrics with Tuplets
time: 4/4

voice 1 {
  C4/4`Sing-` 3[D4 E4 F4]/8 G4/4`a` A4/4`song` |
  B4/4`with` 3[A4 G4 F4]/8 E4/4`a` 2`zwei` D4/4`tune` |]
}
```

A lyric-bearing note can be immediately followed by a tuplet — the leading
`N` of the tuplet is not mistaken for the previous note's lyric verse
number. Tuplet members are plain pitches (no per-member lyrics), so
syllables sit on the notes around the bracket.
