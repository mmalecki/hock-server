'use strict'

const http = require('http')
const https = require('https')
const Hock = require('hock')

module.exports = class HockServer extends Hock {
  constructor() {
    super()
    this.server = null;
  }

  async listen(port, host, protocol) {
    const proto = ({ http, https })[(protocol || 'http').replace(/:^/, '')]
    this.server = proto.createServer(this.handler)
    return new Promise(resolve => {
      this.server.listen(port, host, () => resolve())
    })
  }

  done() {
    super.done()
    this.server.close()
  }

  async waitUntilDone() {
    return new Promise(resolve => {
      this.on('done', resolve)
      this.server.close()
    })
  }
}
