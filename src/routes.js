const ucbController = require('./ucbController')

const routes = [
  {
    method: 'GET',
    url: '/api/ucb',
    handler: ucbController.obtenerOpcion,
  },
  {
    method: 'PUT',
    url: '/api/ucb',
    handler: ucbController.asignarRecompensa,
  },
]

module.exports = routes
