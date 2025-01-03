const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
import * as dotenv from "dotenv";
dotenv.config();

import { protect } from './middleware/defend';
import router from './router';
import { createNewUser, signin } from './handlers/user';

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', protect, router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", createNewUser);
app.post("/signin", signin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("Server is starting correctly");
});

export default app;