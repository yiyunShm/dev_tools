import React from 'react'
import reactDom from 'react-dom'
import { ipcRenderer } from 'electron'

import { initCore } from '@/core/render.init'
import App from './app'
import '@/src/styles/index.less'

initCore()

ipcRenderer.on('dom-ready', (_, createConfig) => {
  reactDom.render(<App createConfig={createConfig} />, document.getElementById('app'))
})
