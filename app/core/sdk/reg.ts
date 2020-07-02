/**
 * 注册表相关
 */
const regedit = require('regedit')
const path = require('path')

// Bugfix：https://www.npmjs.com/package/regedit#a-note-about-electron
// TODO vbsDirectory待测试构建结果
const vbsDirectory = path.resolve(process.execPath, './resources/regedit/vbs')
regedit.setExternalVBSLocation(vbsDirectory)
/**
 * 获取键
 * @param path 单个或多个
 */
export function list(path: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    regedit.list(path, function(err: any, data: any) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

/**
 * 创建键
 * @param path 单个或多个
 */
export function createPath(path: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    regedit.createKey(path, function(err: any) {
      if (err) {
        return reject(err)
      }
      resolve(true)
    })
  })
}

/**
 * 删除键
 * @param path 单个或多个
 */
export function deletePath(path: string | string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    regedit.deleteKey(path, function(err: any) {
      if (err) {
        return reject(err)
      }
      resolve(true)
    })
  })
}

/**
 * 更改键
 * @param data 键值对
 */
export function putValue(data: object): Promise<any> {
  return new Promise((resolve, reject) => {
    regedit.putValue(data, function(err: any) {
      if (err) {
        return reject(err)
      }
      resolve(true)
    })
  })
}