const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cors = require("cors");
const articlesRouter = require("./routes/article");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("There was an error connecting to the database");
  console.log(error);
});

db.once("open", () => console.log("Connected to the database"));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.listen(8081, () => {
  console.log(`Server is running or port 8081`);
});
