const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const gadgetRoutes = require("./routes/gadgets");
const authRoutes = require("./routes/auth");
const {protect} = require('./middlewares/authMiddlware')     // middleware for the route protection

app.use(cors());
app.use(express.json());

app.use("/gadgets",protect, gadgetRoutes);
app.use("/user", authRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
