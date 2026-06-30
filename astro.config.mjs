// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import starlight from '@astrojs/starlight';

const claveGrammar = JSON.parse(readFileSync('./src/styles/clave.tmLanguage.json', 'utf-8'));
const claveTheme = JSON.parse(readFileSync('./src/styles/clave-theme.json', 'utf-8'));

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [
    starlight({
      title: 'Clave',
      favicon: '/favicon-32.png',
      customCss: ['./src/styles/starlight.css'],
      expressiveCode: {
        themes: [claveTheme],
        shiki: {
          langs: [claveGrammar],
          langAlias: { clave: 'clave', nota: 'clave' },
        },
        styleOverrides: {
          borderRadius: '0.75rem',
          borderColor: 'rgb(255 255 255 / 0.08)',
          codeBackground: '#161619',
          frames: {
            editorBackground: '#161619',
            terminalBackground: '#161619',
            editorTabBarBackground: '#111113',
            terminalTitlebarBackground: '#111113',
            frameBoxShadowCssValue: '0 25px 80px -50px rgba(0,0,0,0.9)',
          },
        },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/clave-music' },
      ],
      editLink: {
        baseUrl: 'https://github.com/clave-music/clave-music.github.io/edit/main/',
      },
      sidebar: [
        { label: 'Getting Started', slug: 'getting-started' },
        {
          label: 'Language',
          items: [
            { label: 'Metadata', slug: 'language/metadata' },
            { label: 'Pitches & Durations', slug: 'language/pitches-and-durations' },
            { label: 'Rests', slug: 'language/rests' },
            { label: 'Chords & Tuplets', slug: 'language/chords-and-tuplets' },
            { label: 'Ties & Slurs', slug: 'language/ties-and-slurs' },
            { label: 'Directives & Articulation', slug: 'language/directives-and-articulation' },
            { label: 'Lyrics', slug: 'language/lyrics' },
            { label: 'Measures & Barlines', slug: 'language/measures-and-barlines' },
            { label: 'Voices, Staves & Instruments', slug: 'language/voices-staves-instruments' },
          ],
        },
        { label: 'Examples', slug: 'examples' },
      ],
    }),
  ],
});
