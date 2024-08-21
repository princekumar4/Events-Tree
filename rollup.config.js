import pkg from './package.json' with { type: "json" };
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default [
    {
        input: pkg.source,
        output: {
            file: pkg.main,
            format: 'es',
            sourcemap: devMode ? 'inline' : false
        },
        plugins: [
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    module: true,
                    toplevel: true,
                    unsafe_arrows: true,
                    drop_console: !devMode,
                    drop_debugger: !devMode
                },
                output: { quote_style: 1 }
            }),
            external(),
            nodeResolve({
                extensions: ['.js', '.jsx']
            }),
            commonjs(),
            replace({
                preventAssignment: false,
                'process.env.NODE_ENV': '"development"'
            }),
        ],
        external: [
            "react",
            "react-dom",
            "react-router-dom",
            /\.scss$/,
            /\.module.scss$/
        ]
    }
];