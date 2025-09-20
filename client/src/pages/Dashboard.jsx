import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import {
  InfiniteRowModelModule,
  AllCommunityModule,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([
  InfiniteRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const Dashboard = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const [authorsCols, setAuthorsCols] = useState([
    { field: "id" },
    { field: "full_name", filter: true },
    { field: "rating" },
    { field: "birth_date" },
  ]);
  const [booksCols, setBooksCols] = useState([
    { field: "id" },
    { field: "title", filter: true },
    { field: "pages" },
    {
      field: "price",
      valueFormatter: (params) => {
        return params.value.toLocaleString() + " Р";
      },
    },
    { field: "published_date" },
    { field: "author_id" },
  ]);

  useEffect(() => {
    axiosInstance.get("api/authors").then((res) => {
      const normalizedAuthors = res.data.map((author) => ({
        ...author,
        rating: parseFloat(author.rating),
        birth_date: new Date(author.birth_date),
      }));
      setAuthors(normalizedAuthors);
    });
    axiosInstance.get("api/books").then((res) => {
      const normalizedBooks = res.data.map((book) => ({
        ...book,
        price: parseFloat(book.price),
        published_date: new Date(book.published_date),
      }));
      setBooks(normalizedBooks);
    });
  }, []);

  console.log(books);
  console.log(authors);

  return (
    <div className="flex-1 flex flex-col gap-4 p-6">
      <div className="flex-1">
        <AgGridReact
          rowData={authors}
          columnDefs={authorsCols}
          defaultColDef={{ flex: 1 }}
          pagination
        />
      </div>
      <div className="flex-1">
        <AgGridReact
          rowData={books}
          columnDefs={booksCols}
          defaultColDef={{ flex: 1 }}
          pagination
        />
      </div>
    </div>
  );
};

export default Dashboard;
