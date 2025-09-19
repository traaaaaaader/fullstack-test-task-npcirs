import db from "../config/db.js";
import AppError from "../utils/AppError.js";

export const Book = {
  async getAll(limit = 20, offset = 0) {
    try {
      return await db.any(
        "SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
      );
    } catch (error) {
      throw new AppError(
        `Ошибка при получении списка книг: ${error.message}`,
        500
      );
    }
  },

  async getById(id) {
    try {
      const book = await db.oneOrNone("SELECT * FROM books WHERE id=$1", [id]);
      if (!book) throw new AppError(`Книга с id=${id} не найдена`, 404);
      return book;
    } catch (error) {
      throw new AppError(`Ошибка при получении книги: ${error.message}`, 500);
    }
  },

  async create({ title, pages, price, published_date, author_id }) {
    try {
      const author = await db.oneOrNone("SELECT id FROM authors WHERE id=$1", [
        author_id,
      ]);
      if (!author) throw new AppError(`Автор с id=${author_id} не найден`, 404);
      return await db.one(
        "INSERT INTO books(title, pages, price, published_date, author_id) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [title, pages, price, published_date, author_id]
      );
    } catch (error) {
      throw new AppError(`Ошибка при создании книги: ${error.message}`, 500);
    }
  },

  async update(id, { title, pages, price, published_date, author_id }) {
    try {
      const existingBook = await db.oneOrNone(
        "SELECT id FROM books WHERE id=$1",
        [id]
      );
      if (!existingBook) throw new AppError(`Книга с id=${id} не найдена`, 404);

      if (author_id) {
        const author = await db.oneOrNone(
          "SELECT id FROM authors WHERE id=$1",
          [author_id]
        );
        if (!author)
          throw new AppError(`Автор с id=${author_id} не найден`, 404);
      }

      return await db.one(
        "UPDATE books SET title=$1, pages=$2, price=$3, published_date=$4, author_id=$5 WHERE id=$6 RETURNING *",
        [title, pages, price, published_date, author_id, id]
      );
    } catch (error) {
      throw new AppError(`Ошибка при обновлении книги: ${error.message}`, 500);
    }
  },

  async delete(id) {
    try {
      const result = await db.result("DELETE FROM books WHERE id=$1", [id]);
      if (result.rowCount === 0)
        throw new AppError(`Книга с id=${id} не найдена`, 404);
      return { message: `Книга с id=${id} удалена` };
    } catch (error) {
      throw new AppError(`Ошибка при удалении книги: ${error.message}`, 500);
    }
  },
};
