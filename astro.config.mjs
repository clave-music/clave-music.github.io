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
      logo: { src: './public/brand/clave-wordmark.svg', replacesTitle: true },
      favicon: '/favicon-32.png',
      components: { Head: './src/components/Head.astro' },
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
      // social: [
      //   { icon: 'github', label: 'GitHub', href: 'https://github.com/clave-music' },
      // ],
      editLink: {
        baseUrl: 'https://github.com/clave-music/clave-music.github.io/edit/main/',
      },
      sidebar: [
        { label: 'Getting Started', slug: 'docs/getting-started' },
        {
          label: 'Language',
          items: [
            { label: 'Metadata', slug: 'docs/language/metadata' },
            { label: 'Pitches & Durations', slug: 'docs/language/pitches-and-durations' },
            { label: 'Rests', slug: 'docs/language/rests' },
            { label: 'Chords & Tuplets', slug: 'docs/language/chords-and-tuplets' },
            { label: 'Ties & Slurs', slug: 'docs/language/ties-and-slurs' },
            { label: 'Directives & Articulation', slug: 'docs/language/directives-and-articulation' },
            { label: 'Lyrics', slug: 'docs/language/lyrics' },
            { label: 'Measures & Barlines', slug: 'docs/language/measures-and-barlines' },
            { label: 'Voices, Staves & Instruments', slug: 'docs/language/voices-staves-instruments' },
          ],
        },
        { label: 'Examples', slug: 'docs/examples' },
      ],
    }),
  ],
});
