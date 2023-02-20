const express = require("express");
const { findByIdAndUpdate } = require("../model/CollectionModel");
const router = express.Router();
const Collection = require("../model/CollectionModel");

// Create Collection
router.post("/create-collection", async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    return res.status(201).send({ success: true, collection });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

// All Collections
router.get("/all-collections", async (req, res) => {
  try {
    let allCollections = await Collection.find();
    return res
      .status(200)
      .send({ success: true, allCollections, total: allCollections.length });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

// Single Collection
router.get("/single-collection/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).send({
        success: false,
        message:
          "No collection found with ID: " +
          req.params.id.slice(0, 4) +
          "..." +
          req.params.id.slice(req.params.id.length - 4),
      });
    }
    return res.status(200).send({ success: true, collection });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

// Update Collection
router.put("/update-collection/:id", async (req, res) => {
  try {
    let newArgs = {};
    if (newArgs) {
      newArgs = req.body;
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $set: newArgs },
      { new: true }
    );
    return res.status(201).send({ success: true, updatedCollection });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

// Delete Collection
router.delete("/delete-collection/:id", async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
    if (!deletedCollection) {
      return res.status(404).send({
        success: false,
        message:
          "No collection found with ID: " +
          req.params.id.slice(0, 4) +
          "..." +
          req.params.id.slice(req.params.id.length - 4),
      });
    }
    return res.status(201).send({
      success: true,
      message:
        "Collection has been deleted successfully with ID: " +
        req.params.id.slice(0, 4) +
        "..." +
        req.params.id.slice(req.params.id.length - 4),
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
