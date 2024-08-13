import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import TodoForm from './TodoForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { apiKey, todoApi } from '../config/API'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { API_KEY, USER_EMAIL } from '../config/token'
import TodoLists from './TodoLists'
import { axiosInstance } from '../config/customAxios'
export default function Todo() {
  const [listTodos, setListTodos] = useState([])  
  const [deleteId, setDeleteId] = useState('');
  const getApiKey = async ()=>{
    const userEmail = prompt('nhập email', 'example@example.com')
    try{
        const rs = await axios.get(apiKey, {params: {email: userEmail}})
        console.log(rs);
        Cookies.set('apiKey',`${rs.data.data.apiKey}`,{ expires: 1 })
        Cookies.set('userEmail', `${userEmail}`,{expires: 1})
        toast.success(`Chào mừng bạn ${userEmail}`)
    }catch{
       toast.error('Email không tồn lại trong dữ liệu')
    }
   } 
   const getTodos = async () =>{
    try{
     const rs = await axiosInstance.get(todoApi)
     setListTodos(rs.data.data.listTodo)
    }catch{
    }
}  
  const handleDelete = async ()=>{
    const rs = await axiosInstance.delete(deleteId)
    console.log(rs);
    setDeleteId('')
    getTodos();
  }
  useEffect(()=>{
    if(Cookies.get(API_KEY)){
        toast.success(`Chào mừng quay trở lại ${Cookies.get(USER_EMAIL)?Cookies.get(USER_EMAIL).split('@')[0]:""}`)
    }else{
        getApiKey();
    }
  },[])
  return (
   <>
    <div className="container mt-3 p-3" style={{background: 'rgb(51 65 85)'}}> 
        <div className="d-flex flex-column align-items-center justify-content-center">    
        <h1 className='fs-5 fw-bold text-white text center'>Welcome to Todo App!</h1>
        <TodoForm getTodos={getTodos}/>
        <TodoLists setDeleteId={setDeleteId} getTodos={getTodos} listTodos={listTodos}/>
        </div>
    </div>
    <ToastContainer draggable={true} closeOnClick onClick={handleDelete}/>
   </>
  )
}
