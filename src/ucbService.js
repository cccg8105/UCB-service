import Algorithm from 'ucb'
import Repository from './ucbRepository'
const repository = new Repository()
let algorithm = {}
let id = ''

export async function init() {
  repository.getInfoUcb().then(r => {
    if (!r) {
      algorithm = new Algorithm({ arms: 3 })
    } else {
      id = r._id
      algorithm = new Algorithm(r.ucbInfo)
    }
  })
}

export async function select() {
  if (!algorithm) {
    await init()
  }

  const option = await algorithm.select().then(arm => {
    return arm
  })
  return option
}

export async function reward(option, wasPicked) {
  await algorithm.reward(option, wasPicked).then(async updatedAlgorithm => {
    console.log(updatedAlgorithm)
    id = await repository.saveInfoUcb(id, updatedAlgorithm)
  })
}