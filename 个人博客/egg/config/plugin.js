'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // config/plugin.js
    nunjucks :{
      enable: true,
      package: 'egg-view-nunjucks',
    },
    // cors :{
    //   enable: true,
    //   package: 'egg-cors',
    // },
    sequelize : {
      enable: true,
      package: 'egg-sequelize',
    },
    jwt: {
      enable: true,
      package: "egg-jwt"
    },
};
