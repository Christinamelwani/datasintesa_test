const { getDatabase } = require("../config/mongoConnection");
const {} = require("mongodb");

class raw_data {
  static async findAll() {
    try {
      const db = getDatabase();
      const raw_data = db.collection("raw_data");
      const result = await raw_data.find().toArray();
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async filter({ enodebId, cellId, startDate, endDate }) {
    try {
      const db = getDatabase();
      const raw_data = db.collection("raw_data");
      const result = await raw_data
        .find({
          enodebId,
          cellId,
          resultTime: { $gte: new Date(startDate), $lt: new Date(endDate) },
        })
        .toArray();
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async create(dataToInsert) {
    try {
      const db = getDatabase();
      const users = db.collection("raw_data");
      const result = await users.insertOne(dataToInsert);
      return {
        id: result.insertedId,
        resultTime: result.resultTime,
      };
    } catch (err) {
      throw err;
    }
  }
  //   static async delete(id) {
  //     try {
  //       const db = getDatabase();
  //       const users = db.collection("users");
  //       const result = await users.deleteOne({ _id: ObjectId(id) });
  //       if (result.deletedCount === 0) {
  //         throw {
  //           name: "not found",
  //           message: `User with id ${id} does not seem to exist`,
  //         };
  //       }
  //       return `User with id ${id} deleted`;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
}

module.exports = { raw_data };
