---
title: Getting Started
description: Install the Clave CLI and compile your first .clave file.
---

The `clave` CLI compiles `.clave` source files into MusicXML, MEI, or MIDI.

## Write a file

```clave title="hello.clave"
title: My Song
time: 4/4

voice 1 {
  C4/4 D4 E4 F4 | G4/2 E4/4 C4/4 |]
}
```

## Compile it

```sh
clave build hello.clave -f musicxml
```

This writes `hello.xml` next to the source file (the output filename is
derived from the input, or pass `-o <file>` to choose one explicitly).

### Options

| Flag | Meaning |
|------|---------|
| `-f, --format <name>` | Output format: `musicxml` (default), `mei`, or `midi`, depending on which plugins are installed. |
| `-o, --out <file>` | Output file path. Defaults to the input filename with the format's extension. |
| `--no-autobeam` | Skip automatic beam grouping of eighth notes and shorter; emit un-beamed. |

## Next steps

- Read the [language reference](/language/metadata/) for the full syntax.
- Browse the [examples](/examples/) for worked scores covering every feature.
