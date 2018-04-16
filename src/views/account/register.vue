<template>
    <div class="register">
        <p>注册页面</p>      
        <p>
            <label for="userName">用户名：</label>
            <input type="text" v-model="userName" id="userName"  @blur="verifyNameRepeat"/>
            <span class="err_msg">{{msg_.nameMsg}}</span>
        </p>
        <p>
            <label for="password">密码：</label>
            <input  type="password" v-model="password" id="password"/>
        </p>
        <p>
            <label for="password_">确认密码：</label>
            <input  type="password" v-model="password_" id="password_"/>
        </p>
        <p>
            <button @click="reg_user()">注册</button>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                userName: '',
                password: '',
                password_: '',
                msg_: {
                    nameMsg: ''
                }
            }
        },
        methods: {
            reg_user() {
                let timestamp = Date.parse(new Date());
                let pass = this.verifyPasswold();
                if (!pass) {
                    alert('密码不一致！');
                    return;
                }
                this.$http.post('/api/account/api/register', {
                    userName: this.userName,
                    password: this.password,
                    creat_time: timestamp
                }).then((res) => {
                    console.log(res)
                    if (res.data.status == 200) {
                        this.$router.push({
                            name: 'login'
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            verifyPasswold() {
                return this.password === this.password_;
            },
            //校验 用户名是否重复
            verifyNameRepeat() {
                let timestamp = Date.parse(new Date());
                this.$http.post('/api/account/api/register', {
                    userName: this.userName,
                    password: '',
                    creat_time: timestamp
                }).then((res) => {
                    this.msg_.nameMsg = res.data.msg;
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>
    .register {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    .err_msg {
        color: red;
    }
</style>