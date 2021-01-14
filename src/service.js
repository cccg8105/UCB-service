import Algorithm from 'ucb'
import Yenv from 'yenv'
import Repository from './repository'

const env = new Yenv()

export default class {
  constructor() {
    this.repository = new Repository()
    const info = this.repository.getInfoUcb().then(info => {
      return info
    })
    if (info) {
      this.id = info._id
      this.algorithm = new Algorithm(info.ucbInfo)
    } else this.algorithm = new Algorithm({ arm: env.ARMS_NUMBER })
  }

  async select() {
    const option = await this.algorithm.select().then(arm => {
      return arm
    })
    return option
  }

  async reward(option, wasPicked) {
    const updatedAlgorithm = await this.algorithm.reward(option, wasPicked)
    this.id = await this.repository.saveInfoUcb(this.id, updatedAlgorithm)
  }
}
