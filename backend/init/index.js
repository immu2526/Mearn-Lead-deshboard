let express = require("express");
const mongoose = require("mongoose");
const lead = require("../models/leadSchema");
const dummyLeads = require("./data");

async function main() {
  await mongoose.connect(
    "mongodb+srv://helloworld52980_db_user:123321@cluster0.dfe8bms.mongodb.net/?appName=Cluster0"
  );
}

main()
  .then(() => console.log("mongoDB connected sucessfully"))
  .catch((err) => console.log(err));

let app = express();

let dataInsert = async () => {
  try {
    let mongo = await lead.insertMany(dummyLeads);
    console.log("data insert successfuly");
  } catch (err) {
    console.log("❌ Error:", err);
  }
};

dataInsert();
