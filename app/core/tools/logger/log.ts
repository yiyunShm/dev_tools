import { configure, getLogger } from 'log4js'

configure({
  appenders: { dev_tools: { type: "file", filename: "dev_tools.log" } },
  categories: { default: { appenders: ["dev_tools"], level: "error" } }
})

export const logger = getLogger("dev_tools")