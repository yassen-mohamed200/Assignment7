import { Router } from "express";
//import service
const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.send("Login page");
});
export default authRouter;