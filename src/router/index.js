import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/index.vue'
import User from '../views/user/userPage.vue'
import Orders from '../views/orders/orders.vue'
import Login from '../views/login/login.vue'
import Shop from '../views/shop_deatil/shop_deatil.vue'
import userDeatil from '../views/user/user_deatil.vue'
import shopList from '../views/shopinfo/shoplist.vue'
import test from '../views/index/test.vue'
import updatepwd from '../views/user/updatepwd.vue'
import placeorder from '../views/orders/placeorder.vue'
import orderPay from '../views/orders/order_pay.vue'
import shoplogin from '../views/shopuser/shoplogin.vue'

Vue.use(VueRouter)

const routes = [


  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { Alive:true }

  },

  {
    path: '/user',
    name: 'user',
    component: User,
    meta: { Alive:true }

  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    meta: { Alive:true }

  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { Alive:true }

  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: { Alive:false}

  },
  {
    path: '/userDeatil',
    name: 'userDeatil',
    component: userDeatil,
    meta: { Alive:false }
  },
  {
    path: '/shoplist',
    name: 'shoplist',
    component: shopList,
    meta: { Alive:false }
  },
  {
    path: '/test',
    name: 'test',
    component: test,
    meta: { Alive: false }
  },
  {
    path: '/updatepwd',
    name: 'updatepwd',
    component: updatepwd,
    meta: { Alive: false }
  },
  {
    path: '/placeorder',
    name: 'placeorder',
    component: placeorder,
    meta: { Alive: false}
  },
  {
    path: '/orderPay',
    name: 'orderPay',
    component: orderPay,
    meta: { Alive: true}
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
