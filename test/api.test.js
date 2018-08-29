const request = require('supertest')
const app = require('../app')

describe('API root endpoint', () => {
    test('Expect response with status code 200', () => {
        return request(app)
            .get('/')
            .expect(200)
    })
})