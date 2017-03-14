// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import envReplace from 'postcss-env-replace';
import cssnano from 'cssnano';

export default {
	entry: 'test/app/app.js',
	dest: 'test/app/build/app.js',
	format: 'iife',
	moduleName: 'notFrameworkTestApp',
	sourceMap: (process.env.NODE_ENV === 'production' ? false : 'inline'),
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		eslint({
			exclude: ['build/**', 'node_modules/**', 'css/**','js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		babel({
			exclude: ['build/**', 'node_modules/**', 'css/**','js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}), replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
		filesize()
	]
};
