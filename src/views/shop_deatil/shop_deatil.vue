/<template>
    <div>
        <div class="shop_title">
            <span class="shop_img"><img :src="shopinfo.img" alt=""></span>
            <span class="shop_info">
                <h2>{{ shopinfo.name }}</h2>
                <p>商家配送 / 配送费 ￥{{ shopinfo.decost }}</p>
                <p>公告：欢迎光临，用餐高峰请提前下单，谢谢</p>
            </span>
        </div>


        <mt-navbar v-model="selected">
            <mt-tab-item id="1">点餐</mt-tab-item>
            <mt-tab-item id="2">评价</mt-tab-item>
        </mt-navbar>
        <hr>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" class="content">
                <div class="menu-wrapper" ref="menuWrapper">
                    <ul>

                        <li v-for="(item, index) in goodlist" :key="index" class="menu-item"
                            :class="{'current': currentIndex === index }" @click="clickMenuItem(index)">
                            {{ item.gname }} </li>
                    </ul>
                </div>

                <div class="foods-wrapper" ref="foodWrapper">
                    <ul>
                        <li v-for="(item, index) in goodlist" :key="index" class="food-list">
                            <h4 class="title">{{ item.gname }}</h4>
                            <ul>
                                <li @click="toFoodDeatil(foodList.fid)" v-for="foodList in item.foodLists"
                                    :key="foodList.fid" class="food-item">
                                    <div class="icon">
                                        <img width="70px" height="70px" :src="foodList.img" alt="">
                                    </div>
                                    <div class="info-content">
                                        <h2 class="food-name">{{ foodList.fname }}</h2>
                                        <p class="desc">{{ foodList.finfo }}</p>
                                        <div class="rate">

                                            <span>月销售{{ foodList.fsale }}份 </span>
                                            <span> 好评率{{ foodList.frate }}%</span>
                                        </div>
                                        <div @click.stop class="price">
                                            <span class="food_price">￥{{ foodList.price }}</span>
                                            <span class="plus" @click="addtocart(foodList, shopinfo.shopid)">
                                                +
                                                <!-- <van-icon @click="addtocart(foodList, shopinfo.shopid)" color="white"
                                                    size="12" name="plus" /> -->
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="2" class="comment_list">
                <div class="comment_info">
                    <div class="score">
                        <span>{{ shopinfo.rate }}
                            <van-rate style="vertical-align: middle" v-model="star" size="0.3rem" allow-half /></span>
                        <span>味道 {{ shopinfo.tasterate }} 包装 {{ shopinfo.packrate }} 配送 {{ shopinfo.devrate }}</span>
                    </div>

                    <div class="score_info">
                        <ul class="primary">
                            <li>全部 {{ commentList.length }}</li>
                            <li>最新</li>
                            <li>好评 {{ shopinfo.good }}%</li>
                            <li>差评 {{ shopinfo.bad }}%</li>
                            <li>有图 229</li>
                        </ul>

                    </div>
                </div>

                <div v-for="item in commentList" :key="item.id" class="comments">
                    <div class="user_score">
                        <div>
                            <img src="../../images/user.jpg" alt="">
                        </div>
                        <div class="user_info">
                            <span>
                                <section>{{ item.username }}</section>
                                <section>2019-11-27</section>
                            </span>
                            <p>
                                <van-rate style="vertical-align: middle" v-model="item.rate" size="0.3rem" allow-half />
                            </p>
                        </div>

                        <!-- <span class="time"></span> -->

                    </div>
                    <div class="user_comment">
                        <span>
                            {{ item.comment }}
                        </span>
                        <span>
                            <!-- <img src="../../images/商圈.png" alt=""> -->
                        </span>

                    </div>
                </div>

            </mt-tab-container-item>
        </mt-tab-container>

        <div class="shopcart-container">
            <div @click="showcartclick()" class="cart_icon_container">
                <div class="inline" :class="{'inline_color':flag}">
                    <img src="../../images/cart_empty.png" alt="">
                </div>
            </div>
            <div @click="showcartclick()" class="money">
                <span class="sumprice">￥{{ this.$store.getters.getAomunt(shopinfo.shopid) }}</span>
                <span class="devcost">配送费￥{{ shopinfo.decost }}</span>
            </div>
            <!-- <div class="gotopay">
                还差￥{{ shopinfo.lowest }}起送
            </div> -->
            <div @click="toplaceorder(shopinfo.shopid)" class="gotopay" :class="{'gotopay_active':flag}">
                去结算
            </div>
        </div>

        <div v-if="showcart" :class="['cart_foodlist', {fadeInUp:showcart}, {fadeOutDown:!showcart}]">
            <header class="cart_title">
                <h4>购物车</h4>
                <span @click="clearshopcart(shopinfo.shopid)">清空</span>
            </header>

            <div class="cart_food_deatil">
                <ul v-for="(item, index) in foodcart" :key="index">
                    <li v-if="item.shopId == shopinfo.shopid" class="food_list">
                        <div class="food_name">{{ item.name }}</div>
                        <div class="food_price">￥{{ item.price }}</div>
                        <div class="food_num">
                            <span class="minus" @click="subfoodcartByid(item.id, item.shopId)">-</span>
                            <span class="number">{{ item.count }}</span>
                            <span class="plus" @click="addtocartByid(item.id, item.shopId)">+</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                star: 4.5,
                selected: '1',
                commentList: [],
                shopinfo: [],
                goodlist: [],
                scrolly: 0,
                scrollY: 0,
                tops: [],
                listHeight: [],
                loading: true,
                showcart: false,
                foodobject: {
                    "fid": '',
                    "fname": '',
                    "fprice": '',
                    "fnum": ''
                },
                // foodcart: JSON.parse(localStorage.getItem("foodcart"))

                foodcart: this.$store.state.Cart,
                flag: false,
                totalprice: '',
            }
        },

        mounted() {
            this.loading = false;
        },

        created() {
            this.getcomments(),
                this.getshoplist(),
                this.getgoodlist(),
                this.setshopcart()

        },


        computed: {
            currentIndex() { //计算到达哪个区域的区间的时候的对应的索引值
                for (let i = 0; i < this.tops.length; i++) {
                    let height = this.tops[i] //当前menu子块的高度
                    let height2 = this.tops[i + 1] //下一个menu子块的高度
                    //滚动到底部的时候,height2为undefined,需要考虑这种情况
                    //需要确定是在两个menu子块的高度区间
                    if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
                        return i //返回这个menu子块的索引
                    }
                }
            }
        },

        methods: {

            toFoodDeatil(id) {
                this.$router.push({
                    path: '/foodDeatil',
                    query: {
                        'id': id
                    }
                })
            },

            toplaceorder() {
                if (this.flag) {
                    this.$router.push({
                        path: '/placeorder',
                        query: {
                            'shopid': this.shopinfo.shopid
                        }
                    });
                }

            },

            // 一键清空购物车
            clearshopcart(shopid) {
                this.flag = false;
                this.showcart = false;
                this.$store.commit("clearshopcart", shopid);
            },

            // 计算总价格
            getsumprice() {
                this.totalprice = this.$store.commit("getAomunt", this.shopinfo.shopid)
            },


            // 商品列表中点击+号添加物品到购物车
            addtocart(val, shopid) {
                // 保存对应商品信息
                let foodobject = {
                    shopId: shopid,
                    id: val.fid,
                    name: val.fname,
                    count: 1,
                    price: val.price
                }

                this.$store.commit('addtocart', foodobject)
                this.setshopcart()

            },

            // 购物车中点击+号增加物品数量
            addtocartByid(id, shopid) {
                this.$store.commit('addtocartByid', {
                    id,
                    shopid
                })
            },

            // 购物车中点击-号减少物品数量
            subfoodcartByid(id, shopid) {
                this.setshopcart()

                this.$store.commit('subfood', {
                    id,
                    shopid
                })

            },


            // 检查购物车 检查本地缓存中是否有对应商家ID的购物车信息
            setshopcart() {
                // this.shopcart.push(this.foodobject);
                // console.log(JSON.stringify(this.shopcart));
                // localStorage.setItem("foodcart", JSON.stringify(this.shopcart));
                let cartList = JSON.parse(localStorage.getItem("foodcart"));
                // console.log(JSON.parse(localStorage.getItem("foodcart")));
                cartList.forEach((value, index) => {
                    if (value.shopId == this.$route.query.shopid) {
                        this.flag = true;
                    } else {
                        this.flag = false;
                    }
                })
            },

            showcartclick() {
                if (this.flag) {
                    this.showcart = !this.showcart

                }
            },


            _initScroll() {
                this.menuScroll = new BScroll('.menu-wrapper', {
                    click: true
                })

                this.commentScroll = new BScroll('.comment_list', {
                    probeType: 3,
                    click: true
                })

                this.foodsScroll = new BScroll('.foods-wrapper', {
                    probeType: 3,
                    click: true
                })

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y)) //滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
                })

                this.commentScroll.on('scroll', (pos) => {
                    this.scrolly = Math.abs(Math.round(pos.y)) //滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
                })
            },


            _initTops() {
                let top = 0;
                this.tops.push(top);
                const lis = this.$refs.foodWrapper.getElementsByClassName('food-list');
                for (let i = 0; i < lis.length; i++) {
                    top += lis[i].clientHeight;
                    this.tops.push(top)

                }
            },

            _initcommentTops() {
                let height = 0;
                this.listHeight.push(height);
                const commentlists = this.$refs.foodWrapper.getElementsByClassName('comment_list');
                for (let i = 0; i < commentlists.length; i++) {
                    height += commentlists[i].clientHeight;
                    this.listHeight.push(height)
                }

            },

            clickMenuItem(index) {
                const scrollY = this.tops[index];
                this.scrollY = scrollY;
                this.foodsScroll.scrollTo(0, -scrollY, 300);
            },


            // 获取评论信息
            getcomments() {
                this.axios.get(this.$Api.getcomments + this.$route.query.shopid).then(body => {
                    this.commentList = body.data;
                })

            },

            // 获取商家的详细信息
            getshoplist() {
                this.axios.get(this.$Api.getshoplistbyid + this.$route.query.shopid).then(body => {
                    this.shopinfo = body.data
                    console.log(this.shopinfo);
                })
            },

            // 获取商品列表
            getgoodlist() {
                this.axios.get(this.$Api.goodlist).then(body => {
                    this.goodlist = body.data;
                    // this.$nextTick(() => {
                    //     this._initScroll();
                    //     this._initTops();
                    // })
                    this.$nextTick(() => {
                        this._initScroll()
                        this._initTops()
                        this._initcommentTops()
                    })

                })
            },
        },
    }
