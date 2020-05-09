<template>
    <div>
        <component :is="showComponent"></component>

        <div class="user_menu">
            <ul>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="balance-o" /></span>
                    <span>我的红包</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="coupon-o" /></span>
                    <span>我的津贴</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="location-o" /></span>
                    <span>我的地址</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="like-o" /></span>
                    <span>我的收藏</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="service-o" /></span>
                    <span>我的客服</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li>
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="orders-o" /></span>
                    <span>规则中心</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
                <li @click="toUserdeatil">
                    <span>
                        <van-icon style="vertical-align: middle;" size="20" color="grey" name="orders-o" /></span>
                    <span>用户信息</span>
                    <span class="arrow">
                        <van-icon color="grey" name="arrow" /></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import unlogin from './unlogin.vue'
    import loginsucess from './loginsucess.vue'
    export default {

        data() {
            return {
                showComponent: 'unlogin',
                isflag: false,
            }
        },

        created() {
            this.onShowCom()
        },

        methods: {
            toUserdeatil() {
                this.$router.push('userDeatil');
            },


            onShowCom() {
                let user = localStorage.getItem("user");
                if(user) {
                    this.$set(this, 'showComponent', 'loginsucess')
                }else {
                    this.$set(this, 'showComponent', 'unlogin')
                }
            }
        },

        components: {
            unlogin,
            loginsucess
        },


    }
</script>


<style lang="scss">
    .user_menu {
        margin-top: 20px;

        ul {
            list-style: none;

            li {
                padding: 10px 10px;
                height: 25px;
                border-bottom: solid 1px;
                border-color: rgb(223, 223, 223);

                span {
                    margin-right: 10px;
                    vertical-align: middle;
                    color: rgb(68, 68, 68);
                    font-size: 14px;
                }

                .arrow {
                    position: absolute;
                    right: 10px;
                }
            }
        }
    }
</style>