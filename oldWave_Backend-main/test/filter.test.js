import request from "supertest";
import app from "../src/app";
import getConnection from "../src/database/database";

describe("Filters", () => {
  describe("Get all filters", () => {
    test("Response all categories", async () => {
      return await request(app)
        .get("/api/filter")
        .then((response) => response.body)
        .then((data) => {
          expect(data).toEqual(
            expect.objectContaining({
              category: expect.any(Array),
              brand: expect.any(Array),
              state: expect.any(Array),
            })
          );
        });
    });
  });

  /* describe("Get category by id", () => {
    test("Response category", async () => {
        return await request(app)
        .get("/api/filter/1")
        .then((response) => response.body)
        .then((data) => {
            const currentCategory = data[0]
          expect(currentCategory).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String)
            })
          );
        });
    })
  }) */
});

afterAll(async () => {
  const connection = await getConnection();
  connection.end();
});
