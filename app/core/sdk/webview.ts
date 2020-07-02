/**
 * 窗口相关
 */
import path from 'path'
import { BrowserWindow, BrowserWindowConstructorOptions, Rectangle, shell } from 'electron'
import { logger } from '@/core/tools'
import routes from '@/src/auto-routes'

const { NODE_ENV, port, host } = process.env

/** 创建新窗口相关选项 */
export interface CreateWindowOptions {
  /** 路由启动参数 */
  params?: any
  /** URL 启动参数 */
  query?: any,
  /** URL 完整链接 */
  url?: string,
  /** 失焦隐藏 */
  destroyOnBlur?: boolean,
  /** 使用缓存优先 */
  cacheFirst?: boolean,
  /** 守护进程 */
  daemon?: boolean,
  /** BrowserWindow 选项 */
  windowOptions?: BrowserWindowConstructorOptions
  /** 窗口启动参数 */
  createConfig?: CreateConfig
  hideOnBlur?: boolean
}

/** 已创建的窗口列表 */
const windowList: Map<RouterKey | string, BrowserWindow> = new Map()

/**
 * 通过 routes 中的 key(name) 得到 url
 * @param key
 */
function getWindowUrl(key: RouterKey, options: CreateWindowOptions = {}): string {
  let routePath = routes.get(key)?.path

  if (typeof routePath === 'string' && options.params) {
    routePath = routePath.replace(/\:([^\/]+)/g, (_, $1) => {
      return options.params[$1]
    })
  }

  const query = options.query ? $tools.toSearch(options.query) : ''
  return `http://127.0.0.1:8998/src/index.html#${routePath}${query}`
}

/**
 * 获取一个窗口实例, 成功返回 BrowserWindow 失败返回 null
 * @param key
 */
export function getWindowByKey(key: RouterKey | number): BrowserWindow | undefined {
  const win: BrowserWindow | undefined = typeof key === 'string' ? windowList.get(key) : BrowserWindow.fromId(key)
  if (win) {
    return win
  } else {
    return undefined
  }
}

/**
 * 创建一个内部view窗口
 * @param key routerkey
 * @param options
 */
export function create(key: RouterKey, options: CreateWindowOptions = {}): Promise<BrowserWindow | null> {
  return new Promise((resolve, rejct) => {
    const routeConfig: RouteConfig | AnyObj = routes.get(key) || {}

    const windowOptions: BrowserWindowConstructorOptions = {
      ...$tools.DEFAULT_WINDOW_OPTIONS, // 默认新窗口选项
      ...routeConfig.windowOptions, // routes 中的配置的window选项
      ...options.windowOptions, // 调用方法时传入的选项
    }

    const createConfig: CreateConfig = {
      ...$tools.DEFAULT_INITIAL_CONFIG,
      ...routeConfig.createConfig,
      ...options.createConfig,
    }

    const activedWin: BrowserWindow | undefined = windowList.get(key)

    if (activedWin) {

      if (createConfig.single) {
        resolve(activedWin)
      }
      if (options.cacheFirst) {
        resolve(activedWin)
      }
      if (createConfig.autoShow) {
        if (createConfig.delayToShow) {
          setTimeout(() => {
            activedWin.show()
            logger.debug(`Window <${key}:${activedWin.id}> is show.`)
          }, createConfig.delayToShow)
        } else {
          activedWin.show()
          logger.debug(`Window <${key}:${activedWin.id}> is show.`)
        }
      }
      return activedWin
    }

    const win = new BrowserWindow(windowOptions)

    //不显示在任务栏
    // win.setSkipTaskbar(true);

    // Webview url，内部view
    let url = getWindowUrl(key, options)

    // url 不合法则 reject
    if (url) {
      win.loadURL(url)
    } else {
      return rejct(null)
    }

    if (createConfig.saveWindowBounds) {
      const lastBounds = $tools.settings.windowBounds.get(key)
      if (lastBounds) win.setBounds(lastBounds)
    }

    if (createConfig.hideMenus) win.setMenuBarVisibility(false)
    if (createConfig.created) createConfig.created(win)

    win.webContents.on('dom-ready', () => {
      win.webContents.send('dom-ready', createConfig)
    })

    win.on('ready-to-show', () => {
      if (createConfig.autoShow) {
        if (createConfig.delayToShow) {
          setTimeout(() => {
            win.show();
          }, createConfig.delayToShow)
        } else {
          win.show();
        }
      }
      resolve(win)
    })

    win.once('show', () => {
      logger.debug(`Window <${key}:${win.id}> url: ${url} is opened.`)
    })

    win.on('close', () => {
      if (createConfig.saveWindowBounds && win) {
        $tools.settings.windowBounds.set(key, win.getBounds())
      }
      windowList.delete(key)
      logger.debug(`Window <${key}:${win.id}> is closed.`)
    })


    // 失焦隐藏
    win.on('blur', function () {
      if (options.destroyOnBlur) {
        win.destroy();
        if (createConfig.saveWindowBounds && win) {
          $tools.settings.windowBounds.set(key, win.getBounds())
        }
        windowList.delete(key);
      }
    })

    // 守护进程
    win.webContents.on('crashed', (e) => {
      logger.debug(`Window <${key}> is crashed.`)
      win.destroy()
      if (options.daemon) {
        setTimeout(() => {
          create(key, options)
          logger.debug(`Window <${key}> is restart.`)
        }, 5000)
      }
    })
  })
}

