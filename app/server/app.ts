import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'

import routes from './routes'
import log from './routes/logger'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// static
app.use(express.static($tools.PUBLIC_PATH))

app.use('/', routes)
app.use('/logger', log)

// catch 404 and forward to error handler
app.use((req: any, res: any, next: Function) => {
  let err: any = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: any, res: any, next: Function) => {
    res.status(err.status || 500)
    res.send(JSON.stringify(err))
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: any, res: any, next: Function) => {
  res.status(err.status || 500)
  res.send(JSON.stringify(err))
})

export default app