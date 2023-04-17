import request from "supertest";
import app from "../src/app";
import getConnection from "../src/database/database";

describe("Products", () => {
  describe("get products", () => {
    describe("given the products exist", () => {
      test("should return 200", () =>
        request(app)
          .get("/api/products")
          .then((response) => {
            expect(response.statusCode).toBe(200);
          }));

      test("products should match attributes", () =>
        request(app)
          .get("/api/products")
          .then((response) => response.body)
          .then((data) => {
            data.forEach((currentProduct) => {
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
                  stock: expect.any(Number),
                  state: expect.any(String),
                })
              );
            });
          }));

      test("Get recent products", () => {
        return request(app)
          .get("/api/products/getRecentProduct")
          .then((response) => response.body)
          .then((data) => {
            data.forEach((recentProduct) => {
              expect(recentProduct).toEqual(
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
                })
              );
            });
          });
      });
    });
  });
});

afterAll(async () => {
  const connection = await getConnection();
  connection.end();
});
