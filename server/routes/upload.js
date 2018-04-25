/*
 * @Author   wq
 * @DateTime 2018-04-22 14:28:21 
 */
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaRouter = require('koa-router');

let app = new Koa();
let router = koaRouter();

router.post('/img', (ctx) => {
    //限制一个文件上传
    // console.log("ctx.request.body.files.file=" + JSON.stringify(ctx.request.body.files.file))
    let file = ctx.request.body.files.file;
    let readStream = fs.createReadStream(file.path);
    let imgPath = path.resolve(__dirname, '..');
    imgPath = path.join(imgPath, `/public/images/${Date.now()}.jpg`);
    // console.log(imgPath)
    let writeStream = fs.createWriteStream(imgPath);
    readStream.pipe(writeStream);
    ctx.body = {
        data: {
            imgPath: ''
        },
        status: 200,
        msg: '图片上传成功！'
    };
});

app.use(koaStatic(path.join(__dirname, '/public')));

module.exports = router;