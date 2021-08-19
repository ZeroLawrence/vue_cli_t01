import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
//用于响应组件动作
const actions={}
//用于对数据进行加工（处理）
const mutations={}
//用于存储数据
const state={}
//创建store
export default Vuex.Store({
    actions,
    mutations,
    state
})
//向外部暴露
