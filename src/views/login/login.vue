<template>
    <div class="login_form">
        <form name="form" onsubmit="return false">
            <div :class="['login_wapper', {inputshadow:usernameFlag}]">
                <div class="login_title">
                    <input type="text" placeholder="账号" v-model="userName" @focus="onfoucsFlag('username')"
                        @blur="onblurFlag('username')">
                    <div class="error">{{ errorMsg }}</div>
                </div>
            </div>
            <div :class="['login_wapper', {inputshadow:passwordFlag}]">
                <div class="login_title">
                    <div>
                        <input type="password" placeholder="密码" v-model="passWord" @focus="onfoucsFlag('password')"
                            @blur="onblurFlag('password')">
                    </div>
                    <div class="error">{{ passwordMsg }}</div>
                </div>
            </div>
            <!-- <div :class="['login_wapper', {inputshadow:checkFlag}]">
                <div class="login_title">
                    <input type="text" placeholder="验证码" v-model="checkCode"  @focus="onfoucsFlag('check')"
                        @blur="onblurFlag('check')">
                    <img :src="this.url" alt="" @click="uploadLoginValidateCode()">
                </div>
            </div> -->

            <div class="tips">
                <p>温馨提示：未注册过的账号，登陆时将自动注册</p>
                <p>注册过的用户可凭账号密码登陆</p>
            </div>

            <div class="login_button">
                <input type="submit" value="登录" @click="checkForm()">
            </div>

            <div class="reset_password">
                重置密码？
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                usernameFlag: false,
                passwordFlag: false,
                checkFlag: false,
                userName: '',
                passWord: '',
                checkCode: '',
                phone: '',
                errorMsg: '',
                passwordMsg: '',
                url: ''
            }
        },

        methods: {
            checkForm() {
                let userflag = '';
                let pswflag = '';
                let userReg = /^\w{6,12}$/;
                let passwordReg = /^\w{6,20}$/;
                if (!userReg.test(this.userName)) {
                    this.errorMsg = "用户名必须由6-12位字母数字下划线组成"
                    userflag = false;
                } else {
                    userflag = true;
                }
                if (!passwordReg.test(this.passWord)) {
                    this.passwordMsg = "密码必须由6-30位字母数字下划线组成"
                    pswflag = false;
                } else {
                    pswflag = true;
                }

                if (userflag && pswflag) {
                    this.getuserByname();
                }


                // if (this.checkCode != 'ccc') {
                //     console.log(333);
                // }
            },

            onSubmit(name) {
                this.$router.push({
                    path: '/login',
                    query: {
                        'userbyName': name
                    }
                })

            },

            onfoucsFlag(key) {
                switch (key) {
                    case 'username':
                        this.usernameFlag = true;
                        this.errorMsg = '';
                        break;
                    case 'password':
                        this.passwordFlag = true;
                        this.passwordMsg = '';
                        break;
                    case 'check':
                        this.checkFlag = true;
                        break;

                }
            },

            onblurFlag(key) {
                switch (key) {
                    case 'username':
                        this.usernameFlag = false;
                        break;
                    case 'password':
                        this.passwordFlag = false;
                        break;
                    case 'check':
                        this.checkFlag = false;
                        break;
                }
            },


            uploadLoginValidateCode() {
                this.url = "http://localhost:8081/loginValidateCode";
            },

            getuserByname() {
                this.axios.get(this.$Api.getuserbyname + this.userName).then(body => {
                    // 用户名不存在则自动注册
                    if (body.data == '') {
                        this.axios.get(this.$Api.insertuser + this.userName + "&password=" + this.passWord)
                            .then(body => {
                                this.getuserByname()
                            });
                    } else {
                        // 用户名存在则判断用户名与密码是否匹配
                        this.axios.get(this.$Api.dologin + body.data.name + "&password=" + body.data.pwd).then(
                            result => {
                                if (result.data.status == 1) {
                                    // 将JSON格式保存的用户信息保存到localStorage

                                    localStorage.setItem("user", JSON.stringify(body.data.id))
                                    localStorage.setItem("username", JSON.stringify(body.data.name))
                                    this.$router.push("user").catch(data => {})
                                } else {
                                    this.errorMsg = "用户名或密码错误"
                                    this.passwordMsg = "用户名或密码错误"
                                }
                            })

                    }

                })
            },
        },
    }
</script>

<style lang="scss">
    .login_form {
        font-size: 16px;
        color: grey;
        font-weight: 300;
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: 10px 10px;

        .login_wapper {
            padding: 10px 10px;
            border-bottom: 1px solid rgb(223, 223, 223);

            .login_title {

                input {
                    vertical-align: middle;
                    border: none;
                }

                img {
                    vertical-align: middle;
                }


                .error {
                    font-size: 12px;
                    color: red;
                }
            }

        }

        .inputshadow {
            box-shadow: 0px 1px 0.5px 0.5px rgb(243, 243, 243);
        }
    }

    .tips {
        margin-top: 10px;
        font-size: 12px;
        font-weight: bold;

        p {
            // font-weight: 600;
            color: red;
            margin-top: 15px;
        }
    }

    .login_button {
        margin-top: 15px;
        text-align: center;

        input[type=submit] {
            display: block;
            width: 100%;
            color: white !important;
            background-color: #26a2ff;
            border-radius: 4px;
            border: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            display: block;
            font-size: 16px;
            height: 41px;
            outline: 0;
            overflow: hidden;
            position: relative;
            text-align: center;
        }
    }

    .reset_password {
        color: #26a2ff;
        text-align: right;
        margin-top: 10px;
        font-size: 14px;
    }
</style>