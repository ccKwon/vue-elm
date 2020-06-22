<template>
    <div>
        <div class="order_title">订单</div>

        <div v-for="(item, index) in orders" :key="index" class="order_container">
            <div class="orders_info">
                <div class="">
                    <span> <img :src="shop_name[index].img" alt=""></span>
                </div>
                <div class="title_time">
                    <span>
                        <section class="title"> {{ shop_name[index].name }}
                            <van-icon color="grey" style="vertical-align: middle;" size="12px" name="arrow" />
                        </section>
                        <section class="time">2019-02-02</section>
                    </span>
                </div>
            </div>
            <div class="goods_info">
                <span>{{ item.food_name }} 等商品</span>
                <span class="price">￥{{ item.total_price }}</span>
            </div>

            <hr>

            <div class="waittoPay">
                待支付
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                orders: '',
                shop_name: [],
            }
        },

        created() {
            this.selectorder()
        },

        
        methods: {
            
            selectorder() {

                console.log(localStorage.getItem("user"));
                this.axios.get(this.$Api.queryorders + JSON.parse(localStorage.getItem("user"))).then(body => {
                    this.orders = body.data;
                    console.log(this.orders);
                    // this.axios.get(this.$Api.getshoplistbyid + this.orders.)
                    this.orders.some(item => {
                        this.getshopname(item.shop_id);
                    })
                })

            },

            getshopname(id) {
                this.axios.get(this.$Api.getshoplistbyid + id).then(body => {
                    this.shop_name.push(body.data)

                })
            }
        },


    }
</script>


<style lang="scss">
    .order_title {
        padding: 10px 20px;
        font-size: 20px;
        font-family: "youyuan";
        font-weight: bolder;
    }

    .waittoPay {
        margin-top: 10px;
        position: relative;
        right: -285px;
        border-radius: 10px;
        width: 50px;
        height: 18px;
        font-size: 14px;
        text-align: center;

        color: #FF6600;
        border: 1px solid #FF6600;
    }

    .order_container {
        padding: 5px 20px;

        hr {
            width: 85%;
            // margin: auto;
            margin-left: 52px;
            margin-top: 20px;
            height: 1px;
            border-bottom: 1px solid #dddddd;
            border-top: none;
            border-left: none;
            border-right: none;
            text-align: right;
            // border-color: rgb(221, 221, 221);
        }

        .orders_info {
            // display: flex;
            // justify-content: space-between;

            div {
                display: inline-block;
                vertical-align: middle;

                img {
                    width: 45px;
                    height: 45px;
                }

                span {
                    vertical-align: middle;
                }
            }

            .title_time {
                margin-left: 10px;

                .title {
                    font-size: 16px;
                    margin-bottom: 3px;
                }

                .time {
                    font-size: 11px;
                    color: rgb(90, 90, 90);
                }
            }
        }

        .goods_info {
            display: flex;
            justify-content: space-between;
            padding-left: 50px;
            font-size: 13px;


            .price {
                color: #FF6600;
            }
        }
    }
</style>