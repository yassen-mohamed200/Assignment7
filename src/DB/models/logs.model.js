import { db_name } from "../connection.js";

const logsCollection = db_name.createCollection("logs", {
    capped:true,
    size:1024*1024
});
export default logsCollection;
