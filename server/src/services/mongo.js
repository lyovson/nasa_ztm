import mongoose from "mongoose";

export async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URI);
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});
