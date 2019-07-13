const request = require('supertest')
const app = require('../app')

const models = require('../models')

describe('API tests', () => {
  beforeAll(() => {
    models.sequelize.sync().then(() => {
      models.sequelize.close()
    })
  })

  afterAll(async () => {
    await models.sequelize.dropAllSchemas({})
  })

  describe('API root endpoint', () => {
    it('Expect response with status code 200', () => {
      return request(app)
        .get('/')
        .expect(200)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  describe('API Admins endpoint', () => {
    it('Expect response with status code 200', () => {
      return request(app)
        .get('/admins')
        .expect(400)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  describe('API Admins Login endpoint', () => {
    it('Expect response with status code 400: Username or password wrong', () => {
      return request(app)
        .post('/admins/login')
        .expect(400)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  describe('API Admins Logout endpoint', () => {
    it('Expect response with status code 200: Successfully Logout', () => {
      return request(app)
        .get('/admins/logout')
        .expect(200)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  describe('API Verify token Admin', () => {
    test('Expect response with status code 417: Please specify the token in request header', () => {
      return request(app)
        .get('/admins/verifytoken')
        .expect(400)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  describe('API Merchants endpoint', () => {
    test('Expect response with status code 200', () => {
      return request(app)
        .get('/merchants')
        .expect(200)
        .set('Accept', 'application/json')
        .then(response => expect(response).toBeTruthy())
    })
  })

  describe('API Merchants Register endpoint', () => {
    test('Expect response with status code 417: Please fill all data', () => {
      return request(app)
        .post('/merchants/register')
        .expect(417)
        .then(response => expect(typeof response).toBe('object'))
    })
  })

  afterAll(function() {
    models.sequelize.close()
  })
})
