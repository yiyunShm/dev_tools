import path from 'path'

const devConfig = {
  host: '127.0.0.1',
  port: 8998,
  mainSource: path.resolve(__dirname, '../app/main'),
  mainDist: path.resolve(__dirname, '../app/dist'),
  rendererSource: path.resolve(__dirname, '../app/src'),
  rendererDist: path.resolve(__dirname, '../app/public/src'),
  template: path.resolve(__dirname, '../app/src/index.html'),
  release: path.resolve(__dirname, '../release'),

  proxy: {},

  env: {
    // mock 环境变量
    mock: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'logger.cn',
        API_BASE_PATH: '/',
      },
    },

    // dev 环境变量 (npm run dev 将使用此配置)
    dev: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'logger.cn',
        API_BASE_PATH: '/',
      },
    },

    // prod 环境变量 (npm run build 将使用此配置)
    prod: {
      variables: {
        API_PROTOCOL: 'http://',
        API_HOST: 'logger.cn',
        API_BASE_PATH: '/',
      },
    },
  },
}

export default devConfig
