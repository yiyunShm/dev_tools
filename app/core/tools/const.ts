import { BrowserWindowConstructorOptions } from 'electron'
import { asPublicPath } from './path'

export const APP_NAME = "wpstools"
export const APP_HEAD = asPublicPath('assets/app-icon/app-head.png')
export const APP_ICON = asPublicPath('assets/app-icon/app-icon@256.png')

export const DEFAULT_INITIAL_CONFIG: CreateConfig = {
  showSidebar: false,
  showTitlebar: true,
  autoShow: true,
  delayToShow: 50,
  single: true,
  openDevTools: false
}

/** 创建新窗口时默认加载的选项 */
export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  icon: APP_HEAD,
  minWidth: 200,
  minHeight: 200,
  width: 800,
  height: 600,
  show: false,
  hasShadow: true,
  webPreferences: {
    nodeIntegration: true,
    scrollBounce: true,
    devTools:true
  },
  // titleBarStyle: 'hidden', // 隐藏标题栏, 但显示窗口控制按钮
  // frame: process.platform === 'darwin' ? true : false, // 无边框窗口
  // frame: false, // 无边框窗口
  skipTaskbar: false, // 是否在任务栏中隐藏窗口
  // backgroundColor: '#fff',
  // transparent: true, // 窗口是否透明
  // titleBarStyle: 'default',
  vibrancy: 'selection', // 毛玻璃效果
  // thickFrame:false,
}