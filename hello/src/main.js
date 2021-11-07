import Vue from 'vue'
import App from './App.vue'
import store from './store'
import reouter from './router'
import router from './router'
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    reouter,
    router,

    beforeCreate() {
          Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
      }
}).$mount('#app')
