import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let cart = JSON.parse(localStorage.getItem('foodcart') || '[]')
export default new Vuex.Store({

  state: {
    Cart: cart
  },
  mutations: {
    addtocart(state, val) {
      let flag = false;
      // 如果购物车中有这个商品 则只增加数量

      state.Cart.some(item => {
        if (item.id == val.id && item.shopId == val.shopId) {
          item.count += 1;
          flag = true;
          return true;
        }
      })

      if (!flag) {
        state.Cart.push(val);
      }

      localStorage.setItem("foodcart", JSON.stringify(state.Cart));
    },

    addtocartByid(state, val) {
      state.Cart.some(item => {
        if (item.id == val.id && item.shopId == val.shopid) {
          item.count += 1;
          return true;
        }
      })
      localStorage.setItem("foodcart", JSON.stringify(state.Cart));
    },

    subfood(state, val) {
      state.Cart.some((item, index) => {
        if (item.id == val.id && item.shopId == val.shopid) {
          item.count -= 1;
          if (item.count == 0) {
            state.Cart.splice(index, 1);
          }
          return true;
        }
      })
      localStorage.setItem("foodcart", JSON.stringify(state.Cart));
    },


    clearshopcart(state, shopid) {
      var i = 0
      var j = 0
      for (let index = 0; index < state.Cart.length; index++) {
        if (state.Cart[index].shopId == shopid) {
          state.Cart.splice(index, 1);
          i++;
          index = index - i;
          if (index < 0) {
            index = 0
          }
        }
      }
      localStorage.setItem("foodcart", JSON.stringify(state.Cart));
    }

  },
  actions: {
  },

  getters: {
    getAomunt(state) {
      return function (shopid) {
        var sum = 0;
        state.Cart.forEach(item => {
          if (item.shopId == shopid) {
            sum += item.count * item.price;
          }
        })
        return sum;
      }
    }
  },

  modules: {
  }
})
