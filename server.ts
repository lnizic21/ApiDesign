const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const cors = require("cors");
import * as dotenv from "dotenv";
dotenv.config();

import { protect } from './middleware/defend';
import {router, adminRouter} from './router';
import { createNewUser, signin } from './handlers/user';
import { protectAdmin } from "./middleware/defendAdmin";
import { body, oneOf, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware";
import {rateLimit} from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use(cors({
  origin: true,
  credentials: true
}));
app.options('*', cors({
  origin: true,
  credentials: true
}));
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', protect, router);
app.use('/admin', protectAdmin, adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/user",
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  handleInputErrors,
  createNewUser);

app.post("/signin", 
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  handleInputErrors,
  signin);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("Server is starting correctly");
});

export default app;