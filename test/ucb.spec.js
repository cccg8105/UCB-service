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
    'validate get best arm',
    async () => {
      const response = await request
        .get('/api/ucb')
        .set('Accept', 'application/json')
        .expect(500)
      console.log(response)
      // const data = response.body
      // expect(Object.keys(data)).toEqual(expect.arrayContaining(['option']))
    },
    TIMEOUT
  )

  it(
    'validate get best arm 2',
    async () => {
      const response = await request
        .get('/api/ucb')
        .set('Accept', 'application/json')
        .expect(200)
      //console.log(response)
      const data = response.body
      expect(Object.keys(data)).toEqual(expect.arrayContaining(['option']))
    },
    TIMEOUT
  )

  it(
    'validate get best arm 3',
    async () => {
      const response = await request
        .get('/api/ucb')
        .set('Accept', 'application/json')
        .expect(200)
      //console.log(response)
      const data = response.body
      expect(Object.keys(data)).toEqual(expect.arrayContaining(['option']))
    },
    TIMEOUT
  )
})
