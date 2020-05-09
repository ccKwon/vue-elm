<template>
  <div>
    <div class="search">
      <van-search background="#26a2ff" shape="round" placeholder="输入商家、商品名称" v-model="search" />
    </div>
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../../images/1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../images/2.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../images/3.jpg" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>



    <mt-swipe :auto="0" class="food-swipe">
      <mt-swipe-item>
        <div class="foot-selected">
          <div>
            <ul>
              <li @click="to_shoplist"><img src="../../images/drinks.jpeg" alt="">甜品饮品</li>
              <li @click="to_shoplist"><img src="../../images/super.jpeg" alt="">商超便利</li>
              <li @click="to_shoplist"><img src="../../images/deliciousFood.jpeg" alt="">美食</li>
              <li @click="to_shoplist"><img src="../../images/simpleMeal.jpeg" alt="">简餐</li>
              <li @click="to_shoplist"><img src="../../images/new.jpeg" alt="">新店特惠</li>
              <li @click="to_shoplist"><img src="../../images/inTime.jpeg" alt="">准时达</li>
              <li @click="to_shoplist"><img src="../../images/breakfast.jpeg" alt="">预定早餐</li>
              <li @click="to_shoplist"><img src="../../images/rich.jpeg" alt="">推荐</li>
            </ul>
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="foot-selected">
          <div>
            <ul>
              <li @click="to_shoplist"><img src="../../images/drinks.jpeg" alt="">速食简餐</li>
              <li @click="to_shoplist"><img src="../../images/mala.jpeg" alt="">麻辣烫</li>
              <li @click="to_shoplist"><img src="../../images/cake.jpeg" alt="">米粉面馆</li>
              <li @click="to_shoplist"><img src="../../images/baozi.jpeg" alt="">包子粥店</li>
              <li @click="to_shoplist"><img src="../../images/fruits.jpeg" alt="">水果</li>
              <li @click="to_shoplist"><img src="../../images/hamburger.jpeg" alt="">汉堡披萨</li>
              <li @click="to_shoplist"><img src="../../images/sichuang.jpeg" alt="">特色小吃</li>
              <li @click="to_shoplist"><img src="../../images/Sushi.jpeg" alt="">寿司</li>
            </ul>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>




    <div class="shop_header">
      <span><img src="../../images/商圈.png" alt=""></span>
      <span>附近商家</span>
    </div>

    <div>
      <shoplist></shoplist>
    </div>

  </div>

</template>

<script>
  import shoplist from "../shopinfo/shoplist.vue"

  export default {
    data() {
      return {
        search: '',
        data: '',
        selected: '订单',
        value: 4.5
      }
    },

    methods: {

      to_shoplist() {
        this.$router.push('/shoplist')
        console.log(this.$store.state.username);
      },


    },

    components: {
      shoplist
    }
  }
</script>

<style lang="scss">
  .search {
    background: #3190e8;
  }

  .swipe {
    width: 100%;
    height: 180px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .food-swipe {
    height: 180px !important;
    .mint-swipe-indicators {
      bottom: 0px;
    }

    .mint-swipe-indicator.is-active {
      opacity: 0.8;
      background: #0277e4
    }
  }



  .foot-selected {
    height: 180px;
    // border-bottom: solid 1px;
    border-color: rgb(223, 223, 223);

    ul {
      // display: flex;
      list-style: none;

      li {

        width: 25%;
        height: 50%;
        float: left;
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        color: grey;
        font-weight: 400;

        img {
          width: 50px;
          height: 50px;
          // width: 100%;
          // display: flex;
          padding: 0 20px;
        }
      }
    }
  }

  .shop_header {
    margin-top: 10px;
    border-top: solid 1px;
    // border-bottom: solid 1px;
    border-color: rgb(223, 223, 223);
    // height: 50px;
    vertical-align: middle;
    font-weight: 400;
    padding: 10px;

    span {
      vertical-align: middle;
      font-size: 14px;
      color: grey;
      margin-right: 5px;

      img {

        width: 25px;
        height: 25px;
      }
    }
  }


  .shop_info {
    height: 70px;
    width: 100%;

    ul {
      padding: 10px 10px;
      list-style: none;
      margin-bottom: 40px;

      li {
        margin-bottom: 10px;

        span {
          display: block;

          // float: left;
          img {
            float: left;
            width: 60px;
            height: 60px;
          }

          h4 {
            width: 100%;
          }
        }

        .info_title {
          margin-left: 10px;

          p {
            display: flex;
            font-size: 10px;
            color: grey;
            justify-content: space-between;
            margin-top: 5px;

            section {
              display: inline-block;
            }

            .score {
              margin-left: 5px;
              vertical-align: middle;
              font-size: 12px;
              color: red;
            }

            .dev {
              background-color: #3190e8;
              color: white;
              padding: 2px 2px;
              border: 0.5px solid #3190e8;
            }

            .in_time {
              border: solid 0.5px #3190e8;
              color: #3190e8;
              padding: 2px 2px;
              margin-left: 1px;
            }

            .dev_time {
              color: #3190e8;
            }
          }
        }
      }
    }
  }
</style>