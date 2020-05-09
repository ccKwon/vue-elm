<template>
    <div>
        <div>
            <div class="user_login" @click="toLogin">
                <span>
                    <img src="../../images/face.png" alt="">
                </span>

                <span class="login_title">
                    <h2>登陆/注册</h2>
                    <p>暂无绑定手机号</p>
                </span>
                <span class="next_arrow">
                    <van-icon color="white" name="arrow" />
                </span>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        methods: {
            toLogin() {
                this.$router.push('/login');
            },
        },
    }
</script>


<style lang="scss">
    .user_login {
        position: relative;
        padding: 20px 20px;
        height: 60px;
        background-color: #26a2ff;
        // background-color: grey;
        // position: relative;
        vertical-align: middle;

        span {
            // display: flex;
            // vertical-align: middle;
            // justify-content: space-between;
            // position: absolute;
            float: left;
            // vertical-align: middle;
            // top: 50%;
            // transform: translateY(-50%);

        }

        .login_title {

            margin-top: 5px;
            color: white;

            h2 {
                font-size: 22px;
            }

            p {
                font-size: 14px;
            }

        }

        .next_arrow {

            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);

        }
    }
</style>