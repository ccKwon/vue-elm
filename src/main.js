import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
Vue.use(Mint)

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)



import Api from "./api/API"
Vue.prototype.$Api = Api;

import BScroll from 'better-scroll'
// Vue.use(BScroll)

new Vue({
  router,
  store,
  Api,
  render: h => h(App)
}).$mount('#app')
