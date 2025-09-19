import db from "../config/db.js";

export const Author = {
  async getAll(limit = 20, offset = 0) {
    try {
      return await db.any(
        "SELECT * FROM authors ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
      );
    } catch (error) {
      throw new AppError(
        `Ошибка полученния списка авторов: ${error.message}`,
        500
      );
    }
  },

  async getById(id) {
    try {
      const author = await db.oneOrNone("SELECT * FROM authors WHERE id=$1", [
        id,
      ]);
      if (!author) throw new AppError(`Автор с id=${id} не найден`, 404);
      return author;
    } catch (error) {
      throw new AppError(`Ошибка при получении автора: ${error.message}`, 500);
    }
  },

  async create({ full_name, rating, birth_date }) {
    try {
      return await db.one(
        "INSERT INTO authors(full_name, rating, birth_date) VALUES($1,$2,$2) RETURNING *",
        [full_name, rating, birth_date]
      );
    } catch (error) {
      throw new AppError(`Ошибка при создании автора: ${error.message}`, 500);
    }
  },

  async update(id, { full_name, rating, birth_date }) {
    try {
      const existingAuthor = await db.oneOrNone(
        "SELECT id FROM authors WHERE id=$1",
        [id]
      );
      if (!existingAuthor)
        throw new AppError(`Автор с id=${id} не найден`, 404);
      return await db.one(
        "UPDATE authors SET full_name=$1, rating=$2, birth_date=$3 WHERE id=$4 RETURNING *",
        [full_name, rating, birth_date, id]
      );
    } catch (error) {
      throw new AppError(`Ошибка при обновлении автора: ${error.message}`, 500);
    }
  },

  async delete(id) {
    try {
      const result = await db.result("DELETE FROM authors WHERE id=$1", [id]);
      if (result.rowCount === 0)
        throw new AppError(`Автор с id=${id} не найден`, 404);
      return { message: `Автор с id=${id} удален` };
    } catch (error) {
      throw new AppError(`Ошибка при удалении автора: ${error.message}`, 500);
    }
  },
};
