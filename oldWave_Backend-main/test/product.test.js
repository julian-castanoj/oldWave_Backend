import request from 'supertest';
import app from '../src/app';
import getConnection from '../src/database/database';

describe('Product', () => {
  describe('get product', () => {
    describe('given the product does not exist', () => {
      test('should return status code 404', () => {
        const productId = 0;
        return request(app)
          .get(`/api/product/${productId}`)
          .then((response) => {
            expect(response.statusCode).toBe(404);
          });
      });
    });

    describe('given the product exist', () => {
      const productId = 1;
      test('should return status code 200', () => request(app)
        .get(`/api/product/${productId}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        }));

      test('should return same product', () => request(app)
        .get(`/api/product/${productId}`)
        .then((response) => {
          expect(response.body[0].id).toBe(1);
        }));

      test('product should match attributes', () => request(app)
        .get(`/api/product/${productId}`)
        .then((response) => response.body)
        .then((data) => {
          const currentProduct = data[0];
          expect(currentProduct).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              description: expect.any(String),
              price: expect.any(Number),
              brand: expect.any(String),
              city: expect.any(String),
              reseller: expect.any(String),
              reseller_logo: expect.any(String),
              reseller_rating: expect.any(Number),
              imgs: expect.any(Array),
              stock: expect.any(Number),
              state: expect.any(String)
            }),
          );
        }));
    });
  });

  describe('match product', () => {
    describe('given the products does not exist', () => {
      const query = 'thisquerydoesntmatch';

      test('should return status code 200', () => request(app)
        .get(`/api/product/?query=${query}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        }));

      test('should return void list', () => request(app)
        .get(`/api/product/?query=${query}`)
        .then((response) => {
          expect(response.body.length)
            .toBe(0);
        }));
    });

    describe('given the products exist', () => {
      const query = 'nike';
      test('should return 200', () => request(app)
        .get(`/api/product/?query=${query}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        }));

      test('products should match attributes', () => request(app)
        .get(`/api/product/?query=${query}`)
        .then((response) => response.body)
        .then((data) => {
          data.forEach(((currentProduct) => {
            expect(currentProduct).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                thumbnail: expect.any(String),
                brand: expect.any(String),
                city: expect.any(String),
                reseller: expect.any(String),
                reseller_rating: expect.any(Number),
                stock: expect.any(Number)
              }),
            );
          }));
        }));
    });
  });
});

afterAll(async () => {
  const connection = await getConnection();
  connection.end();
});
