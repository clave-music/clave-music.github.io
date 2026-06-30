// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://clave-music.github.io',
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: 'Clave',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/clave-music' }],
			sidebar: [
				{
					label: 'Overview',
					items: [{ slug: 'docs' }],
				},
				{
					label: 'Guides',
					items: [
						{ autogenerate: { directory: 'docs/guides' } },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'docs/reference' } }],
				},
			],
		}),
	],
});
