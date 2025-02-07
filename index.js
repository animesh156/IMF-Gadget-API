const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require('cors')
const port = process.env.PORT;
const gadgetRoutes = require("./routes/gadgets");

app.use(cors())
app.use(express.json())

app.use("/gadgets", gadgetRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
