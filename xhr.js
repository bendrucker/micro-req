'use strict'

var xhr = require('xhr')
var statusCodes = require('builtin-status-codes')
var extend = require('xtend')
var format = require('simple-format')
var RequestError = require('./error')

module.exports = function sendXhr (url, options, callback) {
  xhr(extend(options, {url: url}), function (err, response, body) {
    var statusCode = response.statusCode
    if (statusCode < 200 || statusCode > 299) {
      var statusDescription = statusCodes[statusCode] || 'Unknown Error'
      var message = format('%s %s response code is %s (%s)', options.method, statusCode, statusDescription)
      err = new RequestError(message, err)
    }
    callback(err, body, response)
  })
}
