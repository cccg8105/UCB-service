import Algorithm from 'ucb'
import Yenv from 'yenv'
import { Repository } from './repository'

const env = new Yenv()

/**
 * Clase encargada de interactuar con el repositorio y los métodos del algoritmo UCB
 * @property {Repository} repository  Instancia de la clase que interactua con la BD
 * @property {Algorithm} algorithm  Instancia de la clase que implementa los métodos del algoritmo UCB
 */
class Service {
  /**
   * Constuctor de la clase
   */
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

  /**
   * Obtiene el nro de brazo u opción óptima según el algoritmo UCB 
   * @returns {Number} Número de brazo u opción seleccionada por el algoritmo UCB
   */
  async select() {
    const option = await this.algorithm.select().then(arm => {
      return arm
    })
    return option
  }

  /**
   * Obtiene los estimadores de recompensa del algoritmo UCB y los almacena en BD
   * @param {Number} option Nro de opción mostrada al usuario
   * @param {Number} wasPicked Representa la acción del usuario de interactuar con la opción mostrada (1 - Interactuó | 0 - No interactuó)
   * @returns {void}
   */
  async reward(option, wasPicked) {
    const updatedAlgorithm = await this.algorithm.reward(option, wasPicked)
    this.id = await this.repository.saveInfoUcb(this.id, updatedAlgorithm)
  }
}

export { Service }