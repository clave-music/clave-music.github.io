// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://clave-music.github.io',
	integrations: [
		starlight({
			title: 'Clave',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/clave-music' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'docs/guides/example' },
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
