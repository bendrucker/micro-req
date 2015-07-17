'use strict'

var test = require('tape')
var request = require('./')

test('simple', function (t) {
  t.plan(3)
  request('https://api.github.com', function (err, response) {
    if (err) return t.end(err)
    t.equal(response.statusCode, 200)
    t.equal(typeof response.body, 'string')
    t.equal(typeof response.headers, 'object')
  })
})

test('json', function (t) {
  t.plan(3)
  request('https://api.github.com', {json: true}, function (err, response) {
    if (err) return t.end(err)
    t.equal(response.statusCode, 200)
    t.equal(typeof response.body, 'object')
    t.equal(typeof response.body.current_user_url, 'string')
  })
})

test('error', function (t) {
  t.plan(4)
  request('https://api.github.com/foo', {json: true}, function (err, response) {
    t.ok(err)
    t.equal(response.statusCode, 404)
    t.equal(typeof response.body, 'object')
    t.deepEqual(response.body, {
      message: 'Not Found',
      documentation_url: 'https://developer.github.com/v3'
    })
  })
})
