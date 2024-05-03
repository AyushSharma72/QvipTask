const express = require("express");
const dotenv = require("dotenv");
const ConnectDb = require("./dbConfig/databaseconfig");
const authRoutes = require("./routes/authroutes");

const cors = require("cors");
//config env
dotenv.configDotenv();

//connect database
ConnectDb();

const app = express();
app.use(express.json());
app.use(cors());

//Route

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server running");
});
