import chalk from 'chalk'
import path from 'path'
import { build as electronBuilder } from 'electron-builder'
import { clearDir, exConsole } from '../utils'

import builderConfig from '../builder.config'
import devConfig from '../dev.config'
import webpackConfigMain from '../webpack.config.main'
import webpackConfigRenderer from '../webpack.config.renderer'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV as keyof typeof devConfig.env

async function buildMain() {
  return buildCommon({ env, webpackConfig: webpackConfigMain, type: 'main' }).then(() => {
    exConsole.success(`[Main Complete] : ${chalk.magenta.underline(path.resolve(devConfig.mainDist, 'main'))}`)
  })
}

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfigRenderer, type: 'renderer' }).then(() => {
    exConsole.success(
      `[Renderer Complete] : ${chalk.magenta.underline(path.resolve(devConfig.rendererDist, 'renderer'))}`
    )
  })
}

function build() {
  const { mainDist, rendererDist } = devConfig

  try {
    exConsole.info(chalk.cyanBright(`[Clear mainDir...] : ${chalk.magenta.underline(mainDist)}`))
    clearDir(mainDist, false, true)

    exConsole.info(chalk.cyanBright(`[Clear renderDir...] : ${chalk.magenta.underline(rendererDist)}`))
    clearDir(rendererDist, false, true)
  } catch (error) {
    exConsole.warn(error.message)
  }

  exConsole.info(`[Building...] : ${env} : ${process.env.NODE_ENV}`)

  Promise.all([buildMain(), buildRenderer()])
    .then(() => {
      electronBuilder(builderConfig)
        .then(res => {
          exConsole.success(`[Released] : ${res}`)
        })
        .catch(err => {
          throw new Error(err)
        })
        .finally(() => process.exit())
    })
    .catch(err => {
      throw new Error(err)
    })
}

build()
