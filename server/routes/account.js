const Koa = require('koa'),
    app = new Koa(),
    md5 = require("../module/md5.js"), //加密
    Router = require('koa-router'),
    DB = require('../module/db.js'),
    UUID = require('uuid'),
    router = new Router();

//注册
router.post('/api/register', async(ctx) => {
    console.log('【注册】psot请求的参数=' + JSON.stringify(ctx.request.body));
    if (ctx.request.body.userName == '') {
        ctx.response.body = {
            "data": {},
            "status": 402,
            "msg": "用户名不可为空！"
        }
        return;
    }
    let findName = await DB.find('user', { 'userName': ctx.request.body.userName });
    console.log('【注册】查询数据库是否有重复的用户名=' + JSON.stringify(findName));
    if (findName.length > 0) {
        ctx.response.body = {
            "data": {},
            "status": 402,
            "msg": "用户名已注册！"
        }
        return;
    }
    if (ctx.request.body.password == '') {
        ctx.response.body = {
            "data": {},
            "status": 200,
            "msg": "用户名可用！"
        }
        return;
    } else {
        ctx.request.body.password = md5(md5(ctx.request.body.password).substr(4, 7) + md5(ctx.request.body.password));
        console.log('加密的密码', ctx.request.body.password);
        ctx.request.body.userId = UUID.v1();
        let data = await DB.insert('user', ctx.request.body);
        // console.log('【注册】插入数据库的的返回结果=', data.result.ok);
        if (data.result.ok == 1) {
            ctx.response.body = {
                "data": {},
                "status": 200,
                "msg": "注册成功，请重新登录！"
            }
        }
    }

})

//登录
router.post('/api/login', async(ctx) => {
    console.log('【登录】psot请求的参数=' + JSON.stringify(ctx));
    let data = await DB.find('user', { 'userName': ctx.request.body.userName });
    console.log('数据库中查出来的用户信息', JSON.stringify(data));
    let password_ = md5(md5(ctx.request.body.password).substr(4, 7) + md5(ctx.request.body.password));
    if (data.length == 0) {
        ctx.response.body = {
            "data": {},
            "status": 405,
            "msg": "用户名或者密码错误！"
        }

    } else if (data[0].password === password_) {
        //生成token，并且将本次的登录时间存入数据库
        let token = UUID.v1();
        let endLoginTime = Date.parse(new Date());
        let json = {
            endLoginTime: endLoginTime,
            token: token
        }
        let update = await DB.update('user', { 'userName': ctx.request.body.userName }, json);
        ctx.response.body = {
            "data": {
                token: token,
                userId: data[0].userId
            },
            "status": 200,
            "msg": "登录成功"
        }
    } else {
        ctx.response.body = {
            "data": {},
            "status": 405,
            "msg": "用户名或者密码错误！"
        }
    }
})

module.exports = router;