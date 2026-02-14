import { Router } from "express";
import { insertAuthors } from "./authors.services.js";

export const authorsRouter = Router();
authorsRouter.get("/", (req, res) => {
  res.send("authors page");
});
authorsRouter.post("/insertData", async (req, res) => {
  try {
    const result = await insertAuthors(req.body);
    res.status(201).json({ msg: "created successfully", result });
  } catch (err) {
    console.log({ msg: err.message });
  }
});
