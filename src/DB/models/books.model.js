import { db_name } from "../connection.js";

const booksCollection=db_name.collection("books")

export default booksCollection;