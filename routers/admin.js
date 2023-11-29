const Router = require('koa-router')
const router = new Router()
const db = require('../util/db')
const util = require('../util/util')
//二级路由
router.prefix('/admin')

router.post('/create', async (ctx) => {
  const { username, password } = ctx.request.body
  let sql = `insert into user(username,password) values('${username}','${password}')`
  await new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) throw err
      resolve(data)
    })
  })
  ctx.body = util.success('', '新增成功')
})

module.exports = router
