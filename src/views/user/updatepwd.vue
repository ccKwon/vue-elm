<template>
    <div>
        <div class="ulcontent">
            <ul>
                <li><input type="password" v-model="oldPwd" placeholder="旧密码"></li>
                <li><input type="password" v-model="newPwd" placeholder="请输入新密码"></li>
                <li><input type="password" v-model="confirmPwd" placeholder="确认新密码"></li>
                <!-- <li><input type="text" v-model="checkCode" placeholder="验证码"></li> -->
            </ul>
        </div>


        <mt-button class="button" type="primary" size="large" @click="getuserByname()" >确认修改</mt-button>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                oldPwd: '',
                newPwd: '',
                confirmPwd: '',
                checkCode: ''
            }
        },


        methods: {
            getuserByname() {
                this.userName = JSON.parse(localStorage.getItem("username")) 
                this.axios.get(this.$Api.getuserbyname + this.userName).then(body => {
                    // 用户名存在则判断用户名与密码是否匹配
                    if (this.oldPwd == body.data.pwd) {
                        this.axios.get(this.$Api.updatePwd + this.userName + "&pwd=" + this.newPwd)
                        localStorage.removeItem("user")
                        localStorage.removeItem("username")
                        alert("修改密码成功,请重新登陆")
                        this.$router.push("login").catch(data => {})
                    } else {
                        console.log(this.oldPwd == body.data.pwd);
                    }
                })
            },
        },
    }
</script>

<style lang="scss">
    .ulcontent {
        list-style: none;

        li {
            padding: 10px 10px;

            input {
                width: 100%;
                border-top: none;
                border-left: none;
                border-right: none;
                line-height: 30px;

            }
        }
    }

    .button {
        width: 95% !important;
        margin: auto;
        margin-top: 10px;
    }
</style>