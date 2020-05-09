<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">点餐</mt-tab-item>
            <mt-tab-item id="2">评价</mt-tab-item>
        </mt-navbar>
        <hr>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
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
                                <li v-for="foodList in item.foodLists" :key="foodList.fid" class="food-item">
                                    <div class="icon">
                                        <img width="70px" height="70px" src="../../images/商圈.png" alt="">
                                    </div>
                                    <div class="info-content">
                                        <h2 class="food-name">{{ foodList.fname }}</h2>
                                        <p class="desc">{{ foodList.finfo }}</p>
                                        <div class="rate">
                                            <span>月销售{{ foodList.fsale }}份 </span>
                                            <span> 好评率{{ foodList.frate }}%</span>
                                        </div>
                                        <div class="price">
                                            <span class="food_price">￥{{ foodList.price }}</span>
                                            <span class="plus">
                                                <van-icon color="white" size="12" name="plus" />
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="2">
                <div class="comment_info">
                    <div class="score">
                        <span>{{ shopinfo.rate }}
                            <van-rate style="vertical-align: middle" v-model="star" :size="12" allow-half /></span>
                        <span>味道 {{ shopinfo.tasterate }} 包装 {{ shopinfo.packrate }} 配送 {{ shopinfo.devrate }}</span>
                    </div>

                    <div class="score_info">
                        <van-tag type="primary">全部 {{ commentList.length }}</van-tag>
                        <van-tag type="primary">最新</van-tag>
                        <van-tag type="primary">好评 {{ shopinfo.good }}%</van-tag>
                        <br>
                        <van-tag type="primary">差评 {{ shopinfo.bad }}%</van-tag>
                        <van-tag type="primary">有图 229</van-tag>
                    </div>
                </div>

                <div v-for="item in commentList" :key="item.id" class="comments">
                    <div class="user_score">
                        <div>
                            <img src="../../images/商圈.png" alt="">
                        </div>
                        <div class="user_info">
                            <span>
                                <section>{{ item.username }}</section>
                                <section>2019-11-27</section>
                            </span>
                            <p>
                                <van-rate style="vertical-align: middle" v-model="item.rate" :size="12" allow-half />
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
                // scrolly: 0,
                scrollY: 0,
                tops: [],
                listHeight: []
            }
        },


        created() {
            this.getcomments(),
                this.getshoplist(),
                this.getgoodlist()

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
            _initScroll() {
                new BScroll('.menu-wrapper', {
                    click: true
                })

                this.foodsScroll = new BScroll('.foods-wrapper', {
                    probeType: 3,
                    click: true
                })

                this.foodsScroll.on('scroll', ({
                    x,
                    y
                }) => {
                    // console.log(x, y);
                    this.scrollY = Math.abs(y);
                })

                this.foodsScroll.on('scrollEnd', ({
                    x,
                    y
                }) => {
                    // console.log('scrollEnd', x, y)
                    this.scrollY = Math.abs(y)
                })

                // console.log(this.foodsScroll);

            },


            _initTops() {

                const tops = [];
                let top = 0;
                this.tops.push(top);
                const lis = this.$refs.foodWrapper.getElementsByClassName('food-list');
                for (let i = 0; i < lis.length; i++) {
                    top += lis[i].clientHeight;
                    this.tops.push(top)

                }
                // Array.prototype.slice.call(lis).forEach(li => {
                //     top += li.clientHeight;
                //     tops.push(top);
                // })

                // this.tops = tops;
                // console.log(this.tops);
            },

            clickMenuItem(index) {
                // const foodlist = this.$refs.foodWrapper.getElementsByClassName('food-list');
                // this.foodsScroll.scrollToElement(foodlist[index], 250);
                const scrollY = this.tops[index];
                this.scrollY = scrollY;
                this.foodsScroll.scrollTo(0, -scrollY, 300);
            },

            getcomments() {
                this.axios.get("http://localhost:8081/comments?id=1").then(body => {
                    this.commentList = body.data;
                })
            },

            getshoplist() {
                this.axios.get("http://localhost:8081/getshopByid?id=2").then(body => {
                    this.shopinfo = body.data
                })
            },

            getgoodlist() {
                this.axios.get(this.$Api.goodlist).then(body => {
                    this.goodlist = body.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._initTops();
                    })

                })
            },
        },
    }
</script>


<style lang="scss">
    .mint-tab-container-item {
        height: auto !important;

        .menu-wrapper {
            width: 20%;
            float: left;

            ul {
                list-style: none;

                .menu-item {
                    padding: 15px 10px;
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
            width: 80%;
            float: left;

            ul {
                list-style: none;

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

                        .info-content {
                            padding: 0 2px;

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
                                .food_price {
                                    vertical-align: middle;
                                    color: red;
                                    font-size: 14px;
                                }

                                .plus {
                                    position: absolute;
                                    right: 20px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    width: 20px;
                                    height: 20px;
                                    background-color: #3190e8;
                                    border-radius: 50%;
                                    overflow: hidden;
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
                .van-tag--primary {
                    // background-color: #1989fa;
                    background-color: rgb(92, 176, 255);
                }

                .van-tag {
                    padding: 5px 5px;
                    margin-right: 5px;
                    margin-top: 8px;
                }
            }
        }

        .comments {
            padding: 10px 0;
            width: 90%;
            margin: auto;
            margin-top: 10px;

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
                        margin-bottom: 4px;
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
</style>