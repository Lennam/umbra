const log4js = require('log4js')
const log2db = require('./log2db')
let logger = {}
let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')

log4js.configure({
    appenders: {
        error: {
            type: 'file',           //日志类型
            category: 'errLogger',    //日志名称
            filename: __dirname + '/../logs/error.log', //日志输出位置，当目录文件或文件夹不存在时自动创建
            maxLogSize: 104800, // 文件最大存储空间
            backups: 100  //当文件内容超过文件存储空间时，备份文件的数量
        },
        response: {
            type: 'dateFile',
            category: 'resLogger',
            filename: __dirname + '/../logs/responses/',
            pattern: 'yyyy-MM-dd.log', //日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: {
        error: {appenders: ['error'], level: 'error'},
        response: {appenders: ['response'], level: 'info'},
        default: { appenders: ['response'], level: 'info'}
    },
    replaceConsole: true
})

// 封装错误日志
log4js.errLogger = (ctx, error, resTime) => {
  if(ctx && error) {
      log2db('ErrorRequest', 'error', formatError(ctx, error, resTime))
      errorLogger.error(formatError(ctx, error, resTime))
  }
}
// 封装相应日志
log4js.resLogger = (ctx, resTime) => {
  if(ctx) {
      log2db('RequestInfo', 'info', formatRes(ctx, resTime))
      resLogger.info(formatRes(ctx, resTime))
  }
}


const formatError = (ctx, err,costTime) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body
  let userAgent = ctx.header.userAgent
  return {method, url, body, costTime, err}
}

const formatRes = (ctx,costTime) => {
  let method = ctx.method
  let url = ctx.url
  let body = ctx.request.body
  let response = ctx.response
  return {method, url, body, costTime, response}
}

module.exports = log4js