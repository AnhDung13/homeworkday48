import React, { useState } from "react";
import { toast } from "react-toastify";
export default function TodoForm({ handleAddTodo, setTodo, todo, search }) {
  const [isSearching, setIsSearching] = useState(false);
  // switch to search
  const switchMode = () => {
    setIsSearching(true);
    toast.success("Đã chuyển sang chế độ tìm kiếm");
  };

  return (
    <form className="w-50" onSubmit={(e) => handleAddTodo(e, setIsSearching)}>
      <div className="d-flex border-bottom border-success p-2 align-items-center justify-content-between">
        <input
          type="text"
          value={todo}
          // onChange={(e) => setTodo(e.target.value)}
          onInput={
            isSearching
              ? (e) => {
                  search(e.target.value);
                  setTodo(e.target.value);
                }
              : (e) => setTodo(e.target.value)
          }
          placeholder={isSearching ? "Tìm kiếm todo" : "Thêm một việc làm mới"}
          className="bg-transparent border border-0 text-whites me-3 w-50"
          style={{ color: "white" }}
        />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success fw-bold px-3 py-2">
            Thêm mới
          </button>
          <button
            type="button"
            onClick={switchMode}
            className="btn btn-warning fw-bold px-3 py-2"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
}
