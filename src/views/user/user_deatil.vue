<template>
    <div>
        <div class="base_info">
            <div class="user_name">
                <h2>{{ username }} </h2>
                <div class="face">
                    <img src="./images/face.png" alt="">
                    <span>
                        <van-icon color="grey" name="arrow" /></span>
                </div>
            </div>
            <div>收货地址
                <van-icon color="grey" name="arrow" />
            </div>

            <div class="subtitle">账号绑定</div>
            <div>手机
                <van-icon color="grey" name="arrow" />
            </div>
            <div class="subtitle">安全设置</div>
            <div @click="toUpdatepwd()">修改登陆密码
                <van-icon color="grey" name="arrow" />
            </div>
            <mt-button class="button" type="danger" size = "large" @click="logout()">退出登陆</mt-button>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                username: '',
                userid: ''
            }
        },

        created() {
            this.getuserinfo()
        },



        methods: {
            getuserinfo() {
                this.username = JSON.parse(localStorage.getItem("username"));
                
            },

            toUpdatepwd() {
                this.$router.push('updatepwd')
            },

            logout() {
                localStorage.removeItem("user");
                localStorage.removeItem("username");
                this.$router.push('user')
            }
        },
    }
</script>


<style lang="scss">
    .base_info {
        background-color: white;
        // margin-top: 15px;
        font-size: 14px;
        color: rgb(90, 90, 90);
        width: 100%;

        div {
            padding: 10px 10px;

            border-bottom: 1px solid #dfdfdf;
        }

        .user_name {
            padding: 0 10px;
            display: flex;
            position: relative;
            border-top: 1px solid #dfdfdf;

            // height: 40px;
            // position: absolute;
            // top: 50%;
            h2 {
                // position: absolute;
                vertical-align: middle;
                display: inline-block;
                font-size: 14px;
                font-weight: normal;
                line-height: 65px;
                // top: 50%;
                // transform: translateY(-50%);
                // margin-right: auto;
            }

            .face {
                display: inline-block;
                border: none;
                margin-left: auto;

                img {
                    border-radius: 50%;
                    vertical-align: middle;
                    right: 10px;
                    height: 46px;
                    width: 46px;
                }

                span {
                    vertical-align: middle;
                }
            }
        }

        .subtitle {
            font-size: 12px;
            color: rgb(90, 90, 90);
            background-color: #f5f5f5;
        }
    }


    .button {
        width: 95% !important;
        margin: auto;
        margin-top: 20px;
    }
</style>