/**
 * 打开外部浏览器
 * @param url
 */
export function openExternal(url: string) {
  shell.openExternal(url)
}

/**
 * 设置一个已存在的窗口位置, 成功返回 BrowserWindow 失败返回 false
 * @param id
 */
export function setPosition(key: RouterKey | number, x: number, y: number): BrowserWindow | false {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    win.setPosition(x, y)
    return win
  } else {
    return false
  }
}

/**
 * 设置一个已存在的窗口大小, 成功返回 BrowserWindow 失败返回 false
 * @param key
 */
export function setSize(key: RouterKey | number, width: number, height: number): BrowserWindow | false {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    win.setSize(width, height)
    return win
  } else {
    return false
  }
}


/**
 * 激活一个已存在的窗口, 成功返回 BrowserWindow 失败返回 false
 * @param key
 */
export function show(key: RouterKey | number): BrowserWindow | false {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    win.moveTop();
    win.show()
    return win
  } else {
    return false
  }
}



/**
 * 隐藏一个已存在的窗口, 成功返回 BrowserWindow 失败返回 false
 * @param key
 */
export function hide(key: RouterKey | number): BrowserWindow | false {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    win.hide()
    return win
  } else {
    return false
  }
}

/**
 * 销毁一个已存在的窗口, 成功返回 true 失败返回 null
 * @param key
 */
export function destroy(key: RouterKey | number): boolean | null {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    if ( typeof key == "string"){
      $tools.settings.windowBounds.set(key, win.getBounds())
      windowList.delete(key)
    }
    win.destroy()
    return true
  } else {
    return false
  }
}

/**
 * 获取一个已存在的窗口可见性, 成功返回 boolean 失败返回 null
 * @param key
 */
export function isVisible(key: RouterKey | number): boolean | null {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    return win.isVisible()
  } else {
    return null
  }
}

/**
 * 获取一个已存在的窗口尺寸信息, 成功返回 Rectangle 失败返回 null
 * @param key
 */
export function getBounds(key: RouterKey | number): Rectangle | null {
  const win: BrowserWindow | undefined = getWindowByKey(key)
  if (win) {
    return win.getBounds()
  } else {
    return null
  }
}

declare global {
  namespace Electron {
    interface WebContents {
      /** 自定义事件: DOM 准备就绪 */
      send(channel: 'dom-ready', createConfig: CreateConfig): void
    }
  }
}
