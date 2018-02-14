import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

let nameCache = {};
let minify = false;

export default {
	input: 'src/index.js',
	output: {
		file: 'build/app.js',
		format: 'iife',
		sourcemap: true,
	},
	external: [],
	plugins: [
		babel({
			babelrc: false,
			presets: [
				[
					'@babel/env', {
						targets: {
							browsers: ['last 2 versions', 'ie >= 11', 'safari >= 7'],
						},
						loose: true,
						modules: false
					}
				]
			],
			plugins: [
				['@babel/plugin-proposal-object-rest-spread'],
				['@babel/proposal-class-properties'],
				[ 
					'@babel/transform-react-jsx', { 
						pragma: 'h'
					}
				]
			]
		}),
		nodeResolve({ jsnext:true }),
		commonjs(),
		minify && uglify({
			output: { comments: false },
			compress: {
				keep_infinity: true,
				pure_getters: true
			},
			warnings: true,
			ecma: 5,
			toplevel: false,
			mangle: {
				properties: false
			},
			nameCache
		})
	]
};
