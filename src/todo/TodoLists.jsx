import React, { useEffect, useState } from 'react'
import { todoApi } from '../config/API'
import { axiosInstance } from '../config/customAxios'
import { toast } from 'react-toastify'
export default function TodoLists({setDeleteId, getTodos, listTodos}) {
  
    const handleOnClick = (id)=>{
        toast.warning('Nhấn vào đây để xóa')
        setDeleteId(`${todoApi}/${id}`)
    }
    useEffect(()=>{
        getTodos()
    },[])
  return (
    <ul className='d-flex flex-column w-50 p-0 mt-3'>
        {listTodos.length === 0 ? <li className='bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4 d-flex flex-col my-2'>Không có todo</li> 
            : listTodos.map(({_id, todo})=>  <li key={_id} className='bg-white shadow-md rounded px-4 pt-4 pb-4 d-flex flex-column my-2'>
                <p>{todo}</p>
                <div>
                    <button className='btn btn-primary me-2'>Thay đổi</button>
                    <button onClick={()=>handleOnClick(_id)} className='btn btn-danger'>Xóa</button>
                </div>
            </li> )
        }
    </ul>
  )
}
