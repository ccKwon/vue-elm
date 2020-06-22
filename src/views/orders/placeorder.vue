<template>
    <div>
        <div class="address">
            <span class="icon">
                <svg t="1576804418002" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="6366" width="18" height="18">
                    <path
                        d="M648.256 850.272a32 32 0 1 1-40.704-49.386667C758.304 676.693333 832 566.037333 832 471.072 832 293.344 688.693333 149.333333 512 149.333333c-176.693333 0-320 144.010667-320 321.738667 0 115.232 108.416 253.045333 329.173333 409.493333a32 32 0 0 1-37.013333 52.213334C248.021333 765.429333 128 612.853333 128 471.072 128 258.069333 299.882667 85.333333 512 85.333333s384 172.736 384 385.738667c0 118.378667-83.701333 244.053333-247.744 379.2zM512 618.666667c-82.474667 0-149.333333-66.858667-149.333333-149.333334s66.858667-149.333333 149.333333-149.333333 149.333333 66.858667 149.333333 149.333333-66.858667 149.333333-149.333333 149.333334z m0-64a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z"
                        p-id="6367" fill="#1296db"></path>
                </svg>
                <span>请添加一个收货地址</span></span>
            <span class="icon_arrow">
                <van-icon color="grey" name="arrow" /></span>
        </div>


        <div class="delivery_model">
            <h4>送达时间</h4>
            <section>尽快送达 | 预计 {{ time }}</section>
        </div>

        <div class="pay_way">
            <span>支付方式</span>
            <section>
                <span>在线支付</span>
                <span>
                    <van-icon color="grey" name="arrow" /></span>
            </section>
        </div>
        <div class="red">
            <span>红包</span>
            <span>暂不支持此功能</span>
        </div>

        <div class="shoptitle">
            <span>
                <img v-lazy="shopinfo.img" alt="">
            </span>
            <span>{{ shopinfo.name }}</span>
        </div>
        <div class="orderlist">
            <ul v-for="(item, index) in order" :key="index">
                <li>
                    <span class="food_name">{{ item.name }}</span>
                    <span class="food_count"> {{ item.count }} </span>
                    <span class="food_price">￥{{ item.count * item.price}}</span>
                </li>
            </ul>
        </div>

        <div class="canhe">
            <span class="title">餐盒</span>
            <span class="price">￥20</span>
        </div>
        <div class="delivery">
            <span class="title">配送费</span>
            <span class="price">￥{{ shopinfo.decost }}</span>
        </div>

        <div class="total_price">
            <span class="order_total">订单￥{{ sumprice }}</span>
            <span class="total">待支付￥{{ sumprice }}</span>
        </div>

        <div class="order_ps">
            <span>订单备注</span>
            <span>口味、偏好等
                <van-icon color="grey" name="arrow" /></span>
        </div>

        <div class="to_order">
            <span class="total_back">待支付￥{{ sumprice }}</span>
            <span @click="toorderPay()" class="confirm_order">确认下单</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: '',
                shopinfo: [],
                order: [],
                sumprice: 0,
            }
        },


        created() {
            this.settime(),
                this.getshoplist()

        },

        mounted() {},

        methods: {

            toorderPay() {
                this.$router.push({path: "/orderPay", query:{'orders': this.order, 'price': this.sumprice, 'devcost':this.shopinfo.decost, "shopid": this.$route.query.shopid}})
            },

            settime() {
                let date = new Date();
                var hour = date.getHours();
                if (hour < 10) {
                    hour = "0" + hour;
                }
                hour = hour * 1;
                var minutes = date.getMinutes();
                minutes += 30;
                if (minutes >= 60) {
                    hour = hour + 1
                    minutes = minutes - 60;
                    if (hour < 10) {
                        hour = "0" + hour;
                        hour = hour * 1;
                    }
                }
                this.time = hour + ":" + minutes
            },

            getshoplist() {
                this.axios.get(this.$Api.getshoplistbyid + this.$route.query.shopid).then(body => {
                    this.shopinfo = body.data
                    this.$store.state.Cart.forEach(item => {
                        if (this.shopinfo.shopid === item.shopId) {
                            this.order.push(item);
                        }
                    })
                    this.gettotalprice()
                })
            },

            gettotalprice() {
                this.order.some(item => {
                    this.sumprice += parseInt(item.count) * parseInt(item.price);
                })

                this.sumprice += 20;
                this.sumprice += this.shopinfo.decost;
            }

        },
    }
