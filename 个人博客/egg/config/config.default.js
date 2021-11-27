/* eslint valid-jsdoc: "off" */

'use strict';
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635399923528_1264';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  // config/config.default.js
  config.security = {
    // 关闭csrf验证
    csrf: {
        enable: false,
    },
    // 白名单
    domainWhiteList: ['*']
  }
  // 配置指定的前端地址
  // config.cors = {
  //   origin: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  //   // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
  //   credentials: true, 
  // }

  
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'wangha',
    username:'root',
    password:'123'
  };
  
  config.jwt = {
    secret: "wangha"//自定义 token 的加密条件字符串
  };

  config.view = {
    defaultExtension:'nunjucks',
    mapping: {
      '.html': 'nunjucks' //左边写成.html后缀，会自动渲染.html文件
    }
  };
  config.static = {
    prefix:'/',
    dir:path.join(appInfo.baseDir,'app/public') //设置静态文件目录
  }
  config.rundir = process.cwd() + '/run'
  return {
    ...config,
    ...userConfig,
  };
};
