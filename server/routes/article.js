const Koa = require('koa'),
    app = new Koa(),
    Router = require('koa-router'),
    DB = require('../module/db.js'),
    UUID = require('uuid'),
    router = new Router();

//添加文章
router.post('/api/addArticle', async(ctx) => {
    console.log('【添加文章列表】psot请求的参数=' + JSON.stringify(ctx.request.header));
    if (ctx.request.header.token == undefined || ctx.request.header.token == 'undefined' || ctx.request.header.token == '') {
        ctx.response.body = {
            "data": {},
            "status": 401,
            "msg": "请登陆！"
        }
        return;
    }
    console.log('这是添加文章用户token=', ctx.request.header.token);
    let user = await DB.find('user', { 'token': ctx.request.header.token });
    console.log('这是添加文章查询出来的用户', user);
    let dated = (Date.parse(new Date()) - user.endLoginTime) > 1800000;
    if (dated) {
        ctx.response.body = {
            "data": {},
            "status": 401,
            "msg": "token失效请重新登陆！"
        }
        return;
    }
    if (ctx.request.body.title != '' && ctx.request.body.content != '' && ctx.request.body.time != '') {
        let json = {
            userId: user[0].userId,
            title: ctx.request.body.title,
            content: ctx.request.body.content,
            time: ctx.request.body.time
        }
        let article = await DB.insert('article', json);
        if (article.result.ok == 1) {
            ctx.response.body = {
                "data": {},
                "status": 200,
                "msg": "添加成功"
            }
            return;
        }
    }

})

//查询文章列表
router.post('/api/findArticleList', async(ctx) => {
    console.log('【查询文章列表】psot请求的参数=' + JSON.stringify(ctx.request.body));
    if (ctx.request.header.token == '') {
        ctx.response.body = {
            "data": {},
            "status": 401,
            "msg": "请登陆！"
        }
        return;
    }
    if (ctx.request.body.userId == '') {
        ctx.response.body = {
            "data": {},
            "status": 405,
            "msg": "参数不正确！"
        }
        return;
    } else {
        let article = await DB.find('article', { 'userId': ctx.request.body.userId });
        console.log("【查询文章列表】", article)
        if (article.length > 0) {
            ctx.response.body = {
                "data": article,
                "status": 200,
                "msg": "ok"
            }
        } else {
            ctx.response.body = {
                "data": [],
                "status": 200,
                "msg": "暂无文章！"
            }
        }
    }

})

module.exports = router;