'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://localhost:8903"',
    // BASE_API: '"http://prm.freshman.top"',
    // AUTH_API: '"http://prm.freshman.top"',
    // PRM_API: '"http://prm.freshman.top"' ,
  // BASE_API: '"http://service.zhengbang.com"',
 // BASE_API: '"http://192.168.91.216:8800/PRM"',
 // BASE_API: '"http://testservice.zhengbang.com:8800"',
    PRM_GATEWAY:true,
    SERVICE_NAME : '"PRM"'

   //BASE_API: '"http://localhost:8903"'
})
