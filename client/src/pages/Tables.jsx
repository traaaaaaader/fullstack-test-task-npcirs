import { useEffect, useState } from "react";
import axiosInstance from "../config/axios";

const Tables = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get("api/authors").then((res) => setAuthors(res.data));
    axiosInstance.get("api/books").then((res) => setBooks(res.data));
  }, []);

  return <div>Tables</div>;
};

export default Tables;
``;