</script>

<style lang="scss">
    .shop_title {
        height: 80px;
        padding: 10px 0;
        background-color: #3190e8;
        // background: url('../../images/商圈.png');
        // filter: blur(10px);
        color: white;

        .shop_img {
            vertical-align: middle;
            display: block;
            float: left;

            img {
                width: 68px;
                height: 68px;
                border-radius: 50%;
                padding: 0 10px;
            }
        }

        .shop_info {
            vertical-align: middle;

            h2 {
                font-size: 20px;
            }

            p {
                font-size: 12px;
                margin-top: 5px;
            }
        }
    }

    .shop_tab {
        padding: 10px 0;
        width: 100%;
        // height: 30px;
        line-height: 30px;
        text-align: center;

        .select_food {
            float: left;
            width: 50%;
        }

        .comments {
            float: left;
            width: 50%;
        }
    }

    .mint-tab-item-label {
        font-size: 14px !important;
    }

    hr {
        margin-top: 1px;
        height: 1px;
        border-bottom: 1px solid #dddddd;
        border-top: none;
        border-left: none;
        border-right: none;
    }



    .content {
        display: flex;
        overflow: hidden;
    }

    .mint-tab-container {
        z-index: -2;
        position: absolute !important;
        right: 0;
        left: 0;
        bottom: 0;
        top: 190px;
    }

    .mint-tab-container-wrap {
        height: 100%;
    }

    .mint-tab-container-item {
        .menu-wrapper {
            position: relative;
            top: 0px;
            bottom: 0px;
            flex: 0, 0, 80px;
            width: 80px;

            ul {
                list-style: none;

                .menu-item {
                    font-size: 18px;
                    padding: 15px 0;
                    // background-color: gray;
                    // border-bottom: 1px solid #dddddd;
                    border-left: 3px solid #3190e8;
                }

                .boderleft {
                    border-left: 3px solid #3190e8;
                }
            }
        }


        .foods-wrapper {
            position: relative;
            flex: 1;
            height: inherit;

            ul {
                list-style: none;
                overflow: hidden;

                .food-list {
                    .title {
                        padding: 5px 5px;
                        font-weight: normal;
                        font-size: 12px;
                        font-family: 'Arial Narrow';
                    }

                    .food-item {
                        display: flex;
                        margin-bottom: 10px;

                        .icon {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 2;
                            width: 100%;
                        }

                        .info-content {
                            flex: 8;
                            padding: 0 8px;

                            .food-name {
                                margin-bottom: 2px;
                                font-weight: normal;
                                font-size: 14px;
                            }

                            .desc {
                                margin-bottom: 2px;
                                font-size: 10px;
                                color: grey;
                            }

                            .rate {
                                font-size: 10px;
                                color: grey;
                            }

                            .price {
                                z-index: 999;

                                .food_price {
                                    vertical-align: middle;
                                    color: red;
                                    font-size: 14px;
                                }

                                .plus {
                                    position: absolute;
                                    // top: 20px;
                                    right: 20px;
                                    color: white;
                                    font-size: 20px;
                                    width: 20px;
                                    height: 20px;
                                    line-height: 20px;
                                    background-color: #3190e8;
                                    border-radius: 50%;
                                    // overflow: hidden;
                                    text-align: center;

                                    .van-icon-plus {
                                        line-height: 20px;

                                    }
                                }
                            }
                        }
                    }


                }
            }

        }
    }

    .mint-tab-container-item {


        padding-bottom: 50px;



        .comment_info {
            padding: 10px 20px;
            width: 80%;
            margin: auto;
            margin-top: 10px;
            // margin-top: 10px;
            // text-align: center;
            border-radius: 10px;
            border: 1px solid rgb(236, 236, 236);
            box-shadow: 0px 1px 5px -2px grey;

            .score {
                display: flex;
                justify-content: space-between;

                span {
                    float: left;
                    font-size: 12px;
                }
            }

            .score_info {
                // .van-tag--primary {
                //     // background-color: #1989fa;
                //     background-color: rgb(92, 176, 255);
                // }

                .primary {
                    display: flex;
                    list-style: none;
                    // height: 40px;
                    // justify-content: space-between;
                    flex-wrap: wrap;
                    width: 80%;

                    li {
                        box-sizing: border-box;
                        border-radius: 5px;
                        color: white;
                        // width: 100px;
                        // flex: 2;
                        background-color: rgb(92, 176, 255);
                        font-size: 12px;
                        padding: 0 10px;
                        margin: 5px 5px 5px 0;

                    }
                }

            }
        }

        .comments {
            padding: 10px 0;
            width: 90%;
            margin: auto;
            margin-top: 10px;

            // display: flex;
            .user_score {
                div {
                    // float: left;
                    display: inline-block;
                    margin-right: 5px;
                    vertical-align: middle;

                    img {
                        width: 40px;
                        height: 40px;

                    }


                }

                .user_info {
                    width: 285px;

                    span {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        // text-align: justify;
                        font-size: 12px;
                        color: rgb(90, 90, 90);
                        vertical-align: middle;

                    }

                    p {
                        line-height: 18px;
                        vertical-align: middle;
                    }

                }
            }

            .user_comment {
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                margin-left: 45px;
                font-size: 12px;
                color: rgb(90, 90, 90);

                span {
                    display: block;
                }
            }
        }

    }

    .shopcart-container {
        height: 50px;
        background-color: #333333;
        position: fixed;
        bottom: 0;
        left: 0;
        color: white;
        width: 100%;
        display: flex;

        .cart_icon_container {
            flex: 2;
            width: 57px;
            height: 57px;
            background-color: #535356;
            border-radius: 50%;
            position: absolute;
            left: 16px;
            top: -15px;


            .inline {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .inline_color {
                background-color: #3190e8;

            }

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
            }
        }

        div {
            display: inline-block;
        }

        .money {
            // display: flex;
            align-items: center;
            // justify-content: center;
            flex: 2;
            height: 100%;
            margin-left: 80px;

            // width: 165px;
            // margin-top: 5px;
            .sumprice {
                font-size: 18px;
                font-weight: bold;
            }

            .devcost {
                font-size: 12px;
            }

            span {
                display: block;
            }
        }


        .gotopay {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 2;
            background-color: #535356;
            position: relative;
            // width: 110px;
            height: 100%;
            line-height: 50px;
            padding: 0 10px;
            font-size: 20px;
            // top: -6px;
            text-align: center;
        }


        .gotopay_active {
            background-color: #4cd964;
            font-weight: bold;
        }
    }



    .cart_foodlist {
        z-index: -1;
        // position: relative;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        margin-bottom: 50px;

        .cart_title {
            display: flex;
            background-color: #f5f5f5;
            height: 40px;
            line-height: 40px;
            color: gray;

            h4 {
                width: 20%;
                font-weight: normal;
                line-height: 40px;
                padding-left: 30px;
                font-size: 18px;
            }

            span {
                font-size: 18px;
                position: absolute;
                right: 30px;
            }
        }




        .cart_food_deatil {
            background-color: white;

            ul {
                list-style: none;
            }

            .food_list {
                display: flex;
                padding: 10px 15px;
                font-size: 16px;

                .food_name {}

                .food_price {
                    // margin-left: 150px;
                    position: absolute;
                    right: 130px;
                    color: #ff6600
                }

                .food_num {
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    text-align: center;

                    .minus {
                        position: absolute;
                        right: 62px;
                        width: 19px;
                        height: 19px;
                        display: inline-block;
                        background-color: white;
                        text-align: center;
                        border-radius: 50%;
                        // font-size: 15px;   
                        border: 1px solid #3190e8;
                        color: #3190e8;
                    }

                    .number {
                        display: inline-block;
                        color: gray;
                    }

                    .plus {
                        position: absolute;
                        right: 15px;
                        display: inline-block;
                        width: 21px;
                        height: 21px;
                        background-color: #3190e8;
                        text-align: center;
                        color: white;
                        border-radius: 50%;
                    }
                }
            }

            padding-bottom: 15px;
        }
    }



    @-webkit-keyframes fadeInUp {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .fadeInUp {
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
    }



    @-webkit-keyframes fadeOutDown {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }

    @keyframes fadeOutDown {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }
    }

    .fadeOutDown {
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        -webkit-animation-name: fadeOutDown;
        animation-name: fadeOutDown;
    }
</style>