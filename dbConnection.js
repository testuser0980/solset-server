const mongoose = require("mongoose");
const URI = `mongodb+srv://testuser0980:4CVBBtKZ5vgwzv7I@cluster0.w3nyd03.mongodb.net/SnipeCollection?retryWrites=true&w=majority`;
// const URI = `mongodb://localhost:27017/SnipeCollection`;

const ConnectToMongoose = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));
};
module.exports = ConnectToMongoose;
