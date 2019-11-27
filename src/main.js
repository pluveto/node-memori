

// basic
import Vue from 'vue'
import App from './App.vue'

// Bulma UI
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// font awesome
import 'font-awesome/css/font-awesome.css'
import '@mdi/font/css/materialdesignicons.min.css'
import './fonts/fonts.css'
// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// State manager
import Vuex from 'vuex'
Vue.use(Vuex)

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

import back from './plugins/backend'

const store = new Vuex.Store({
  state: {
    collections: []
  },
  mutations: {
    updateCollections(state, callback) {
      back.getCollections(function (data) {
        Vue.set(state, 'collections', data)
        //state.collections = data;
        console.log("updateCollections flushed");
        if (callback != null) {
          callback()
          console.log("updateCollections callback called")
        }
      });
    }
  }

})

Vue.config.productionTip = false
import router from './router'
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
