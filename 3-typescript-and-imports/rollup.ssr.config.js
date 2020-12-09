import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

export default {
	input: 'src/App.svelte',
	output: {
		sourcemap: true,
		format: 'umd',
		name: 'app',
		file: 'public/build/ssr.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: true,
				generate: "ssr",
			}
		}),
		css({ output: 'ssr.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
	],
	watch: {
		clearScreen: false
	}
};
