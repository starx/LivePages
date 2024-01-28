const request = require('supertest');
const express = require('express');
const router = require('../../routes/getting_started');

const app = new express();
app.use(express.json());
app.use('/', router);

describe("Test routes", function () {

    test('responds to /hello-world', async () => {
        const res = await request(app).get('/hello-world');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Hello, World!');
    });

    test('responds to /greet', async () => {
        const res = await request(app)
            .post('/greet')
            .send({ "name": "John" })
            .set('Content-Type', 'application/json');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');        
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('Hello, John!');
    });

});