const path = require('path')
const pkg = require(path.join(process.cwd(), 'package.json'))
const { sizeSnapshot } = require('rollup-plugin-size-snapshot')
function getPlugins(format) {
  const plugins = [
    // cleaner({
    //   targets: [`./build/${format}`]
    // }),
    // globals(),
    // builtins(),
    // resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    // commonjs(),
    // babel({
    //   babelrc: false,
    //   exclude: /node_modules/,
    //   runtimeHelpers: true,
    //   sourceMaps: false,
    //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   presets: ['@babel/preset-env', '@babel/typescript'],
    //   plugins: [
    //     '@babel/plugin-proposal-nullish-coalescing-operator',
    //     '@babel/plugin-proposal-optional-chaining',
    //     ['@babel/plugin-transform-runtime', { corejs: 3, useESModules: format === 'esm' }],
    //     '@babel/proposal-class-properties',
    //     '@babel/proposal-object-rest-spread'
    //   ]
    // }),
    // replace({ 'process.env.BUILD_FORMAT': JSON.stringify(format) }),
    sizeSnapshot(),
    // terser()
  ]

  return plugins
}

function isBareModuleId (id) {
  const dependencies = pkg.dependencies || {}
  console.log(dependencies, id)
  return (
    !id.startsWith('.') &&
    !id.includes(path.join(process.cwd(), 'src')) &&
    Object.keys(dependencies).some(item => id.includes(item))
  )
}
const input = 'src/index.js'
module.exports = [
  {
    input,
    output: { file: `build/cjs/index.js`, sourcemap: true, format: 'cjs' },
    external: isBareModuleId,
    plugins: getPlugins('cjs')
  },
  {
    input,
    output: { file: `build/esm/index.js`, sourcemap: true, format: 'esm' },
    external: isBareModuleId,
    plugins: getPlugins('esm')
  },
]