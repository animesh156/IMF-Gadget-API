const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const IMFRoutes = require("./routes/IMF");

app.use("/api", IMFRoutes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
