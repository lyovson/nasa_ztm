import mongoose from "mongoose";
const { Schema } = mongoose;

const planetSchema = new Schema({
  keplerName: { type: String, required: true },
});

export const planets = mongoose.model("Planet", planetSchema);
