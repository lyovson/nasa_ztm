import http from "http";

import { app } from "./app.js";

import { loadPlanetsData } from "./models/planets.model.js";

const PORT = process.env.PORT;

const server = http.createServer(app);

await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
