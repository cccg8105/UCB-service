import Service from './service'

let service = null

export async function initialize() {
  service = new Service()
}

export async function infoService(_, reply) {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('UCB service available')
}

export async function getOption(_, reply) {
  const result = await service.select()
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ option: result })
}

export async function setReward(req, reply) {
  const { option, reward } = req.body
  await service.reward(option, reward)
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ response: 'Reward assigned' })
}
