require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const loanRouter = require("./routes/loanRoute");
const paymentRouter = require("./routes/paymentRoute");
const profileRouter = require("./routes/profileRoute");
const userRouter = require("./routes/userRoute");
const errorController = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json("Hello and welcome to this micro finance api");
});

app.use("/auth", authRouter);
app.use("/loans", loanRouter);
app.use("/payment", paymentRouter);
app.use("/profile", profileRouter);
app.use("/users", userRouter);

app.use("*", (req, res) => {
  return res.status(404).json("This route can not be found on the server");
});

app.use(errorController);

module.exports = app;
