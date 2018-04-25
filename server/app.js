const Koa = require('koa'),
    router = require('koa-router')(),
    path = require('path'),
    cors = require('koa-cors'),
    koaBody = require('koa-body'),
    account = require('./routes/account.js'),
    article = require('./routes/article.js'),
    upload = require('./routes/upload.js'),
    app = new Koa();



// console.log('判断path是不是node.js的原生模块=', process.binding('natives').hasOwnProperty('path'));

app.use(koaBody({ multipart: true })); //配置post提交数据的中间件
app.use(router.routes()); //启动路由
app.use(router.allowedMethods());
router.use('/account', account.routes(), account.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());


//跨域解决
app.use(cors({
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.listen(8081, () => {
    console.log('启动成功！');
})