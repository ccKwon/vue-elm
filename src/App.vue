<template>
  <div id="app">
    <div class="app-container">
      <mt-header fixed title="订餐">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
    </div>

    <transition>
      <router-view></router-view>

    </transition>

    <div v-if="$route.meta.Alive">
      <van-tabbar class="app-footer" route>
        <van-tabbar-item replace to="/" icon="wap-home-o">
          首页
        </van-tabbar-item>
        <van-tabbar-item replace to="/orders" icon="orders-o">
          订单
        </van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>


  </div>
</template>

<script>

  export default {
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    // background-color: #f5f5f5
  }

  #app {
    // position: absolute;
    // right: 0;
    // left: 0;
    // top: 0;
    // bottom: 0;
    padding-top: 40px;
    // background-color: #f5f5f5;

  }

  // .v-enter {
  //   opacity: 0;
  //   transform: translateX(100%);
  // }

  // .v-leave-to {
  //   opacity: 0;
  //   transform: translateX(-100%);
  //   position: absolute;

  // }

  // .v-enter-active,
  // .v-leave-active {
  //   transition: all 0.5s ease;
  // }
</style>