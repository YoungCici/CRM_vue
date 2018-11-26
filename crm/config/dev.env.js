'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.10.245:8912"'
  // BASE_API: '"http://cloud.hujia168.com:8912"'
})
