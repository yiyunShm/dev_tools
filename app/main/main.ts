import { app, Tray, BrowserWindow } from 'electron'

$tools.logger.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

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