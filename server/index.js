import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { BookRoutes, AuthorRoutes } from "./src/routes/index.js";

dotenv.config();

const app = express();

const allowedOrigins = [process.env.ORIGIN];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.use(express.json());

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
