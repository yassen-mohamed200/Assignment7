import booksCollection from "../../DB/models/books.model.js";
import { db_name } from "../../DB/connection.js";
//1. Create an explicit collection named “books” with a validation rule to ensure that each document has a non-empty “title” field. 
export const createBooksCollection = async () => {
  try {
    const collections = await db_name
      .listCollections({ name: "books" })
      .toArray();

    if (collections.length > 0) {
      throw new Error("Collection already exists");
    }
    await db_name.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          title: "book object validation",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title must be a non-empty string",
            },
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
//4. Create an index on the books collection for the title field.
export const createBooksIndex = async () => {
  try {
    await booksCollection.createIndex({
      title: 1,
    });
  } catch (err) {
    throw err;
  }
};
//5. Insert one document into the books collection. 
export const insertBook = async (bodyData) => {
  try {
    const result = await booksCollection.insertOne(bodyData);
    return result;
  } catch (err) {
    throw err;
  }
};
//6. Insert multiple documents into the books collection with at least three records. 
export const insertManyBooks = async (bodyData) => {
  try {
    const result = await booksCollection.insertMany(bodyData);
    return result;
  } catch (err) {
    throw err;
  }
};
//8. Update the book with title “Future” change the year to be 2022.
export const updateBooks = async (bookTitle, bodyData) => {
  try {
    const bookUpdated = await booksCollection.updateOne(
      { title: bookTitle }, // filter
      { $set: bodyData }, // update
    );
    return bookUpdated;
  } catch (err) {
    throw err;
  }
};
//9. Find a Book with title “Brave New World”.
export const findBooks = async (bookTitle) => {
  try {
    const book = await booksCollection.findOne({ title: bookTitle });
    return book;
  } catch (err) {
    throw err;
  }
};
// 10. Find all books published between 1990 and 2010.
export const findBooksYear = async (yearFrom, yearTo) => {
  try {
    const book = await booksCollection
      .find({
        year: {
          $gt: yearFrom,
          $lte: yearTo,
        },
      })
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//11. Find books where the genre includes "Science Fiction".
export const findBookGenre = async (queryData) => {
  try {
    const book = await booksCollection.find({ genres: queryData }).toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//12. Skip the first two books, limit the results to the next three, sorted by year in descending order.
export const skipAndLimitBooks = async () => {
  try {
    const book = await booksCollection
      .find()
      .skip(2)
      .limit(3)
      .sort({ year: -1 })
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//13. Find books where the year field stored as an integer.
export const findYearInteger = async () => {
  try {
    const book = await booksCollection
      .find({
        year: {
          $type: "int",
        },
      })
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".
export const excludeGenres = async () => {
  try {
    const book = await booksCollection
      .find({
        genres: {
          $ne: "Science Fiction",
        },
      })
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//15. Delete all books published before 2000.
export const deleteBooks = async (year) => {
  try {
    const book = await booksCollection.deleteOne({
      year: {
        $lt: year,
      },
    });
    return book;
  } catch (err) {
    throw err;
  }
};
//16. Using aggregation Functions, Filter books published after 2000 and sort them by year descending.
export const aggregate1 = async () => {
  try {
    const book = await booksCollection
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $sort: {
            year: -1,
          },
        },
      ])
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
//17. Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields.
export const aggregate2 = async () => {
  try {
    const book = await booksCollection
      .aggregate([
        {
          $match: {
            year: {
              $gt: 2000,
            },
          },
        },
        {
          $project: {
            title: 1,
            author: 1,
            year: 1,
            _id: 0,
          },
        },
      ])
      .toArray();
    return book;
  } catch (err) {
    throw err;
  }
};
// 18. Using aggregation functions,break an array of genres into separate documents.
export const aggregate3 = async () => {
  try {
    const book=await booksCollection.aggregate([
      {
        $unwind:{
          path:"$genres",
          includeArrayIndex:"index",
          preserveNullAndEmptyArrays:true
        }
      }
    ]).toArray()
    return book;
  } catch (err) {
    throw err;
  }
};

