<template>
  <div class="login">
    <p></p>
    <p>
        <label for="userName">用户名：</label>
        <input type="text" v-model="userName" id="userName"/>
    </p>
    <p>
        <label for="password">密码：</label>
        <input  type="password" v-model="password" id="password"/>
    </p>
    <p>
        <button @click="login_user()">登录</button>
    </p>
    <p>
        <router-link to="/register">切换到注册页面</router-link>
    </p>
  </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                userName: '',
                password: '',
            }
        },
        methods: {
            //登录
            login_user() {
                let pass = this.verifyForm();
                if (pass != true) {
                    alert(pass);
                    return;
                }
                this.$http.post('/api/account/api/login', {
                    userName: this.userName,
                    password: this.password
                }).then((res) => {
                    if (res.data.status == 200) {
                        sessionStorage.setItem("token", res.data.data.token);
                        sessionStorage.setItem("userId", res.data.data.userId);
                        this.$http.defaults.headers.common['token'] = res.data.data.token;
                        this.$router.push({
                            name: 'index'
                        });
                        // this.$http.defaults.headers['X-Token'] = res.data.data.token;
                        // this.$http.defaults.headers.common['Authorization'] = res.data.data.token;
                        // console.log('这是后台传的token=', res.data.data.token)
                    } else if (res.data.status == 405) {
                        alert('用户名或者密码错误！');
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            //校验
            verifyForm() {
                if (this.userName == '') return '用户名不可为空！';
                if (this.password == '') return '密码不可为空！';
                return true;
            }
        },
        created() {

        }
    }
</script>

<style>
    .login {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>