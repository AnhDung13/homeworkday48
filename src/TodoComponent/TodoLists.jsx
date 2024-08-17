import React, { useState } from "react";
export default function TodoLists({ listTodos, handleDelete, handleUpdate }) {
  const [isEditingTodos, setEditingTodos] = useState([]);
  const handleChange = (value, id) => {
    setEditingTodos(
      isEditingTodos.map((todo) =>
        todo.id === id ? { ...todo, name: value } : todo
      )
    );
  };
  // set isCompleted = true or fales
  const handleCheckEvent = (value, id) => {
    setEditingTodos(
      isEditingTodos.map((todo) =>
        todo.id === id ? { ...todo, status: value } : todo
      )
    );
  };

  return (
    <ul className="d-flex flex-column w-50 p-0 mt-3">
      {listTodos.length === 0 ? (
        <li className="bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4 d-flex flex-col my-2">
          Không có todo
        </li>
      ) : (
        listTodos.map(({ _id, todo, isCompleted }) => {
          const editingTodo = isEditingTodos.find((todo) => todo.id === _id);
          return editingTodo ? (
            <li
              key={_id}
              className="bg-white shadow-md rounded px-4 pt-4 pb-4 d-flex flex-column my-2"
            >
              <input
                type="text"
                className={
                  editingTodo.status
                    ? "border p-2 mb-3 text-decoration-line-through"
                    : "border p-2 mb-3"
                }
                value={editingTodo.name}
                onChange={(e) => handleChange(e.target.value, _id)}
              />
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    id={_id}
                    checked={editingTodo.status}
                    className="form-check-input m-0"
                    onChange={(e) => handleCheckEvent(e.target.checked, _id)}
                  />
                  <label htmlFor={_id}>
                    {editingTodo.status ? "Completed" : "Not Completed"}
                  </label>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-warning"
                    // cancel update
                    onClick={() =>
                      setEditingTodos(
                        isEditingTodos.filter((todo) => todo.id !== _id)
                      )
                    }
                  >
                    Thoát
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleUpdate(isEditingTodos, _id, setEditingTodos)
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(_id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ) : (
            <li
              key={_id}
              className="bg-white shadow-md rounded px-4 pt-4 pb-4 d-flex flex-column my-2"
            >
              <input
                type="text"
                className={
                  isCompleted
                    ? "border p-2 mb-3 text-decoration-line-through"
                    : "border p-2 mb-3"
                }
                value={todo}
                readOnly
              />
              <div>
                <button
                  className="btn btn-primary me-2"
                  onClick={() =>
                    setEditingTodos([
                      ...isEditingTodos,
                      { id: _id, name: todo, status: isCompleted },
                    ])
                  }
                >
                  Sửa
                </button>
                <button
                  onClick={() => {
                    handleDelete(_id);
                  }}
                  className="btn btn-danger"
                >
                  Xóa
                </button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
}
