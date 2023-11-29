const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyparser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const util = require('./util/util')
const admin = require('./routers/admin')

const path = require('path')
const static = require('koa-static')
app.use(bodyparser())
app.use(cors())
// 获取静态资源文件夹
app.use(static(path.join(__dirname + '/uploads')));

//token校验
app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = util.fail('token认证失败,请重新登录')
    } else {
      throw err
    }
  })
})
//token过滤规则
app.use(koaJwt({ secret: 'sakura' }).unless({ path: [/^\/api\/user\/login/] }))


router.prefix('/api')
router.use(admin.routes(), admin.allowedMethods())
app.use(router.routes(), router.allowedMethods())

app.listen(3000, () => {
  console.log('http://localhost:3000')
})