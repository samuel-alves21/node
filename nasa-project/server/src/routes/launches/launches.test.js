const request = require('supertest')
const { app } = require('../../app')

describe("GET /planets", () => {
  test('it should return the planets collection with a 200 status code', async () => {
    await request(app)
      .get('/planets')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('POST /launches', () => {
  test('it should create a new launch with a 201 status code', async () => {
    await request(app)
    .post('/launches')
    .send({
      mission: 'test mission',
      rocket: 'test rocket',
      target: 'test target',
      launchDate: 'january 25, 2025'
    })
    .expect('Content-Type', /json/)
    .expect(201)
  })

  test('it should return an error object with a 400 bad request', async () => {
    const response = await request(app)
    .post('/launches')
    .send({
      mission: 'test mission',
      rocket: 'test rocket',
      launchDate: 'january 25, 2025'
    })
    .expect('Content-Type', /json/)
    .expect(400)

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property'
    })
  })

  test('it should return an date error object with a 400 bad request', async () => {
    await request(app)
    .post('/launches')
    .send({
      mission: 'test mission',
      rocket: 'test rocket',
      target: 'test target',
      launchDate: 'january 25, 2025ddddd'
    })
    .expect('Content-Type', /json/)
    .expect(400)
  })
})

