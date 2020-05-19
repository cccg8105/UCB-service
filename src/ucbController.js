const service = require('./ucbService')

exports.obtenerOpcion = async (req, reply) => {
  const result = await service.select()
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ opcion: 'Opcion seleccionada: ' + result })
}

exports.asignarRecompensa = async (req, reply) => {
  const { opcion, recompensa } = req.body
  await service.reward(opcion, recompensa)
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ respuesta: 'Datos guardados correctamente' })
}
