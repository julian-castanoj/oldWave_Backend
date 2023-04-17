import request from "supertest";
import app from "../src/app";
import getConnection from "../src/database/database";

describe("Orders", () => {
  describe("error in request order", () => {
    test("Should return status code 400 error with products id", async () => {
      const newOder = {
        idProduct: 1,
        idUser: 1,
        quantity: [10, 140]
      };
      return await request(app)
        .post("/api/orders")
        .send(newOder)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    test("Should return status code 400 error with quantity", async () => {
      const newOder = {
        idProduct: [1, 2],
        idUser: 1,
        quantity: 1
      };
      return await request(app)
        .post("/api/orders")
        .send(newOder)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });

    test("stock has been exceeded", async () => {
        const newOder = {
          idProduct: [1, 2],
          idUser: 1,
          quantity: [5000,5000]
        };
        return await request(app)
          .post("/api/orders")
          .send(newOder)
          .then((response) => {
            expect(response.statusCode).toBe(400);
          });
      });
  });


  describe("Succes create order", () => {
    test("Order success", async () => {
      const newOrder = {
        idProduct: [13, 18],
        idUser: "115935823242818316311",
        quantity: [1, 1]
      };

      return await request(app)
        .post("/api/orders")
        .send(newOrder)
        .then((response) => {
          expect(response.statusCode).toBe(201);
        });
    });
  });

  describe("Get order", () => {
    test('Get orden by user', async() => {
        return await request(app)
        .get('/api/orders/115935823242818316311')
        .then((response) => {
            expect(response.statusCode).toBe(200)
        })
    })

    test('Error orden by user', async() => {
        return await request(app)
        .get('/api/orders/3')
        .then((response) => {
            expect(response.statusCode).toBe(404)
        })
    })
  })
});

afterAll(async () => {
  const connection = await getConnection();
  connection.end();
});
