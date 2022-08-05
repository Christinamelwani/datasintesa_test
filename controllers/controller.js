const { raw_data } = require("../models/raw_data");
const csv = require("fast-csv");
class Controller {
  static async uploadFile(req, res, next) {
    const fileRows = [];

    csv
      .parseFile(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("end", function () {
        console.log(fileRows);
      });
  }
  static async getGraph(req, res, next) {
    res.send("get graph works");
  }
}

module.exports = Controller;
