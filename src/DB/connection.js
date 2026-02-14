import { MongoClient } from "mongodb";
import { DB_NAME } from "../../config/config.service.js";
import { DB_URL_ATLAS } from "../../config/config.service.js";

const client = new MongoClient(DB_URL_ATLAS);
export const db_name = client.db(DB_NAME);

export const connectDb = async () => {
  try {
    await client.connect();
    console.log("successfully connect to db");
  } catch (err) {
    console.log("failed connect to db:", err);
  }
};
