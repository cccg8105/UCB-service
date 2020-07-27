import Fastify from 'fastify'
import routes from './routes'
import { initialize } from './ucbController'

export function buildFastify() {
  const serverInstance = Fastify({ logger: true })

  routes.forEach(route => {
    serverInstance.route(route)
  })

  return serverInstance
}

export async function initializeService() {
  initialize()
}
