import express from "express";
import {
  aggregate1,
  aggregate2,
  aggregate3,
  createBooksCollection,
  createBooksIndex,
  deleteBooks,
  excludeGenres,
  findBookGenre,
  findBooks,
  findBooksYear,
  findYearInteger,
  insertBook,
  insertManyBooks,
  skipAndLimitBooks,
  updateBooks,
} from "./book.service.js";

export const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  res.send("book page");
});
bookRouter.post("/createCollection", async (req, res) => {
  try {
    const result = await createBooksCollection();
    res.status(201).json({ msg: "Collection created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
bookRouter.post("/createIndex", async (req, res) => {
  try {
    const result = await createBooksIndex();
    res.status(201).json({ msg: "Index created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
bookRouter.post("/insertBook", async (req, res) => {
  try {
    const result = await insertBook(req.body);
    res.status(201).json({ msg: "created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
bookRouter.post("/insertManyBooks", async (req, res) => {
  try {
    const result = await insertManyBooks(req.body);
    res.status(201).json({ msg: "created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//8. Update the book with title “Future” change the year to be 2022.
bookRouter.patch("/bookUpdated/:bookTitle", async (req, res) => {
  try {
    const { bookTitle } = req.params;
    const result = await updateBooks(bookTitle, req.body);
    res.status(201).json({ msg: "updated successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//9. Find a Book with title “Brave New World”.
bookRouter.get("/findBook/:bookTitle", async (req, res) => {
  try {
    const { bookTitle } = req.params;
    const result = await findBooks(bookTitle);
    res.status(201).json({ msg: "filter successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//10. Find all books published between 1990 and 2010.
bookRouter.get("/year", async (req, res) => {
  try {
    const { yearFrom, yearTo } = req.query;
    const from = parseInt(yearFrom);
    const to = parseInt(yearTo);
    const result = await findBooksYear(from, to);
    console.log({ result });

    res.status(201).json({ msg: "filter successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//11. Find books where the genre includes "Science Fiction".
bookRouter.get("/genre", async (req, res) => {
  try {
    const { genre } = req.query;
    const result = await findBookGenre(genre);
    console.log({ result });

    res.status(201).json({ msg: "filter successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//12. Skip the first two books, limit the results to the next three, sorted by year in descending
bookRouter.get("/skip-limit", async (req, res) => {
  try {
    const result = await skipAndLimitBooks();
    res.status(201).json({ msg: "skip-limit successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
// 13. Find books where the year field stored as an integer.
bookRouter.get("/yearInteger", async (req, res) => {
  try {
    const result = await findYearInteger()
    res.status(201).json({ msg: "successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction". 
bookRouter.get("/excludeGenres", async (req, res) => {
  try {
    const result = await excludeGenres()
    res.status(201).json({ msg: "successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//15. Delete all books published before 2000.
bookRouter.delete("/deleteBook", async (req, res) => {
  try {
    const {publishedYear}=req.query
    const year=parseInt(publishedYear)
    const result = await deleteBooks(year)
    res.status(201).json({ msg: "delete successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//16. Using aggregation Functions, Filter books published after 2000 and sort them by year descending.
bookRouter.get("/aggregate1", async (req, res) => {
  try {
    const result = await aggregate1()
    res.status(201).json({ msg: "aggregate successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//17. Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields.
bookRouter.get("/aggregate2", async (req, res) => {
  try {
    const result = await aggregate2()
    res.status(201).json({ msg: "aggregate successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//18. Using aggregation functions,break an array of genres into separate documents.
bookRouter.get("/aggregate3", async (req, res) => {
  try {
    const result = await aggregate3()
    res.status(201).json({ msg: "aggregate successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});