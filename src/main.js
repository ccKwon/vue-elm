import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
// import './config/rem'
import 'amfe-flexible'
// import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// import 'mint-ui/lib/index.js'
// Vue.use(Mint)

import { Swipe, SwipeItem, Header, Button,Navbar,TabItem, TabContainer, TabContainerItem  } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
import {Tabbar,TabbarItem, Search, Rate, Icon, Tab, Tabs} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Rate);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);


  // //解决移动端300ms延迟
  // FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
  loading: './assets/商圈.c54a18d9.png',
})

// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)

const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 10}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();



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
