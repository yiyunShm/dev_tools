import { initCore } from '@/core/main.init'
import { initServer } from '@/main/server'

async function startApp() {
  await initCore()
  
  initServer()
  await import('./main')
}

startApp()