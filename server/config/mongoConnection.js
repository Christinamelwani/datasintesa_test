const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://user:user@cluster0.nczrymc.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
let db = {};

function getDatabase() {
  return db;
}

async function connect() {
  try {
    await client.connect();
    db = client.db("fullstack_test");
  } catch (err) {
    console.log("Failed to connect! Details: \n", err);
  }
}
async function disconnect() {
  try {
    await client.close();
  } catch (err) {
    console.log("Failed to connect! Details: \n", err);
  }
}

module.exports = { getDatabase, connect, disconnect };
