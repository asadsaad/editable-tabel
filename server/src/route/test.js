import express from "express";
import mongoose from "mongoose";
import { TestModel } from "../model/Test.js";

const router = express.Router();

//add data to table route
router.post("/adddata", async (req, res) => {
  const { employee_id, name, city, country, age } = req.body;

  console.log("i am in");
  const newData = new TestModel({
    employee_id,
    name,
    city,
    country,
    age,
  });
  await newData.save();

  res.json({ message: "User registered succesfully" });
  console.log("user successfully created");
});

//get all data route
router.get("/testdata", async (req, res) => {
  console.log("I am in");
  try {
    const response = await TestModel.find({});
    res.json(response);

    console.log("hello");
  } catch (err) {
    res.json(err);
  }
});

// delete single record
router.delete("/delete/:id", async (req, res) => {
  try {
    const response = await TestModel.findByIdAndDelete({ _id: req.params.id });
    return res
      .status(200)
      .json({ success: true, message: "Record Deleted Successfully!" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

// delete multiple records
router.post("/deleteMany", async (req, res) => {
  let ids = req.body.ids;
  console.log(ids);
  try {
    const response = await TestModel.deleteMany({ _id: { $in: ids } });
    return res
      .status(200)
      .json({ success: true, message: "Records Deleted Successfully!" });
  } catch (err) {
    return res.status(400).json({ success: false, error: err });
  }
});

// insert multiple records
router.post("/insertMany", async (req, res) => {
  let records = req.body.records;
  let edit = req.body.edits;
  console.log(edit);
  let edits_ = [];

  try {
    const response = await TestModel.insertMany(records);

    for (let index = 0; index < edit.length; index++) {
      const element = edit[index];
      let check = await TestModel.find({ _id: { $ne: element?._id } });
      console.log(check);
      if (check) {
        console.log("yes");
        let record_ = await TestModel.findByIdAndUpdate(
          { _id: element._id },
          {
            name: element?.name,
            age: element?.age,
            country: element?.country,
            city: element.city,
            employee_id: element?.employee_id,
          },
          { new: true }
        );
        edits_.push(record_);
      } else {
        console.log("no");

        let arecord_ = new TestModel({
          name: element?.name,
          age: element?.age,
          country: element?.country,
          city: element.city,
          employee_id: element?.employee_id,
        });
        let record_ = await arecord_.save();
        edits_.push(record_);
      }
    }
    return res.status(200).json({
      success: true,
      message: "Records Deleted Successfully!",
      data: response,
      edits: edits_,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
});
export { router as testRouter };
