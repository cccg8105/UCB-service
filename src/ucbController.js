import { select, reward as _reward, init } from './ucbService'

export async function initialize() {
  init()
}

export async function infoService(_, reply) {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('UCB service available')
}

export async function getOption(_, reply) {
  const result = await select()
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ option: result })
}

export async function setReward(req, reply) {
  const { option, reward } = req.body
  await _reward(option, reward)
  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ response: 'Reward assigned' })
}
