const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`;
const url = `mongodb+srv://fullstackmodels:${password}@cluster0.xwtc6.mongodb.net/modelsApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const modelSchema = new mongoose.Schema({
  name: String,
  country: String,
  isThick: Boolean,
});

const Model = mongoose.model("Model", modelSchema);

const model = new Model({
  name: "Amber",
  isThick: true,
  country: "USA",
});

model.save().then((result) => {
  console.log("model saved!");
  mongoose.connection.close();
});
