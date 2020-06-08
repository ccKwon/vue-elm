<template>
    <div class="container">
        <div class="addresswrap">
            选择收获地址
            <div class="addressselect">
                <div class="city">{{city}}</div>
                <div class="tips">请输入小区、写字楼、学校名称等</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                city: ''
            }
        },

        created() {
            this.getip(),
                this.getlocation()
        },

        methods: {
            getip() {
                this.axios.get('https://api.map.baidu.com/location/ip?ak=BnlVvcpo3LTtQ2WvVs0ZlOhtKWWuKO8q').then(res => {
                    this.city = res.data.content.address_detail.city;
                    // console.log(res);
                })

            },

            // getlocation() {
            //     const geolocation = new BaiduMap.Geolocation();

            //     var _this = this;

            //     _this.LocationCity = '正在定位';

            //     geolocation.getCurrentPosition(function getinfo(position) {

            //         let city = position.address.city; //获取城市信息

            //         let province = position.address.province; //获取省份信息

            //         let district = position.address.district; //县

            //         let street = position.address.street; //街道

            //         _this.LocationCity = province + city + district; //赋值

            //         _this.success = true;

            //     }, function (e) {

            //         _this.LocationCity = '定位失败, 请点击重试';

            //         this.success = false;

            //     }, {
            //         provider: 'baidu'
            //     });

            //     // this.axios.get('api/place/v2/detail?uid=435d7aea036e54355abbbcc8&output=json&scope=2&ak=BnlVvcpo3LTtQ2WvVs0ZlOhtKWWuKO8q')
            //     // .then(res => {
            //     //     console.log(res);
            //     // })
            // }
        },
    }
</script>


<style lang="scss" scoped>
    .container {
        padding: 5px 10px;

        .addresswrap {
            font-size: 18px;

            .addressselect {
                display: flex;
                align-items: center;
                justify-content: center;
                // text-align: center;
                margin-top: 5px;
                background: rgb(243, 243, 243);
                height: 28px;
                border-radius: 15px;

                .city {
                    margin-left: 10px;
                    flex: 1;
                    font-size: 16px;
                }

                .city::after {
                    content: '';
                    margin-left: 10px;
                    border-right: solid 1px gray;
                }

                .tips {
                    flex: 4;
                    margin: 0;
                    color: grey;
                    font-size: 16px;
                    font-weight: 500;
                }
            }


        }
    }
</style>