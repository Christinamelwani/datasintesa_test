const { raw_data } = require("../models/raw_data");
const csv = require("csv-parser");
const zlib = require("zlib");
const fs = require("fs");
class Controller {
  static async uploadFile(req, res, next) {
    try {
      let line = 0;
      let insertedData = 0;
      let duplicatedData = 0;
      fs.createReadStream(req.file.path)
        .pipe(zlib.createUnzip())
        .on("error", function () {
          res.status(400).json({ status: "error", message: "Invalid file" });
        })
        .pipe(csv())
        .on("error", function () {
          res.status(400).json({ status: "error", message: "Invalid file" });
        })
        .on("data", async function (el) {
          try {
            if (line !== 0) {
              const resultTime = new Date(el["Result Time"]);
              let enodebId = el["Object Name"].substring(
                el["Object Name"].indexOf("eNodeB ID=") + 10
              );
              enodebId = enodebId.substring(0, enodebId.indexOf(","));
              let cellId = el["Object Name"].substring(
                el["Object Name"].indexOf("Local Cell ID=") + 14
              );
              cellId = cellId.substring(0, cellId.indexOf(","));
              let availDur = +el["L.Cell.Avail.Dur"];

              const toInsert = {
                resultTime,
                enodebId,
                cellId,
                availDur,
              };
              await raw_data.create(toInsert);
              insertedData++;
            }
          } catch (err) {
            duplicatedData++;
          }
          line++;
        })
        .on("end", async function () {
          res.status(200).json({
            status: "Success",
            message:
              "Data successfully inserted, but might take some time to update",
          });
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async getGraph(req, res, next) {
    try {
      let output = [];
      const { enodebId, cellId, startDate, endDate } = req.query;
      if (!enodebId || !cellId || !startDate || !endDate) {
        throw new Error(
          `EnodebId, cellId, startDate and endDate must all be provided!`
        );
      }
      const data = await raw_data.filter({
        enodebId,
        cellId,
        startDate,
        endDate,
      });
      data.forEach((el) => {
        output.push({
          resultTime: el.resultTime,
          availability: (el.availDur / 900) * 100,
        });
      });
      res.send(output);
    } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
    }
  }
}

module.exports = Controller;
