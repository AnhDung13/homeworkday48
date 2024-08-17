import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TodoForm from "./TodoForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { API_KEY, USER_EMAIL } from "../config/token";
import TodoLists from "./TodoLists";
import axiosInstance from "../config/customAxios";
import { debounce } from "../utils/utils";
export default function Todo({ setLoading }) {
  //use state
  const [listTodos, setListTodos] = useState([]);
  const [todo, setTodo] = useState("");

  // get api key
  const getApiKey = async () => {
    const userEmail = prompt("nhập email", "example@example.com");

    const rs = await axiosInstance.get("/api-key", {
      params: { email: userEmail },
    });
    // use js-cookie library to set api cookie and use info
    Cookies.set("apiKey", `${rs.data.data.apiKey}`);
    Cookies.set("userEmail", `${userEmail}`);
    // call getTodo with api param for the first time render
    getTodos(rs.data.data.apiKey);
    toast.success(`Chào mừng bạn ${userEmail.split("@")[0]}`);
  };

  // add todo
  const handleAddTodo = async (e, callback) => {
    e.preventDefault();
    // check if value.length <= 1
    if (todo.trim().length <= 1) {
      toast.warning("Todo cần có trên 1 ký tự");
      return;
    }

    setLoading(true);
    // set isSeaching = false
    callback(false);
    const rs = await axiosInstance.post("/todos", {
      todo: todo,
    });
    await getTodos();
    toast.success(`${rs.data.message}`);
    setLoading(false);
    setTodo("");
  };

  // get todos
  const getTodos = async (apiKey, search) => {
    setLoading(true);
    // if pass Apikey call with this header
    if (apiKey) {
      const rs = await axiosInstance.get("/todos", {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      setListTodos(rs.data.data.listTodo);
    }
    // if not pass call this
    else {
      const rs = await axiosInstance.get("/todos", {
        params: {
          q: search,
        },
      });
      setListTodos(rs.data.data.listTodo);
    }
    setLoading(false);
  };

  //delete todo
  const handleDelete = (id) => {
    // onClick toast to delete
    toast.warning("Nhấn vào đây để xóa", {
      onClick: async () => {
        setLoading(true);
        await axiosInstance.delete(`/todos/${id}`);
        await getTodos();
        setLoading(false);
        toast.success("Xóa thành công");
      },
    });
  };

  //upadte todo
  const handleUpdate = async (arr, id, callback) => {
    const updatedTodo = arr.find((todo) => todo.id === id);
    await axiosInstance.patch(`/todos/${id}`, {
      todo: updatedTodo.name,
      isCompleted: updatedTodo.status,
    });
    await getTodos();
    // remove updated todo
    callback(arr.filter((todo) => todo.id !== id));
    toast.success("Cập nhập thành công!");
  };

  // searh todo
  const handleSearchTodo = debounce((e) => {
    getTodos(null, e.target.value);
  });

  // use effect
  useEffect(() => {
    if (Cookies.get(API_KEY)) {
      toast.success(
        `Chào mừng quay trở lại ${
          Cookies.get(USER_EMAIL) ? Cookies.get(USER_EMAIL).split("@")[0] : ""
        }`
      );
      getTodos();
    } else {
      getApiKey();
    }
  }, []);
  return (
    <>
      <div
        className="container mt-3 p-3"
        style={{ background: "rgb(51 65 85)" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="fs-5 fw-bold text-white text center">
            Welcome to Todo App!
          </h1>
          <TodoForm
            handleAddTodo={handleAddTodo}
            setTodo={setTodo}
            todo={todo}
            handleSearchTodo={handleSearchTodo}
          />
          <TodoLists
            listTodos={listTodos}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
      <ToastContainer draggable={true} closeOnClick />
    </>
  );
}
