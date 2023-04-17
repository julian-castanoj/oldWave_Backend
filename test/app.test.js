import request from 'supertest';
import app from '../src/app';


describe('App', () => {
    describe("Run app", () => {
        test("The app is runing status code 200", async () => {
            return await request(app)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toBe(200)
            })
        })
    })
})