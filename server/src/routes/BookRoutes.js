import express from "express";
import { BooksController } from "../controllers/index.js";

import {
  validateGetBooks,
  validateBookId,
  validateCreateBook,
  validateUpdateBook,
} from "../validators/index.js";
import handleValidationError from "../utils/handleValidationError.js";

const router = express.Router();

router.get(
  "/",
  validateGetBooks,
  handleValidationError,
  BooksController.getBooks
);
router.get(
  "/:id",
  validateBookId,
  handleValidationError,
  BooksController.getBookById
);
router.post(
  "/",
  validateCreateBook,
  handleValidationError,
  BooksController.createBook
);
router.put(
  "/:id",
  validateUpdateBook,
  handleValidationError,
  BooksController.updateBook
);
router.delete(
  "/:id",
  validateBookId,
  handleValidationError,
  BooksController.deleteBook
);

export default router;
