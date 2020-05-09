<template>
    <div>

        <div class="shop_info">
            <ul>
                <li v-for="item in shoplist" :key="item.id" @click="to_shop(item.shopid)">
                    <span><img src="../../images/商圈.png" alt=""></span>
                    <span class="info_title">
                        <h4>{{ item.name }}</h4>
                        <p><span>
                                <van-rate style="vertical-align: middle" v-model="item.rate" :size="10" allow-half />
                                <section class="score">{{ item.rate }}</section>
                                <section>月售{{ item.sale }}</section>
                            </span> <span>
                                <section class="dev">蜂鸟专送</section>
                                <section class="in_time">准时达</section>
                            </span></p>
                        <p><span>￥{{ item.lowest }}起送 / 配送费约￥{{ item.decost }}</span> <span>{{ item.distance }}公里 /
                                <section class="dev_time"> 1小时5分钟</section></span>
                        </p>
                    </span>
                    <hr>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 4.5,
                shoplist: [],
                shopid: ''
            }
        },

        created() {
            this.getshoplist()
            // this.getinfo()
        },

        methods: {
            to_shop(id) {
                this.$router.push({path: '/shop', query:{'shopid': id}})
                // this.$router.push('/shop?id=' + id);
            },

            getshoplist() {
                this.axios.get(this.$Api.getshoplist).then(body => {
                    this.shoplist = body.data;
                })
            }
        },
    }
</script>


<style lang="scss">
    .shop_info {
        height: 70px;
        width: 100%;

        hr {
            // margin: auto;
            margin-top: 15px;
            margin-bottom: 13px;
            height: 1px;
            border-bottom: 1px solid #dddddd;
            border-top: none;
            border-left: none;
            border-right: none;
            text-align: right;
            // border-color: rgb(221, 221, 221);
        }

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

                        // padding: 10px 0;
                        section {
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 5px;
                        }

                        .score {

                            margin-left: 5px;
                            vertical-align: middle;
                            font-size: 10px !important;
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