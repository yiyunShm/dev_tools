import express from 'express'
import dateformat from 'dateformat'

let router = express.Router()
let tmpMap = {}

router.get('/output', (req, res) => {
	let ip = req.ip
	// 1. 设定头信息
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		"Connection": "keep-alive"
	})

	// 2. 输出内容，必须 "data:" 开头 "\n\n" 结尾（代表结束）
	let interval = setInterval(() => {
		if (!tmpMap[ip] || tmpMap[ip].length < 1) { return }

		let msg = tmpMap[ip].shift()
		if (msg) {
			res.write(`data: ${msg} \n\n`)
		}
	}, 10)

	res.on('close', () => {
		clearInterval(interval)
	})
})

router.get('/input', (req, res) => {
	let str = req.query.str || req.query.data
	let type = req.query.type || 'info'
	let appname = req.query.appname || 'test'
	let ip = req.ip

	if (!tmpMap[ip]) {
		tmpMap[ip] = []
	}

	while (tmpMap[ip].length > 500) {
		tmpMap[ip].shift()
	}

	tmpMap[ip].push(` ${dateformat(new Date(), 'HH:mm:ss')} | ${appname} | ${type} | ${str} `)
	res.send('success')
});

export default router