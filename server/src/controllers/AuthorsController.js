import { Author } from "../models/index.js";
import AppError from "../utils/AppError.js";

export const getAuthors = async (req, res) => {
  const { limit, offset, order } = req.query;
  try {
    const authors = await Author.getAll(
      Number(limit) || 20,
      Number(offset) || 0
    );
    res.json(authors);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message || "Ошибка при получении авторов" });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.getById(req.params.id);
    res.json(author);
  } catch (err) {
    console.error(err);
    if (err instanceof App) {
      return res.status(404).json({ error: err.message });
    }
    res
      .status(500)
      .json({ error: err.message || "Ошибка при получении автора" });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message || "Ошибка при создании автора" });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.update(req.params.id, req.body);
    res.json(updatedAuthor);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res
      .status(500)
      .json({ error: err.message || "Ошибка при обновлении автора" });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const result = await Author.delete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res
      .status(500)
      .json({ error: err.message || "Ошибка при удалении автора" });
  }
};
