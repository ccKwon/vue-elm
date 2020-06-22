<template>
    <div class="container">
        <div class="img">
            <img v-lazy="foodinfo.img" alt="foodinfo.img">
        </div>
        <div class="food_warp">
            <h2 class="food_title">
                {{foodinfo.fname}}
            </h2>
            <div class="food_rate">
                月售{{foodinfo.fsale}} 好评率{{foodinfo.rate}}%
            </div>
            <div class="food_price">
                ￥{{foodinfo.price}}
            </div>
            <span class="plus">
                <van-icon @click="addtocart(foodList, shopinfo.shopid)" color="white" size="12" name="plus" />
            </span>
        </div>

        <div class="food_infowarp">
            <h3 class="food_infotitle">商品简介</h3>
            <div class="food_info">{{foodinfo.finfo}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                foodinfo: [],
                params: {
                    "ver": "1.0",
                    "trace": false,
                    "prod": "test_loc_api",
                    "src": "baidu_loc_api",
                    "key": "O22LhI6C9YajXP5iYoluNrIae4QP5UB9",
                },
                url: 'https://api.map.baidu.com/locapi/v2 '

            }
        },

        created() {
            this.getfood();
        },


        methods: {
            getfood() {
                this.axios.get(this.$Api.getfooddeatil + this.$route.query.id)
                    .then(res => {
                        this.foodinfo = res.data;
                        console.log(this.foodinfo);
                    })
            },


        },


    }
</script>

<style lang="scss" scoped>
    .container {
        .img {
            width: 100vw;

            img {
                // width: 100%;
                width: 95vw;
                height: 300px;
                padding: 5px 10px;
                border-radius: 15px;

            }
        }


        .food_warp {
            padding: 10px;

            // background-color: #F7F7F7;
            .food_title {
                font-size: 24px;
                padding: 5px 0;
            }

            .food_rate {
                font-size: 10px;
                color: grey;
            }

            .food_price {
                margin-top: 5px;
                font-weight: 600;
                color: red;
                font-size: 20px;
            }
        }

        .food_infowarp {
            padding: 10px;

        }


    }
</style>