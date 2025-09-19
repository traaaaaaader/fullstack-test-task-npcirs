import { body, param, query } from "express-validator";

export const validateGetBooks = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit должен быть числом 1-100"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("offset должен быть >=0"),
];

export const validateBookId = [
  param("id").isInt().withMessage("id должен быть числом"),
];

export const validateCreateBook = [
  body("title").isString().notEmpty().withMessage("title обязателен"),
  body("pages").isInt({ min: 1 }).withMessage("pages должно быть числом > 0"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("price должно быть положительным числом"),
  body("published_date")
    .isISO8601()
    .toDate()
    .withMessage("published_date должна быть датой в формате YYYY-MM-DD"),
  body("author_id")
    .isInt({ min: 1 })
    .withMessage("author_id должен быть числом"),
];

export const validateUpdateBook = [
  param("id").isInt().withMessage("id должен быть числом"),
  body("title").isString().withMessage("title должен быть строкой"),
  body("pages").isInt({ min: 1 }).withMessage("pages должно быть числом >= 1"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("price должно быть числом >= 0"),
  body("published_date")
    .isISO8601()
    .toDate()
    .withMessage("published_date должна быть датой в формате YYYY-MM-DD"),
  body("author_id")
    .isInt({ min: 1 })
    .withMessage("author_id должен быть числом >= 1"),
];
