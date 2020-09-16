import { general, auth } from './controller'
import Router from '@koa/router'
import { SwaggerRouter } from 'koa-swagger-decorator'
const unprotectedRouter = new Router()

// Hello World route
unprotectedRouter.get('/', general.helloWorld)
unprotectedRouter.post('/api/auth/login', auth.login)
unprotectedRouter.post('/api/auth/register', auth.register)

const swaggerRouter = new SwaggerRouter()
// Swagger endpoint
swaggerRouter.swagger({
  title: 'node-typescript-koa-rest',
  description:
    'API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.',
  version: '1.5.0',
})

// dir mapDir将扫描输入,并自动调用路由器。
swaggerRouter.mapDir(__dirname)

export { unprotectedRouter, swaggerRouter }
