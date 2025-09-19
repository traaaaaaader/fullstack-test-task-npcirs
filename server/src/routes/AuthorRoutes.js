import express from "express";
import { AuthorsController } from "../controllers/index.js";

import {
  validateGetAuthors,
  validateAuthorId,
  validateCreateAuthor,
  validateUpdateAuthor,
} from "../validators/index.js";
import handleValidationError from "../utils/handleValidationError.js";

const router = express.Router();

router.get(
  "/",
  validateGetAuthors,
  handleValidationError,
  AuthorsController.getAuthors
);
router.get(
  "/:id",
  validateAuthorId,
  handleValidationError,
  AuthorsController.getAuthorById
);
router.post(
  "/",
  validateCreateAuthor,
  handleValidationError,
  AuthorsController.createAuthor
);
router.put(
  "/:id",
  validateUpdateAuthor,
  handleValidationError,
  AuthorsController.updateAuthor
);
router.delete(
  "/:id",
  validateAuthorId,
  handleValidationError,
  AuthorsController.deleteAuthor
);

export default router;
