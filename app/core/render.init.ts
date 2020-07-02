import { remote } from 'electron'

export function initCore() {
  global.__$tools = remote.getGlobal('__$tools')
  global.__$sdk = remote.getGlobal('__$sdk')
  global.__$store = remote.getGlobal('__$store')
}
