import * as sdk from '@/core/sdk'

declare global {
  type Sdk = typeof sdk

  const $sdk: Sdk

  namespace NodeJS {
    interface Global {
      __$sdk: Sdk
    }
  }
}
