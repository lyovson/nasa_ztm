import http from "http";

import mongoose from "mongoose";

import { app } from "./app.js";

import { loadPlanetsData } from "./models/planets.model.js";

const PORT = process.env.PORT;

const server = http.createServer(app);

await mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

await loadPlanetsData();

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
