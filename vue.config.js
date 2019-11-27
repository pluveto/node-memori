const path = require('path')

const host = 'bupt.pluvet.com'
const port = 8080

module.exports = {
  lintOnSave: false,
  baseUrl: `http://${host}:${port}/`,

  devServer: {
    port,
    host,
    hotOnly: true,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  }
}
