<template>
    <div id="home">
     <h1>这个是默认首页</h1>
     <h2>文章（说说）</h2>
     <ul>
        <li v-for="item in items">
            {{ item.title }}
          </li>
     </ul>

     <div class="writeText">
         <input type="text" placeholder="请输入文章标题" v-model='article.title'>
        <textarea name="" id="" cols="30" rows="10"  v-model='article.content'></textarea>
        <input type="submit" value="提交" @click='addArticle'>
     </div>    
    </div>
  </template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                items: [],
                article: {
                    title: '',
                    content: '',
                    time: ''
                }
            }
        },
        created() {
            this.findArticelList();
        },
        methods: {
            addArticle() {
                let token = sessionStorage.getItem("token");
                this.article.time = Date.parse(new Date());
                console.log(this.article);
                this.$http.post('/api/article/api/addArticle', this.article).then((res) => {
                    if (res.data.status == 200) {
                        this.findArticelList();
                    } else if (res.data.status == 405) {

                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            findArticelList() {
                let userId = sessionStorage.getItem("userId");
                this.$http.post('/api/article/api/findArticleList', {
                    userId: userId
                }).then((res) => {
                    if (res.data.status == 200) {
                        this.items = res.data.data;
                        console.log('查询出来的文章列表=', res.data)
                    } else if (res.data.status == 405) {

                    }
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
</script>

<style scoped>

</style>