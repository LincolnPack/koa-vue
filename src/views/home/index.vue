<template>
            <el-container>
                    <el-header>
                        <div class="userName">{{cur_userName}}</div>
                        <div class="avatar-wrapper el-dropdown-selfdefine">
                            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
                        </div>
                    </el-header>
                    <el-container>
                      <el-aside width="300px">Aside</el-aside>
                      <el-main>
                            <ul>
                               <li v-for="item in items">
                                    <article class="excerpt">
                                            <header><a class="label label-important">Python<i class="label-arrow"></i></a><h2><a target="_blank"  title="Flask 静态文件缓存问题">Flask {{ item.title}}  </a></h2>
                                            </header>
                                            <div class="focus"><a target="_blank"><img class="thumb" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2018/04/timg.jpeg&h=123&w=200&q=90&zc=1&ct=1"  /></a></div>
                                          <span class="note">{{ item.content}}</span>
                                    </article>
                                 </li>
                            </ul>
                            <div class="writeText">
                               <el-input placeholder="请输入文章标题"  v-model='article.title'></el-input>
                               <el-input
                               type="textarea"
                               :rows="5"
                               placeholder="请输入文章内容"
                               v-model='article.content'>
                             </el-input>
                             <el-button type="primary" @click='addArticle'>发表</el-button>
                            </div>    
                      </el-main>
                    </el-container>
                  </el-container>
     
  </template>

<script>
    import util from '../../util/util';
    import {
        _findArticelList,
        _addArticle
    } from '../../api/user';
    export default {
        name: 'home',
        data() {
            return {
                cur_user: null,
                cur_userName: '',
                items: [],
                article: {
                    title: '',
                    content: '',
                    time: ''
                },
            }
        },
        created() {
            this.getCurUser();
        },
        methods: {
            getCurUser() {
                let _user = util.getItem("user");
                if (util.str(_user) != '') {
                    this.cur_user = JSON.parse(_user);
                }
                this.cur_userName = this.cur_user.userName;
                this.findArticelList();
            },
            addArticle() {
                let token = this.cur_user.token;
                this.article.time = Date.parse(new Date());
                _addArticle(this.article).then((res) => {
                    if (res.status == 200) {
                        this.findArticelList();
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            findArticelList() {
                let userId = this.cur_user.userId;
                let params = {
                    userId: userId
                }
                _findArticelList(params).then((res) => {
                    if (res.status == 200) {
                        this.items = res.data;
                        console.log('查询出来的文章列表=', res.data)
                    } else if (res.status == 405) {

                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style>
    .userName {
        float: right;
    }
    
    .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        /* position: relative; */
        float: right;
        padding-right: 20px;
    }
    
    .avatar-wrapper .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }
    
    .el-container {
        height: 100%;
        background: linear-gradient(to left bottom, hsl(52, 100%, 85%) 0%, hsl(153, 100%, 85%) 100%);
    }
    
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /* line-height: 160px; */
    }
    
    body>.el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    /* 文章 */
    
    header a {
        color: #00a67c;
        text-decoration: none;
    }
    
    .excerpt {
        position: relative;
        clear: both;
        margin-bottom: 10px;
        padding: 20px 15px 30px 20px;
        background-color: #fff;
        *zoom: 1;
    }
    
    .excerpt:before,
    .excerpt:after {
        display: table;
        content: "";
        line-height: 0;
    }
    
    .excerpt:after {
        clear: both;
    }
    
    .excerpt-nothumbnail {
        padding-left: 20px;
    }
    
    .excerpt-nothumbnail:hover {
        padding-left: 24px;
    }
    
    .excerpt header {
        margin: 0 10px 15px 0;
    }
    
    .excerpt .focus {
        position: relative;
        float: left;
        display: table;
        overflow: hidden;
        margin: 0 20px 0 0;
        text-align: center;
    }
    
    .excerpt .focus a {
        display: table-cell;
        vertical-align: middle;
    }
    
    .excerpt .focus a img {
        display: block;
        margin: 0 auto;
        -webkit-transition: -webkit-transform .3s linear;
        -moz-transition: -moz-transform .3s linear;
        -o-transition: -o-transform .3s linear;
        transition: transform .3s linear;
    }
    
    .excerpt:hover .focus a img {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
        -ms-transform: scale(1.1);
    }
    
    .excerpt p.auth-span {
        position: absolute;
        right: 0;
        bottom: 0;
        float: right;
    }
    
    *+html .excerpt .focus a {
        position: absolute;
        top: 50%;
        width: 100%;
        height: auto;
        text-align: center;
    }
    
    *+html .excerpt .focus a img {
        position: relative;
        top: -50%;
        left: -50%;
    }
    
    .excerpt header .label {
        position: relative;
        top: -2px;
        margin-right: 5px;
        padding: 2px 6px 4px;
    }
    
    .excerpt h2 {
        position: relative;
        top: 1px;
        display: inline;
        margin: 0;
        margin-left: 10px;
        font-weight: normal;
        font-size: 20px;
        line-height: 25px;
    }
    
    .excerpt .note {
        margin-bottom: 0;
        color: #777;
        font-style: normal;
        line-height: 24px;
    }
    
    .excerpt .itag a {
        display: inline-block;
        margin-right: 3px;
        padding: 0 5px;
        border-color: #e2e2e2 #ddd #ddd #e2e2e2;
        border-style: solid;
        border-width: 1px;
        border-radius: 1px;
        line-height: 18px;
    }
    
    .excerpt .muted,
    .article-header .muted,
    .article-header .cate {
        margin-right: 20px;
    }
    
    .hot-posts .muted .action,
    .excerpt .muted .action {
        padding: 0;
        border: 0;
        background-color: #fff!important;
        color: #f78585!important;
        font-size: 13px;
    }
    
    .hot-posts .muted .action i,
    .excerpt .muted .action i {
        margin-right: 1px!important;
    }
    
    .hot-posts .muted {
        margin-left: 20px;
    }
    
    .excerpt .muted {
        font-size: 13px;
    }
</style>