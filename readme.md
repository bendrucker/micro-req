# micro-req [![Build Status](https://travis-ci.org/bendrucker/micro-req.svg?branch=master)](https://travis-ci.org/bendrucker/micro-req)

> Tiny (bytes and API) http interface for Node and the browser

At 3.5k minified and gzipped, you get Node-compatible code without the ~50kb most Node HTTP libraries weigh when browserified. The byte savings mostly comes from abandoning support for streaming HTTP, Buffers, and other features.

## Install

```
$ npm install --save micro-req
```


## Usage

```js
var request = require('micro-req')

request('http://apple.com', console.log)
//=> {body: '<html>...</html>', statusCode: 200, headers: {...}}
```

## API

#### `request(url, [options], callback)` -> `undefined`

##### url

*Required*  
Type: `string`

The URL to request.

##### options

###### method

Type: `string`  
Default: `'GET'`

The HTTP method to use to perform the request.

###### headers

Type: `object`  
Default: `{}`

HTTP headers.

###### json

Type: `boolean`  
Default: `false`

When `true`, the `Accept` and `Content-Type` headers will be sent as `'application/json'`, the request body will be passed to `JSON.stringify` and the response will be parsed with `JSON.parse`.


###### body

Type: `any`

The request body to transmit.

###### timeout

Type: `number`  
Default: `0`

A request timeout to apply in milliseconds. Timeouts are considered an error.

#### callback

*Required*  
Type: `function`  
Arguments: `err, response`

The `response` contains:

###### body

Type: `any`

The parsed response body.

###### statusCode

Type: `number`

The HTTP response code.

###### headers

Type: `object`

The HTTP response headers.

---

#### `request.get(url, [options], callback)`
#### `request.post(url, [options], callback)`
#### `request.put(url, [options], callback)`
#### `request.patch(url, [options], callback)`
#### `request.head(url, [options], callback)`
#### `request.delete(url, [options], callback)`

Convenience methods instead of setting `options.method` directly.

## License

MIT © [Ben Drucker](http://bendrucker.me)
