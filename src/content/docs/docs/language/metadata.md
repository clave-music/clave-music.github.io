---
title: Metadata
description: Header key/value lines at the top of a Clave file.
---

Key/value header lines at the top of the file, before any blocks:

```clave
title: "My Song"
composer: "My Name"
time: 3/4
key: G major
tempo: 96
```

A metadata line is `<key>: <value>`, one per line, where `<key>` is a bare
identifier (`A`–`Z`, `a`–`z`, `_`). The value runs to the end of the line, or
to a trailing `//` comment if one is present, and is read as free text with
surrounding whitespace trimmed; quotes are therefore **optional**, used only
for clarity or to preserve leading/trailing spaces. So `key: G major`,
`title: My Song`, and `title: "My Song"` are all valid, and `"My Song"` and
`My Song` denote the same string. Because the value is line-delimited,
embedded spaces and slashes need no escaping — `tempo: 96` and `time: 3/4`
are plain values.

**Metadata comes first.** All metadata lines must precede the first block. A
`key: value` line appearing after a block is an error — once a block opens,
the parser is no longer in header position.

## `time`

Sets the time signature used for measure-length validation (see
[Measures & Barlines](/docs/language/measures-and-barlines/)). It is
**required**; omitting it is an error.

## `key`

Sets the key signature emitted in the output (MusicXML `<fifths>` and
`<mode>`). Supported forms:

- `<Tonic> major` — e.g. `G major`, `Bb major`, `F# major`
- `<Tonic> minor` — e.g. `A minor`, `E minor`, `F# minor`
- Bare `<Tonic>` — treated as major, e.g. `key: C` is C major

Tonic names use standard letter notation with accidentals written as `#`
(sharp) or `b` (flat): `C`, `G`, `D`, `A`, `E`, `B`, `F#`, `C#` for sharp
keys; `F`, `Bb`, `Eb`, `Ab`, `Db`, `Gb`, `Cb` for flat keys. Minor tonics map
to their relative major's fifths count (A minor = 0 fifths, E minor = 1, D
minor = −1, etc.). When `key:` is absent or unparseable, the output defaults
to C major (`<fifths>0</fifths>`) — but an unparseable value (unknown tonic,
unsupported mode like `dorian`, a typo like `majorrrr`) is still flagged as a
validation error, so a typo doesn't silently produce a different valid key.

The `key` value does **not** alter how pitches are read. This is permanent
and deliberate: every pitch's accidental is always explicit and absolute
(see [Pitches & Durations](/docs/language/pitches-and-durations/)), so a bare
`F4` is always F natural regardless of `key:`, never an implicit F# because
the key is G major. A consequence is that there is no natural sign in the
grammar — it would have nothing to cancel, since accidentals never carry
across notes or measures.

## `tempo`

Sets the score-wide initial tempo, in quarter notes per minute, e.g.
`tempo: 96`. Emits MusicXML `<sound tempo="96"/>` and MEI
`scoreDef[@midi.bpm="96"]`. Optional; when absent or unparseable (anything
other than a positive integer), no tempo markup is emitted. A mid-piece
tempo change uses the `@tempo:<bpm>` inline directive instead — see
[Directives & Articulation](/docs/language/directives-and-articulation/).

The colon `:` appears only in metadata key/value lines; block structure
(`staff`, `voice`) always uses braces, never a colon.

## Comments

`//` begins a line comment and runs to the end of the line:

```clave
C4/4 D4 E4 F4   // a measure of quarter notes
```

The comment marker is `//`, **not** `#` — `#` is the sharp accidental in
pitch tokens such as `F#4`, so using it for comments would make `F#4`
ambiguous with a pitch followed by a comment.

Comments may appear anywhere — on their own line or at the end of any line,
in the header, between blocks, or inside a voice. They are lexed away like
whitespace and do not count as content for metadata ordering purposes.
