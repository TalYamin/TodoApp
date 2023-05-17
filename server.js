// Tal Yamin 313307662

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const todoRouter = require('./routes/todoRouter')

app.use(
  bodyParser.json({
    type() {
      return true;
    },
  })
);

app.use("/todo", todoRouter);

app.listen(8496, () => {
  console.log("Server listening on port 8496...\n");
});
