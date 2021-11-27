// /*
// 入口JS
//  */
// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'



// new Vue({
//   el: '#app',
//   render: h => h(App),
//   router, //使用上vue-router
//   store, // 使用上vuex
// })


import Vue from 'vue';

export let store =Vue.observable({count:0,name:'李四'});
export let mutations={
    setCount(count){
        store.count=count;
    },
    changeName(name){
        store.name=name;
    }
}