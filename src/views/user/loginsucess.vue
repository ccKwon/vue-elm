<template>
    <div class="container">
        <div class="user_login" @click="touserdeatil">
            <div class="image">
                <img src="../../images/face.png" alt="">
            </div>

            <div class="login_title">
                <h2>{{ username }}</h2>
                <p>暂无绑定手机号</p>
            </div>
            <div class="next_arrow">
                <van-icon color="white" name="arrow" size="0.5rem" />
            </div>
        </div>
    </div>
</template>


<script>
    export default {

        data() {
            return {
                userid: '',
                username: ''
            }
        },

        created() {
            this.getuserinfo()
        },


        methods: {
            touserdeatil() {
                this.$router.push('/userDeatil');
            },


            getuserinfo() {
                this.username = JSON.parse(localStorage.getItem("username"))
            }
        },
    }
</script>


<style lang="scss">
    .user_login {
        display: flex;
        // position: relative;
        padding: 20px 20px;
        height: 60px;
        background-color: #26a2ff;
        // background-color: grey;
        // position: relative;
        // vertical-align: middle;

        .image {
            flex: 1;
            img {
                height: 100%;
                width: 100%;
            }

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
            flex: 4;
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
            flex: 1;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);

        }
    }
</style>