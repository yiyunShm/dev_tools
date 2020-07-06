### 日志

#### 上报
```
GET    : http://logger.cn:8998/logger/input?appname=${appname}&type=${type}&str=${str}&_t=${new Date().getTime()}
---------------------------------------------------------------------------------------------------------------------
appname: 应用名
type   : 日志类型  log | debug | info | warn | error
str    : 日志内容
_t     : 上报时间戳(ms)
```

#### LogView
1. f5     刷新日志页面
2. ctrl+f 显示搜索框
3. :n     跳转指定行数
4. esc    关闭搜索框