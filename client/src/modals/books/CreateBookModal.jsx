import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import axiosInstance from "../../config/axios";

const formSchema = [
  {
    label: "Заголовок",
    name: "title",
    type: "text",
    placeholder: "Заголовок",
  },
  {
    label: "Количество страниц",
    name: "pages",
    type: "number",
    placeholder: "100",
  },
  {
    label: "Стоимость",
    name: "price",
    type: "number",
    placeholder: "100",
  },
  {
    label: "Дата выпуска",
    name: "published_date",
    type: "date",
    placeholder: "Дата выпуска",
  },
  {
    label: "Автор ID",
    name: "author_id",
    type: "number",
    placeholder: "1",
  },
];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-auto">
        <CircleX
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition"
        />

        <h3 className="text-2xl font-bold text-blue-500 mb-4 text-center">
          Добавить книгу
        </h3>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          {formSchema.map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label className="text-gray-700">{field.label}</label>
              <input
                {...register(field.name, {
                  valueAsNumber: field.type === "number",
                })}
                type={field.type}
                placeholder={field.placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors[field.name]?.message && (
                <p className="text-xs text-red-500">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            disabled={loading}
            className={`cursor-pointer mt-4 py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
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
