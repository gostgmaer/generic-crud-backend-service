const express = require("express");
require("dotenv").config();
const connectDB = require("./src/db/connect");
const { dbUrl, serverPort } = require("./src/config/setting");
const app = express();
var cors = require("cors");
const recordRoute = require("./src/routes/record");
const genericRoute = require("./src/routes/entityRecord");
const authRoute = require("./src/routes/auth");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("APP is working!");
});

app.get("/api", (req, res) => {
  res.send("API is working!");
});


app.use("/api", recordRoute);
app.use("/api", genericRoute);
app.use("/api", authRoute);

const port = serverPort || 5000;
const start = async () => {
  try {
    connectDB(dbUrl);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();
