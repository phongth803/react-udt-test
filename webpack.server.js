const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env) => {
  const isProduction = env.production === true
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/server/index.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    node: {
      __dirname: false
    }
  }
}
