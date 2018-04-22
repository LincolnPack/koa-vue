<template>
  <div class="login_page">
    <el-row>
        <el-col :span="24" :xs="24">
            <h2 style="text-align: center;margin: 0;padding: 50px 0 30px">
              <!-- <a href="/"><img src="../../resource/pic/Logo4.png" style="width: 100px;height: 100px"></a> -->
            </h2>
            <el-row>
                <el-col :span="8" :xs="4" :sm="7" :md="8">&nbsp;</el-col>
                <el-col :span="8" class="login-box-bg" :xs="16" :sm="10" :md="8">
                    <el-row>
                        <el-col :span="2" :xs="2">&nbsp;</el-col>
                        <el-col :span="20" class="login-box" :xs="20">
                            <el-form >
                                <el-form-item label="请输入用户名" prop="userName">
                                    <el-input v-model="userName"></el-input>
                                </el-form-item>
                                <el-form-item label="请输入密码" prop="password" style="margin-bottom: 30px;">
                                    <el-input v-model="password" type="password"></el-input>
                                </el-form-item>
                                <el-form-item >
                                    <el-button type="warning" style="width: 100%" 
                                        @click.prevent="verifyForm" id="login">
                                        登录
                                    </el-button>
                                </el-form-item>
                                <el-form-item >
                                      <!-- <el-checkbox class="fl" v-model="remember" :true-label="1" :false-label="0">
                                        记住我
                                      </el-checkbox> -->
                                      <!--<img @click="qqLogin()"  target="_blank" class="fr" style="padding-top: 5px;cursor: pointer" id="qqLoginBtn" src="../../resource/pic/qq.png"> </a>-->
                                </el-form-item >
                                <el-form-item >
                                    <router-link to="/forgetpsw" style="float: left" class="fl">
                                        忘记密码？
                                    </router-link>
                                    <router-link to="/register" style="float: right" class="fr">
                                        没有账号？立即注册
                                    </router-link>
                                </el-form-item >
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
    import util from '../../util/util';
    import {
        _login
    } from '../../api/user';
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
                let params = {
                    userName: this.userName,
                    password: this.password
                };
                _login(params).then((res) => {
                    console.log(res,5555555555555);
                    if ( res.status == 200 ) {
                        console.log('这是后台传的token=', res.data.token);
                        let user = {
                            token: res.data.token,
                            userId: res.data.userId,
                            userName: res.data.userName,
                        };
                        user = JSON.stringify(user);
                        util.setItem("user", user);
                        this.$http.defaults.headers.common['token'] = res.data.token;
                        this.$message({
                            type: 'success',
                            message: '登录成功!'
                        });
                        this.$router.push({
                            name: 'index'
                        });
                    } 
                }).catch((err) => {
                    console.log(err)
                })
            },
            //校验
            verifyForm() {
                if ( this.userName == '' ) {
                    this.$message({
                        type: 'warning',
                        message: '用户名不可为空!'
                    });
                    return
                } else if ( this.password == '' ) {
                    this.$message({
                        type: 'warning',
                        message: '密码不可为空!'
                    });
                    return
                } else {
                    this.login_user();
                }
            }
        },
        created() {

        }
    }
</script>

<style lang="scss">
    .login_page {
        background: linear-gradient(60deg, #541466 0, #17b9e6 100%);
        height: 100%;
        .tc {
            text-align: center
        }
        .page-container {
            margin: 0;
            padding: 0;
            width: 100%;
            height: calc(100vh)
        }
        .fr {
            float: right;
        }
        .fl {
            float: left;
        }
        .login-box-bg {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 30px 0;
        }
        .login-box label {
            color: #fff
        }
        .login-box .el-form-item {
            margin-bottom: 0px;
        }
        .login-box .el-form-item a {
            color: #fff
        }
    }
</style>