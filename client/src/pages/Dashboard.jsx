import { useState, useMemo, useCallback } from "react";
import axiosInstance from "../config/axios";
import {
  AllCommunityModule,
  InfiniteRowModelModule,
  NumberFilterModule,
  ModuleRegistry,
  RowSelectionModule,
  ValidationModule,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([
  AllCommunityModule,
  InfiniteRowModelModule,
  NumberFilterModule,
  RowSelectionModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const Dashboard = () => {
  const authorsCols = useMemo(
    () => [
      { field: "id" },
      { field: "full_name" },
      { field: "rating" },
      { field: "birth_date" },
    ],
    []
  );

  const booksCols = useMemo(
    () => [
      { field: "id" },
      { field: "title" },
      { field: "pages" },
      {
        field: "price",
        valueFormatter: (params) => {
          if (params.value == null || isNaN(params.value)) return "—";
          return params.value.toLocaleString() + " ₽";
        },
      },
      { field: "published_date" },
      { field: "author_id" },
    ],
    []
  );

  const onAuthorsGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (gridParams) => {
        try {
          console.log("Authors request:", gridParams);

          const limit = gridParams.endRow - gridParams.startRow;
          const offset = gridParams.startRow;

          let sortBy = "id";
          let sortOrder = "ASC";
          if (gridParams.sortModel.length > 0) {
            sortBy = gridParams.sortModel[0].colId;
            sortOrder = gridParams.sortModel[0].sort.toUpperCase();
          }

          const res = await axiosInstance.get("/api/authors", {
            params: { limit, offset, sortBy, sortOrder },
          });

          const normalized = res.data.map((author) => ({
            ...author,
            rating: parseFloat(author.rating),
            birth_date: new Date(author.birth_date),
          }));

          gridParams.successCallback(normalized, res.data.totalCount);
        } catch (err) {
          console.error("Ошибка загрузки авторов", err);
          gridParams.failCallback();
        }
      },
    };

    params.api.setGridOption("datasource", dataSource);
  }, []);

  const onBooksGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (gridParams) => {
        try {
          console.log("Books request:", gridParams);

          const limit = gridParams.endRow - gridParams.startRow;
          const offset = gridParams.startRow;

          let sortBy = "id";
          let sortOrder = "ASC";
          if (gridParams.sortModel.length > 0) {
            sortBy = gridParams.sortModel[0].colId;
            sortOrder = gridParams.sortModel[0].sort.toUpperCase();
          }

          const res = await axiosInstance.get("/api/books", {
            params: { limit, offset, sortBy, sortOrder },
          });

          const normalized = res.data.map((book) => ({
            ...book,
            price: parseFloat(book.price),
            published_date: new Date(book.published_date),
          }));

          gridParams.successCallback(normalized, res.data.totalCount);
        } catch (err) {
          console.error("Ошибка загрузки книг", err);
          gridParams.failCallback();
        }
      },
    };

    params.api.setGridOption("datasource", dataSource);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4 p-6">
      <div className="flex-1">
        <AgGridReact
          columnDefs={authorsCols}
          defaultColDef={{ flex: 1 }}
          rowModelType="infinite"
          cacheBlockSize={20}
          onGridReady={onAuthorsGridReady}
        />
      </div>
      <div className="flex-1">
        <AgGridReact
          columnDefs={booksCols}
          defaultColDef={{ flex: 1 }}
          rowModelType="infinite"
          cacheBlockSize={20}
          onGridReady={onBooksGridReady}
        />
      </div>
    </div>
  );
};

export default Dashboard;
