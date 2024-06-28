
const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const taskRoute = require("./Routes/taskRoute.js");
const userRoute = require("./Routes/userRoute.js");
const connect = require("./Connection/db.js");

app.use(express.json());
app.use("/api", taskRoute);
app.use("/api", userRoute);


app.listen(PORT, () => {
  console.log("server is running");
})
connect();
