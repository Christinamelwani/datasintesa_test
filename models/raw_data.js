const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

class raw_data {
  //   static async findAll() {
  //     try {
  //       const db = getDatabase();
  //       const users = db.collection("users");
  //       const result = await users.find().toArray();
  //       return result;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  //   static async findById(id) {
  //     try {
  //       const db = getDatabase();
  //       const users = db.collection("users");
  //       const result = await users.findOne({ _id: ObjectId(id) });
  //       if (result === null) {
  //         throw {
  //           name: "not found!",
  //           message: `User with id ${id} does not seem to exist`,
  //         };
  //       }
  //       return result;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  //   static async create(userData) {
  //     try {
  //       const db = getDatabase();
  //       const users = db.collection("users");
  //       const dataToInsert = await validate(userData, users);
  //       dataToInsert.password = createHash(dataToInsert.password);
  //       const result = await users.insertOne(dataToInsert);
  //       return {
  //         id: result.insertedId,
  //         email: userData.email,
  //       };
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
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
