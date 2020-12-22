import { getOption, setReward, infoService } from './ucbController'

const routes = [
  {
    method: 'GET',
    url: '/',
    handler: infoService,
  },
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
