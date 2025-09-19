import { body, param, query } from "express-validator";

export const validateGetAuthors = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit должен быть числом 1-100"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("offset должен быть >= 0"),
];

export const validateAuthorId = [
  param("id").isInt().withMessage("id должен быть числом"),
];

export const validateCreateAuthor = [
  body("full_name").isString().notEmpty().withMessage("full_name обязателен"),
  body("rating")
    .isFloat({ min: 0, max: 10 })
    .withMessage("rating должно быть числом от 0 до 10"),
  body("birth_date")
    .isISO8601()
    .toDate()
    .withMessage("birth_date должна быть датой в формате YYYY-MM-DD"),
];

export const validateUpdateAuthor = [
  param("id").isInt().withMessage("id должен быть числом"),
  body("full_name")
    .optional()
    .isString()
    .withMessage("full_name должен быть строкой"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("rating должно быть числом от 0 до 10"),
  body("birth_date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("birth_date должна быть датой в формате YYYY-MM-DD"),
];
