import * as tools from '@/core/tools'
import * as sdk from '@/core/sdk'
import { store } from '@/core/store'

export async function initCore() {
  return new Promise(async resolve => {
    global.__$tools = tools
    global.__$sdk = sdk
    global.__$store = store

    resolve()
  })
}
