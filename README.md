### 日志上报
```
GET    : http://logger.wps.cn:8998/logger/input?appname=${appname}&type=${type}&str=${str}&_t=${new Date().getTime()}
---------------------------------------------------------------------------------------------------------------------
appname: 应用名
type   : 日志类型  log | debug | info | warn | error
str    : 日志内容
_t     : 上报时间戳(ms)
```