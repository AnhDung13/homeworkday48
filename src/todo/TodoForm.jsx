import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../config/customAxios';
import { todoApi } from '../config/API';
export default function TodoForm({ getTodos}) {
    const [todo, setTodo] = useState('')
    const handleAddTodo = async (e)=>{
      e.preventDefault();
      try{
          const rs = await axiosInstance.post(todoApi,{
              todo: todo
          })
          toast.success(`${rs.data.message}`)    
          getTodos();
      }catch{
          toast.error('Đã xảy ra lỗi')
      }
      setTodo('')
    }
    const handleChange = (e)=>{
      setTodo(e.target.value)
    }
  return (
    <form className='w-50' onSubmit={handleAddTodo}>
        <div className="d-flex border-bottom border-success p-2 align-items-center justify-content-center">
            <input type="text" value={todo} onChange={handleChange} placeholder='Thêm một việc làm mới' className='bg-transparent border border-0 text-whites me-3 w-50'/>
            <button type='submit' className='btn btn-success fw-bold px-3 py-2'>Thêm mới</button>
        </div>
    </form>
  )
}
