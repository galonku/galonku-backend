const request = require('supertest')
const app = require('../app')


describe('API root endpoint', () => {
    it('Expect response with status code 200', () => {
        return request(app)
            .get('/')
            .expect(200)
    })
})

describe('API Admins endpoint', function () {
    it('Expect response with status code 200', () => {
        return request(app)
            .get('/admins')
            .expect(400)
    })
})

describe('API Admins Login endpoint', () => {
    it('Expect response with status code 400: Username or password wrong', function () {
        return request(app)
            .post('/admins/login')
            .expect(400)
    })
})

describe('API Admins Logout endpoint', () => {
    it('Expect response with status code 200: Successfully Logout', function () {
        return request(app)
            .get('/admins/logout')
            .expect(200)
    })
})

describe('API Verify token Admin', () => {
    test('Expect response with status code 417: Please specify the token in request header', function () {
        return request(app)
            .get('/admins/verifytoken')
            .expect(400)
    })
})

describe('API Merchants endpoint', () => {
    test('Expect response with status code 200', () => {
        return request(app)
            .get('/merchants')
            .expect(200)
    })
})

describe('API Merchants Register endpoint', () => {
    test('Expect response with status code 417: Please fill all data', () => {
        return request(app)
            .post('/merchants/register')
            .expect(417)
    })
})
