const Algorithm = require('ucb')
const Repository = require('./ucbRepository')
const repository = new Repository()
let algorithm = {}
let id = ''

repository.getInfoUcb().then(r => {
  if (!r) {
    algorithm = new Algorithm({ arms: 3 })
  } else {
    id = r._id
    algorithm = new Algorithm(r.ucbInfo)
  }
})

exports.select = async () => {
  const option = await algorithm.select().then(arm => {
    return arm
  })
  return option
}

exports.reward = async (option, wasPicked) => {
  await algorithm.reward(option, wasPicked).then(async updatedAlgorithm => {
    id = await repository.saveInfoUcb(id, updatedAlgorithm)
  })
}
