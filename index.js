'use strict'

var extend = require('xtend')
var send = require('./send')
var RequestError = require('./error')

module.exports = request

function request (url, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var method = options.method || 'GET'
  var headers = options.headers || {}
  var json = options.json
  var body = options.body
  var timeout = options.timeout

  if (json) {
    headers.Accept = headers.Accept || 'application/json'
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
    if (body) body = JSON.stringify(body)
  }

  send(url, {method: method, headers: headers, body: body, timeout: timeout}, onResponse)

  function onResponse (err, body, response) {
    if (body && json) {
      try {
        body = JSON.parse(body)
      } catch (e) {
        var parseErr = new RequestError(e.message, err)
        err = new RequestError('Parsing ' + url + ' response failed', parseErr)
      }
    }

    callback(err, {
      body: body,
      statusCode: response.statusCode,
      headers: response.headers
    })
  }
}

var methods = ['get', 'post', 'put', 'patch', 'head', 'delete']

methods.forEach(function (method) {
  request[method] = function (url, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    return request(url, extend(options, {method: method.toUpperCase()}), callback)
  }
})
