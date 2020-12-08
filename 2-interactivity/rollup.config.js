import svelte from 'rollup-plugin-svelte';
import dev from 'rollup-plugin-dev'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				dev: true,
				hydratable: true
			}
		}),
		css({ output: 'bundle.css' }),

		dev({
			dirs: ['public'],
			proxy: { '/api': 'http://www.recipepuppy.com/api/'},
		}),

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

		livereload('public'),
	],
	watch: {
		clearScreen: false
	}
};
