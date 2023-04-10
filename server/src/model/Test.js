import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  age: { type: Number },
});

export const TestModel = mongoose.model("testdataedit", TestSchema);
