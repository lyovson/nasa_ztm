import request from "supertest";
import { app } from "../app.js";

import { mongoConnect, mongoDisconnect } from "../services/mongo.js";

import { loadPlanetsData } from "../planets/planets.model.js";

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  describe("Test GET /planets", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  afterAll(async () => {
    await mongoDisconnect();
  });
});
