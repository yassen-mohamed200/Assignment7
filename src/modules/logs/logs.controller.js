import { Router } from "express";
import { aggregate4, createLogsCollection, insertLogs } from "./logs.service.js";

export const logsRouter = Router();

logsRouter.get("/", (req, res) => {
  res.send("logs page");
});
logsRouter.post("/createCollection", async (req, res) => {
  try {
    const result = await createLogsCollection();
    res.status(201).json({ msg: "Collection created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
logsRouter.post("/insertLogs", async (req, res) => {
  try {
    const result = await insertLogs(req.body);
    res.status(201).json({ msg: "created successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
logsRouter.get("/aggregate4", async (req, res) => {
  try {
    const result = await aggregate4()
    res.status(201).json({ msg: "aggregate successfully", result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});