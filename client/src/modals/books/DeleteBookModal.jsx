import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import axiosInstance from "../../config/axios";

const bookSchema = z.object({
  id: z
    .number({
      error: "ID Книги должно быть числом",
    })
    .positive({
      error: "ID Книги должно быть положительным числом",
    }),
});

const DeleteBookModal = ({ isOpen, setOpen }) => {
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
      await axiosInstance.delete(`/api/books/${values.id}`);
      setOpen(false);
      navigate(0);
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.error || "Произошла ошибка при удалении книги.";
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
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <CircleX
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition"
        />
        <h3 className="text-xl font-bold text-red-500 mb-4 text-center">
          Удалить книгу
        </h3>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-gray-700">ID книги</label>
            <input
              {...register("id", { valueAsNumber: true })}
              type="number"
              placeholder="1"
              className="bg-gray-50 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            {errors.id?.message && (
              <p className="text-xs text-red-500">{errors.id?.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            className={`cursor-pointer mt-4 py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500/80 hover:bg-red-600"
            }`}
          >
            {loading ? "Удаление..." : "Удалить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteBookModal;
