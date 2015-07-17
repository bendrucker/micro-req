'use strict'

var assign = require('xtend/mutable')
var NestedError = require('nested-error-stacks')
var inherits = require('inherits')

module.exports = RequestError

function RequestError (message, nested) {
  NestedError.call(this, message, nested)
  assign(this, nested, {nested: this.nested})
}
inherits(RequestError, NestedError)
RequestError.prototype.name = 'RequestError'
