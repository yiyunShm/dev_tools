/**
 * 固定字符串长度
 * @param n 要转换的内容
 * @param p 固定长度
 * @param r 补齐字符
 */
export function fixedStringLength(n: number | string, p?: number, r = '0'): string {
  let str = String(n)
  if (p && str.length !== p) {
    if (str.length >= p) {
      str = str.replace(new RegExp(`^(.{${p}})(.*)$`), '$1')
    } else {
      const lost = p - str.length
      if (lost > 0) {
        for (let i = 0; i < lost; i++) {
          str = r + str
        }
      }
    }
  } else {
    str = String(n)
  }

  return str
}

/** 获取 url 参数 */
export function getQuery(search: string): AnyObj {
  const query: AnyObj = {}

  search
    .substr(1)
    .split('&')
    .forEach(str => {
      const strArr = str.split('=')
      const key = strArr[0]

      if (!key) return query

      let val = decodeURIComponent(strArr[1]);
      try {
        val = JSON.parse(val)
      } catch (err){

      }
      query[key] = val
    })
  return query
}

/** 转换成 url search */
export function toSearch(obj: AnyObj): string {
  const arr = Object.keys(obj).map(key => {
    let val = obj[key]

    if (typeof val !== 'string') {
      try {
        val = JSON.stringify(val)
      } catch (err) {
      }
    }

    return `${key}=${encodeURIComponent(val)}`
  })
  return '?' + arr.join('&')
}
