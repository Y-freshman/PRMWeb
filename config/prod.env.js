'use strict'


const target = process.env.npm_lifecycle_event;
if (target == 'buildtest') {
  //测试打包，输入指令 npm run buildtest
  var obj = {
    NODE_ENV: '"production"',
    AUTH_API: '"http://testservice.zhengbang.com:8800"',
    PRM_GATEWAY:true,
    SERVICE_NAME : '"PRM"',
    BASE_API: '"http://testservice.zhengbang.com:8800/PRM"',
    PORTAL_API: '"http://testservice.zhengbang.com"'
  }
}else if(target == 'build') {
  //正式打包，输入指令
  // var obj = {
  //   NODE_ENV: '"production"',
  //  BASE_API: '"http://service.zhengbang.com"',
  // PORTAL_API: '"http://service.zhengbang.com/"'
  // }
  var obj = {
    NODE_ENV: '"production"',
    BASE_API: '"http://testservice.zhengbang.com:8800"',
    PORTAL_API: '"http://testservice.zhengbang.com"'
  }
}
/*module.exports = {
    NODE_ENV: '"production"',
    // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
   BASE_API: '"http://192.168.91.216:8800"',
    PORTAL_API: '"http://192.168.91.216/br/"'
     /!*BASE_API: '"http://service.zhengbang.com"',
    PORTAL_API: '"http://service.zhengbang.com/"'*!/
}*/

  module.exports = obj;
