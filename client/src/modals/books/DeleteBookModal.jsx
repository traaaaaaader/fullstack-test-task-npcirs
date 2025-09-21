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
    <div className="fixed left-0 top-0 z-50 h-screen w-screen flex items-center justify-center bg-black/50">
      <div className="relative p-6 bg-gray-200 min-w-lg rounded-2xl shadow-2xl border-2 border-red-500 transition-all duration-300 overflow-auto">
        <CircleX
          onClick={() => setOpen(false)}
          className="cursor-pointer absolute right-2 top-2 bg-red-800/70 hover:bg-red-800 rounded-full text-white"
        />
        <h3 className="text-xl font-bold text-red-800 mb-4 text-center">
          Удалить книгу
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
            <label className="text-gray-700">ID Книги</label>
            <input
              {...register("id", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 py-1 px-2 rounded-lg "
              type="number"
              placeholder="1"
            />
            {errors.id?.message && (
              <p className="text-xs text-red-500">{errors.id?.message}</p>
            )}
          </div>
          <button
            disabled={loading}
            className={`cursor-pointer mt-2 p-2 rounded-2xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-800/70 hover:bg-red-800"
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
