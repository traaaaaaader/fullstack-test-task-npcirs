import { useState, useMemo, useCallback } from "react";
import {
  AllCommunityModule,
  InfiniteRowModelModule,
  NumberFilterModule,
  ValidationModule,
  ColumnHoverModule,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  CreateBookModal,
  EditBookModal,
  DeleteBookModal,
} from "../modals/books";
import axiosInstance from "../config/axios";

ModuleRegistry.registerModules([
  AllCommunityModule,
  InfiniteRowModelModule,
  NumberFilterModule,
  ValidationModule,
  ColumnHoverModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const date_options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const Tables = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const formatDate = (params) => {
    if (params.value == null) return "";
    return params.value.toLocaleDateString("ru-RU", date_options);
  };

  const authorsCols = useMemo(
    () => [
      { field: "id", cellDataType: "number" },
      { field: "full_name", cellDataType: "text" },
      { field: "rating", cellDataType: "number" },
      {
        field: "birth_date",
        cellDataType: "date",
        valueFormatter: formatDate,
      },
    ],
    []
  );

  const booksCols = useMemo(
    () => [
      { field: "id", cellDataType: "number" },
      { field: "title", cellDataType: "text" },
      { field: "pages", cellDataType: "number" },
      {
        field: "price",
        cellDataType: "number",
        valueFormatter: (params) => {
          if (params.value == null || isNaN(params.value)) return "—";
          return params.value.toLocaleString() + " ₽";
        },
      },
      {
        field: "published_date",
        cellDataType: "date",
        valueFormatter: formatDate,
      },
      { field: "author_id", cellDataType: "number" },
    ],
    []
  );

  const onAuthorsGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (gridParams) => {
        try {
          const limit = gridParams.endRow - gridParams.startRow;
          const offset = gridParams.startRow;

          let orderBy = "id";
          let sortOrder = "ASC";
          if (gridParams.sortModel.length > 0) {
            orderBy = gridParams.sortModel[0].colId;
            sortOrder = gridParams.sortModel[0].sort.toUpperCase();
          }

          const res = await axiosInstance.get("/api/authors", {
            params: { limit, offset, orderBy, sortOrder },
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
          const limit = gridParams.endRow - gridParams.startRow;
          const offset = gridParams.startRow;

          let orderBy = "id";
          let sortOrder = "ASC";
          if (gridParams.sortModel.length > 0) {
            orderBy = gridParams.sortModel[0].colId;
            sortOrder = gridParams.sortModel[0].sort.toUpperCase();
          }

          const res = await axiosInstance.get("/api/books", {
            params: { limit, offset, orderBy, sortOrder },
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

  const getRowId = useCallback(function (params) {
    return params.data.id;
  }, []);

  return (
    <>
      <CreateBookModal isOpen={createIsOpen} setOpen={setCreateIsOpen} />
      <EditBookModal isOpen={editIsOpen} setOpen={setEditIsOpen} />
      <DeleteBookModal isOpen={deleteIsOpen} setOpen={setDeleteIsOpen} />

      <div className="flex-1 flex lg:flex-row flex-col gap-4 p-4">
        <div className="flex-1">
          <AgGridReact
            className="flex-1"
            columnDefs={authorsCols}
            defaultColDef={{ flex: 1 }}
            rowModelType="infinite"
            cacheBlockSize={20}
            infiniteInitialRowCount={1}
            maxBlocksInCache={2}
            onGridReady={onAuthorsGridReady}
            getRowId={getRowId}
            columnHoverHighlight={true}
          />
        </div>
        <div className="flex-1">
          <div className="flex h-full flex-col">
            <div className="flex justify-end p-2 gap-2">
              <button
                className="cursor-pointer bg-green-700/90 hover:bg-green-700 py-1 px-2 rounded-lg text-white"
                onClick={() => setCreateIsOpen(true)}
              >
                Добавить запись
              </button>
              <button
                className="cursor-pointer bg-blue-600/90 hover:bg-blue-600 py-1 px-2 rounded-lg text-white"
                onClick={() => setEditIsOpen(true)}
              >
                Изменить
              </button>
              <button
                className="cursor-pointer bg-red-800/70 hover:bg-red-800 py-1 px-2 rounded-lg text-white"
                onClick={() => setDeleteIsOpen(true)}
              >
                Удалить
              </button>
            </div>
            <AgGridReact
              columnDefs={booksCols}
              defaultColDef={{ flex: 1 }}
              rowModelType="infinite"
              cacheBlockSize={20}
              infiniteInitialRowCount={1}
              maxBlocksInCache={2}
              onGridReady={onBooksGridReady}
              getRowId={getRowId}
              columnHoverHighlight={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tables;