</script>


<style lang="scss" scoped>
    .address {
        height: 80px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;

        span {
            line-height: 80px;
            vertical-align: middle;
            font-size: 16px;
            color: #333333;
        }

        .icon {
            vertical-align: middle;
            // height: 18px;
            // width: 18px;
            svg {
                height: 18px;
                width: 18px;
            }
            span {
                margin-left: 5px;
            }
        }

        border-bottom: 1px solid rgb(223, 223, 223);
    }

    .delivery_model {
        height: 90px;
        margin-top: 15px;
        border-top: 1px solid rgb(223, 223, 223);
        border-bottom: 1px solid rgb(223, 223, 223);
        border-left: 5px solid #3190e8;
        display: flex;
        line-height: 90px;

        h4 {
            width: 170px;
            line-height: 90px;
            font-size: 19px;
            margin-left: 20px;
        }

        section {
            font-size: 17px;
            color: #3190e8;
        }
    }

    .pay_way {
        font-size: 18px;
        height: 50px;
        margin-top: 15px;
        border-top: 1px solid rgb(223, 223, 223);
        border-bottom: 1px solid rgb(223, 223, 223);
        color: #333333;
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        padding: 0 15px;
        // width: 80%;
        // margin: auto;

        section {
            span {
                margin-left: 5px;
            }

            .icon_arrow {
                vertical-align: middle;
            }
        }
    }


    .red {
        font-size: 18px;
        height: 45px;
        line-height: 45px;
        color: #333333;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
    }


    .shoptitle {
        font-size: 18px;
        margin-top: 10px;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
        display: flex;
        padding: 10px 20px;
        height: 32px;
        line-height: 32px;
        color: #333333;

        span {
            img {
                width: 35px;
                height: 35px;
                padding-right: 10px;
            }
        }
    }

    .orderlist {
        font-size: 18px;
        position: relative;
        margin-top: 10px;
        padding: 0 10px;
        width: 100%;
        color: #666666;

        ul {

            li {
                height: 40px;
                width: 100%;
                line-height: 40px;

                .food_name {
                    position: absolute;
                    left: 30px;
                }

                .food_count {
                    color: #FF6600;
                    position: absolute;
                    right: 140px;
                }

                .food_price {
                    position: absolute;
                    right: 40px;
                }
            }
        }
    }

    .canhe {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        padding: 0 10px;
        color: #666666;
    }

    .delivery {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        padding: 0 10px;
        color: #666666;
        border-bottom: 1px solid #dfdfdf;
    }

    .title {
        position: absolute;
        left: 30px;
    }

    .price {
        position: absolute;
        right: 20px;
    }

    .total_price {
        font-size: 20px;
        padding: 0 20px;

        .order_total {
            height: 42px;
            line-height: 42px;
            text-align: left;
            color: #666666;
        }

        .total {
            height: 42px;
            line-height: 42px;
            position: absolute;
            right: 20px;
            color: #FF6600;
        }

    }

    .order_ps {
        font-size: 16px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        color: #666666;
        border-bottom: 1px solid #dfdfdf;
        border-top: 1px solid #dfdfdf;
    }

    .to_order {
        margin-top: 40px;
        height: 46px;
        line-height: 46px;
        padding-left: 20px;
        background: #333333;
        display: flex;

        .total_back {
            color: white;
            font-size: 20px;
            width: 250px;
            display: inline-block;
        }

        .confirm_order {
            font-size: 20px;
            display: inline-block;
            width: 110px;
            text-align: center;
            color: white;
            background-color: #56D176;
        }
    }
</style>