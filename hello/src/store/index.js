import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//应用Vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters 
})