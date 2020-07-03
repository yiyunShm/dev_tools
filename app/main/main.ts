import { app, BrowserWindow } from 'electron'

init()

const argv = process.argv
if (argv.indexOf('--reload') > -1) {
  reload()
}

function init() {
  $tools.logger.info(`Application <${$tools.APP_NAME}> launched.`)

  app.allowRendererProcessReuse = true
  app.disableHardwareAcceleration();

  app.on('ready', () => {
    $sdk.Webview.create('logViewer')
  })

  app.on('activate', () => {})

  app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('before-quit', () => {
    $tools.logger.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  })
}

function reload() {
  $tools.logger.info(`Application <${$tools.APP_NAME}> reload.`)

  let wins = BrowserWindow.getAllWindows()
  if (wins.length) {
    for (let i = 0, len = wins.length; i < len; i++) {
      let win = wins[i]
      console.log('wins:', win)
      win.webContents.reload()
    }
  }
}
