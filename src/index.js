const fastify = require('fastify')({ logger: true })
import routes from './routes'
import { initialize } from './controller'
import Yenv from 'yenv'

const env = new Yenv()

routes.forEach(route => {
  fastify.route(route)
})

const start = async () => {
  initialize()
  try {
    fastify.listen(env.PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

if (env.NODE_ENV !== 'test') start()

export default { fastify }
