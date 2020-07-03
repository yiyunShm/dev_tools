/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */

import path from 'path'
import { Configuration, CliOptions } from 'electron-builder'
import devConfig from './dev.config'
import { exConsole } from './utils'

const ICON_ICO = path.resolve(__dirname, '../app/public/assets/app-icon/icon/icon@128.ico')
const ICON_PNG = path.resolve(__dirname, '../app/public/assets/app-icon/app-icon@256.png')
const ICON_ICNS = path.resolve(__dirname, '../app/public/assets/app-icon/icon/icon.icns')

const {
  npm_package_name: productName,
  npm_package_buildVersion: buildVersion,
  npm_package_appId: appId,
  npm_package_version: version,
} = process.env

const config: Configuration = {
  productName,
  buildVersion,
  appId,
  afterPack: async (ctx) => {
    var fs = require('fs')
    var localeDir = ctx.appOutDir + '/locales/'

    fs.readdir(localeDir, function (err: any, files: any) {
      //files is array of filenames (basename form)
      if (!(files && files.length)) return
      for (var i = 0, len = files.length; i < len; i++) {
        var match = files[i].match(/zh-CN\.pak/)
        if (match === null) {
          fs.unlinkSync(localeDir + files[i])
        }
      }
      exConsole.success('[AfterPack Complete]')
    })
  },
  files: ['app/dist', 'app/public', 'package.json'],
  asar: false,
  directories: {
    buildResources: 'app/public/assets',
    output: path.join(devConfig.release, `${productName}-release-v${version}`),
  },
  win: {
    icon: ICON_PNG,
    artifactName:  `biubiubiu.exe`,
    target: [{
      "target": "portable",
      "arch": [
        "ia32"
      ]
    }],
    extraResources: [
      {
        "from": "./resources/regedit/",
        "to": "regedit"
      }
    ]
  },
  mac: {
    icon: ICON_ICNS,
  },
  dmg: {
    icon: ICON_ICNS,
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
  },
  linux: {
    icon: ICON_ICNS,
    target: ['deb', 'rpm', 'AppImage'],
    category: 'Development',
  },
  // nsis配置不会影响自动更新功能，但是可以优化用户体验，比如是否允许用户自定义安装位置、是否添加桌面快捷方式、安装完成是否立即启动、配置安装图标等
  nsis: {
    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
    oneClick: true,
    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
    allowElevation: true,
    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
    // allowToChangeInstallationDirectory: true,
    // 安装图标
    installerIcon: ICON_ICO,
    // 图标名称
    shortcutName: "调试工具",
    // 卸载图标
    uninstallerIcon: ICON_ICO,
    // 安装时头部图标
    installerHeaderIcon: ICON_ICO,
    // 创建桌面图标
    createDesktopShortcut: true,
    // 创建开始菜单图标
    createStartMenuShortcut: true
    // electron中LICENSE.txt所需要的格式，并非是GBK，或者UTF-8，LICENSE.txt写好之后，需要进行转化，转化为ANSI
    // license: 'LICENSE.txt'
    // "script" : "build/script/installer.nsh" // NSIS脚本的路径，用于自定义安装程序。 默认为build / installer.nsi  
  }
}


const packageConfig: CliOptions = {
  config
}

export default packageConfig
