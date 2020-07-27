import { getOption, setReward } from './ucbController'

const routes = [
  {
    method: 'GET',
    url: '/api/ucb',
    handler: getOption,
  },
  {
    method: 'PUT',
    url: '/api/ucb',
    handler: setReward,
  },
]

export default routes
