import path from 'path'
import { Configuration } from 'webpack'

import webpackConfigBase from './webpack.config.base'
import devConfig from './dev.config'

const { mainDist, mainSource: appPath } = devConfig

const webpackConfig: Configuration = {
  ...webpackConfigBase,
  target: 'electron-main',

  entry: {
    main: path.join(appPath, 'index.ts'),
  },

  output: {
    path: mainDist,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.ts$/,
        loader: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
}

export default webpackConfig
