let express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// router
let leadRouter = require("./router/leadRouter");

async function main() {
  await mongoose.connect(
    "mongodb+srv://helloworld52980_db_user:123321@cluster0.dfe8bms.mongodb.net/?appName=Cluster0"
  );
}

main()
  .then(() => console.log("mongoDB connected sucessfully"))
  .catch((err) => console.log(err));

let app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/leads", leadRouter);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is runnnig on port ${port}`);
});
