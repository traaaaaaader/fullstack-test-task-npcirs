import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import axiosInstance from "../../config/axios";

const bookSchema = z.object({
  title: z
    .string()
    .max(100, { error: "Длина заголовка не должна превышать 100 символов" })
    .min(5, { error: "Длина заголовка не должна быть короче 5 символов" }),
  pages: z
    .int({ error: "Количество страниц должно быть числом" })
    .positive({ error: "Количество страниц должно быть положительным числом" }),
  price: z
    .number({
      error: "Стоимость должна быть положительным числом",
    })
    .positive({ error: "Стоимость должна быть положительным числом" }),
  published_date: z.iso.date({ error: "Дата выпуска должна быть датой" }),
  author_id: z
    .number({
      error: "ID автора должно быть числом",
    })
    .positive({
      error: "ID автора должно быть положительным числом",
    }),
});

const CreateBookModal = ({ isOpen, setOpen }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      await axiosInstance.post("/api/books", {
        ...values,
      });
      setOpen(false);
      navigate(0);
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.error || "Произошла ошибка при создании книги.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return false;
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen flex items-center justify-center bg-black/50">
      <div className="relative p-6 bg-gray-200 min-w-lg rounded-2xl shadow-2xl border-2 border-green-700 transition-all duration-300 overflow-auto">
        <CircleX
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute right-2 top-2 bg-red-800 rounded-full text-white"
        />
        <h3 className="text-xl font-bold text-green-700 mb-4 text-center">
          Добавить книгу
        </h3>
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((d) => onSubmit(d))}
        >
          <div className="flex flex-col">
            <label className="text-gray-700">Заголовок</label>
            <input
              {...register("title")}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-green-700 focus:border-green-700 py-1 px-2 rounded-lg "
              type="text"
              placeholder="Заголовок"
            />
            {errors.title?.message && (
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Количество страниц</label>
            <input
              {...register("pages", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-green-700 focus:border-green-700 py-1 px-2 rounded-lg "
              type="number"
              placeholder="100"
              min="0"
              step="1"
            />
            {errors.pages?.message && (
              <p className="text-xs text-red-500">{errors.pages?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Стоимость</label>
            <input
              {...register("price", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-green-700 focus:border-green-700 py-1 px-2 rounded-lg "
              type="number"
              placeholder="100 Р"
              min="0"
            />
            {errors.price?.message && (
              <p className="text-xs text-red-500">{errors.price?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Дата выпуска</label>
            <input
              {...register("published_date")}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-green-700 focus:border-green-700 py-1 px-2 rounded-lg "
              type="date"
              placeholder="Дата выпуска"
            />
            {errors.published_date?.message && (
              <p className="text-xs text-red-500">
                {errors.published_date?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Автор ID</label>
            <input
              {...register("author_id", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-green-700 focus:border-green-700 py-1 px-2 rounded-lg "
              type="number"
              placeholder="1"
            />
            {errors.author_id?.message && (
              <p className="text-xs text-red-500">
                {errors.author_id?.message}
              </p>
            )}
          </div>
          <button
            disabled={loading}
            className={`cursor-pointer mt-2 p-2 rounded-2xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700/90 hover:bg-green-700"
            }`}
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookModal;
