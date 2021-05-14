import { Service } from './service'
/**
 * Instancia de la clase service
 * @type {Service} 
 */
let service = null

/**
 * Función que instancia al servicio
 */
async function initialize() {
  service = new Service()
}

/**
 * Permite realizar una petición para comprobar la disponibilidad del servicio
 * @param {*} _ 
 * @param {Object} reply Objeto encargado de manejar la petición Http de respuesta
 */
async function infoService(_, reply) {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('UCB service available')
}

/**
 * Invoca el método del service para seleccionar la mejor opción 
 * @param {*} _ 
 * @param {Object} reply Objeto encargado de manejar la petición Http de respuesta
 */
async function getOption(_, reply) {
  const result = await service.select()
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ option: result })
}

/**
 * Invoca el método del service para actualizar los indicadores del UCB
 * @param {Request} req Request con los datos de entrada
 * @param {Object} reply  Objeto encargado de manejar la petición Http de respuesta
 */
async function setReward(req, reply) {
  const { option, reward } = req.body
  await service.reward(option, reward)
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ response: 'Reward assigned' })
}

export { initialize, infoService, getOption, setReward }
