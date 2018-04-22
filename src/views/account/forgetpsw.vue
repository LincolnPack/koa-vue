<template>
    <div class="forgetpsw">
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
                                <el-form>
                                    <el-form-item label="请输入您要找回密码的用户名" style="margin-bottom: 30px">
                                        <el-input   v-model="userName"></el-input>
                                    </el-form-item>
                                    <el-form-item >
                                        <el-button type="warning"  @click.prevent="getQuestion" 
                                            style="width: 100%">立即找回</el-button>
                                    </el-form-item>
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
        _register
    } from '../../api/user';
    export default {
        name: 'forgetpsw',
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
            getQuestion() {
                let timestamp = Date.parse(new Date());
                let pass = this.verifyPasswold();
                let params = {
                    userName: this.userName,
                    password: this.password,
                    creat_time: timestamp
                }
                if (!pass) {
                    alert('密码不一致！');
                    return;
                }
                _register(params).then((res) => {
                    console.log(res)
                    if (res.status == 200) {
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
                let params = {
                    userName: this.userName,
                    password: '',
                    creat_time: timestamp
                };
                _register(params).then((res) => {
                    this.msg_.nameMsg = res.msg;
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style lang="scss">
    .forgetpsw {
        background: linear-gradient(60deg,#541466 0,#17b9e6 100%);
        height: 100%;
        min-height: 650px;
        .fr {
            float: right;
        }
        .fl {
            float: left;
        }
        .login-box-bg {
            background-color: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 30px 0;
        }
        .login-box label {
            color: #fff;
        }
        .login-box .el-form-item {
            margin-bottom: 0px;
        }
        .login-box .el-form-item a{
            color: #fff;
        }
    }
</style>