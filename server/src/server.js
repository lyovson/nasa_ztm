import http from "http";

import { mongoConnect } from "./services/mongo.js";

import { app } from "./app.js";

import { loadPlanetsData } from "./planets/planets.model.js";

const server = http.createServer(app);

await mongoConnect();
await loadPlanetsData();

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
