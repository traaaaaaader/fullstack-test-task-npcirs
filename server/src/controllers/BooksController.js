import { Book } from "../models/index.js";
import AppError from "../utils/AppError.js";

export const getBooks = async (req, res) => {
  const { limit, offset, orderBy, sortOrder } = req.query;
  try {
    const books = await Book.getAll(
      Number(limit) || 20,
      Number(offset) || 0,
      String(orderBy) || "id",
      String(sortOrder) || "ASС"
    );
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Ошибка при получении книг" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.getById(req.params.id);
    res.json(book);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ err: err.message || "Ошибка при получении книги" });
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Ошибка при создании книги" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.update(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res
      .status(500)
      .json({ error: err.message || "Ошибка при обновлении книги" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const result = await Book.delete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof AppError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Ошибка при удалении книги" });
  }
};
