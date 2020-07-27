import supertest from 'supertest'
import { buildFastify, initializeService } from '../src/app'

//const supertestInstance = supertest('http://localhost:5000')
let server = ''
const TIMEOUT = 1000 * 60 * 30
let request = ''

beforeAll(async () => {
  server = buildFastify()
  await server.listen(5000)
  await initializeService()
  request = supertest('http://localhost:5000')
})

afterAll(() => server.close())

describe('GET /ucb', () => {
  it(
    'validate error code 500',
    async () => {
      await request
        .get('/api/ucb')
        .set('Accept', 'application/json')
        .expect(500)
    },
    TIMEOUT
  )

  it(
    'validate get best arm',
    async () => {
      const response = await request
        .get('/api/ucb')
        .set('Accept', 'application/json')
        .expect(200)
      const data = response.body
      expect(Object.keys(data)).toEqual(expect.arrayContaining(['option']))
    },
    TIMEOUT
  )

  it(
    'validate set reward',
    async () => {
      const input = { option: 0, reward: 1 }

      const response = await request
        .put('/api/ucb')
        .send(input)
        .set('Accept', 'application/json')
        .expect(200)
      const data = response.body
      expect(Object.keys(data)).toEqual(expect.arrayContaining(['response']))
    },
    TIMEOUT
  )
})
