import SMERouter from 'sme-router'

const router = new SMERouter('router-view')


/**
 * [配置路由]
 * @param {String} path [route path]
 * @param {Function} handler [ handler will be called with handler(req, res, next)]
 * req: request obj
 * res: router instance
 * next: nest route function
 */

router.route('/user/:id', (req, res, next) => {
  console.log('req: ', req)
  const { params, query, body, url, route } = req
  console.log('params.id: ' + params.id) // output => 123
  console.log('query.name: ' + query.name) // output => zjx
  console.log('body.mes: '+ body.mes) // output => hello world
  console.log('url: ' + url) // output => /user/123?name=zjx
  console.log('route: ' + route) // output => /user/:id
})


router.use((req, res, next) => {
  console.log('next: ', next);
  console.log('res: ', res);
  console.log('req: ', req);
})

router.go('/user/123?name=zjx', {mes: 'hello world'})