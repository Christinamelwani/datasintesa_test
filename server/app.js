const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

const { connect } = require("./config/mongoConnection");
const Controller = require("./controllers/controller");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/upload", upload.single("file"), Controller.uploadFile);
app.get("/graph", Controller.getGraph);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Listening at ${port}`);
  });
});
