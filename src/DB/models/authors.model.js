import { db_name } from "../connection.js";

const authorCollection = db_name.collection("authors");

export default authorCollection;
