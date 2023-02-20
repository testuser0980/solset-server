const express = require("express");
const cors = require("cors");
const ConnectToMongoose = require("./dbConnection");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 6000;

ConnectToMongoose();

app.use("/api/v1", require("./route/CollectionRoute"));

app.listen(port, () => {
  console.log("Server is running on " + port);
});
