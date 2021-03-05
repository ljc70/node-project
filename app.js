const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');

const koajwt = require('koa-jwt');
const response_formatter=require('./middlewares/response_formatter')
const errorHandle = require('./middlewares/jwtErrorHandle')
const loggerHandle = require('./middlewares/loggerHandle')

const user = require('./routes/user')
const list = require('./routes/list')

require('./db/db')

// error handler
onerror(app)

// 具体参数我们在后面进行解释
app.use(cors({
    origin: 'http://localhost:8080',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// jwt错误处理
app.use(errorHandle);


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
//控制台日志
app.use(logger()) 
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// loggerHandle 本地日志
app.use(loggerHandle);

app.use(koajwt({
        secret: 'my_token'
    }).unless({
        path: [
          /\/projects/,
          /\/projects\/users\/registerUser/,
          /\/projects\/users\/login/
        ]
    }));
// 所有走/api/打头的请求都需要经过jwt验证。
//router.use('/api', jwt({ secret: db.jwtSecret }), apiRouter.routes());

//添加格式化处理响应结果的中间件，在添加路由之前调用
app.use(response_formatter('^/projects'));
// routes 
app.use(user.routes(), user.allowedMethods())
app.use(list.routes(), list.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
