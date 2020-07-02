import http from 'http'
import app from './app'
import { logger } from '@/core/tools/logger';

let port = normalizePort(process.env.PORT || '8998')
app.set('port', port)

let server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: string) {
  let port: number = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val
  }

  // port number
  if (port >= 0) {
    return port
  }

  return false
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr: any = server.address()
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  logger.info ('Listening on ' + bind)
}