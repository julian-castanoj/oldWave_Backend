import request from "supertest";
import app from "../src/app";
import getConnection from "../src/database/database";
import { v4 as uuidv4 } from "uuid";

describe("User", () => {
  describe("Given that the user exist", () => {
    test("should return status code 200", async () => {
      const user = {
        email: "carlosquiros1@gmail.com",
        name: "Carlos",
        lastname: "Quiros",
        sub: "123457",
      };

      return await request(app)
        .post("/api/users/")
        .send(user)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("Given that the user does not exist", () => {
    test("Create user", async () => {
      const uniqueId = uuidv4();
      const newUser = {
        email: `${uniqueId}@gmail.com`,
        name: "Carlos",
        lastname: "Quiros",
        sub: `${uniqueId}`,
      };
      return await request(app)
        .post("/api/users/")
        .send(newUser)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
  });
});

afterAll(async () => {
  const connection = await getConnection();
  connection.end();
});
