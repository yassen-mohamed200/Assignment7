import authorCollection from "../../DB/models/authors.model.js";
//2. Create an implicit collection by inserting data directly into a new collection named “authors”.
export const insertAuthors = async (bodyData) => {
  const result = await authorCollection.insertOne(bodyData);
  return result;
};
