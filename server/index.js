import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { BookRoutes, AuthorRoutes } from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/api/books", BookRoutes);
app.use("/api/authors", AuthorRoutes);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
