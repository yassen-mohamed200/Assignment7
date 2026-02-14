import { db_name } from "../../DB/connection.js";
import logsCollection from "../../DB/models/logs.model.js";
//3. Create a capped collection named “logs” with a size limit of 1MB. 
export const createLogsCollection = async () => {
  const exists = await db_name.listCollections({ name: "logs" }).toArray();
  if (exists.length > 0) {
    throw new Error("logs collection already exists");
  }
  await db_name.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
};
// 7. Insert a new log into the logs collection.
export const insertLogs = async (bodyData) => {
  try {
    const result = await logsCollection.insertMany(bodyData);
    return result;
  } catch (err) {
    throw err;
  }
};
//19. Using aggregation functions, Join the books collection with the logs collection.
export const aggregate4 = async () => {
  try {
    const logs = await (await logsCollection).aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "books_logs",
          },
        },
      ])
      .toArray();
    return logs;
  } catch (err) {
    throw err;
  }
};
