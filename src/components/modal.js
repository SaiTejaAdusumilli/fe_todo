import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { DELETE_TODO, UPDATE_TODO } from '../mutations';
import { useNavigate } from "react-router-dom";
import { ALL_TODO_DATA } from '../queries';
function Modal(){
    const location = useLocation()
    const { stateId,stateTask,stateDesc,stateStatus } = location.state
    const [task,setTask] = useState(stateTask)
    const [desc,setDesc] = useState(stateDesc)
    const [status,setStatus] = useState(stateStatus)
    const navigate = useNavigate();
    const [updateTodo, {loading:todoLoading,data:updateTodoData,error:updateTodoError}] = useMutation(UPDATE_TODO
        , {
        refetchQueries: [
            ALL_TODO_DATA
        ],
      });
      const [deleteTodo, {loading:deleteTodoLoading,data:deleteTodoData,error:deleteTodoError}] = useMutation(DELETE_TODO
        , {
        refetchQueries: [
            ALL_TODO_DATA
        ],
      });
    return(
    <div>
        <Link to= "/" >Back</Link>
        <button onClick={(e)=>{
                e.preventDefault();
                deleteTodo({variables:{id:parseInt(stateId)}})
            if(!updateTodoError){
              navigate("/");
              }
    }}> Delete</button>
        <form 
        onSubmit={(e)=>{
      e.preventDefault();
      ((task!=='') 
      // & desc!=='') 
      ? updateTodo({variables:{id:parseInt(stateId),task:task, desc:desc,status:status}}):alert("data cannot be empty"))
        if(!updateTodoError){
            navigate("/");
        }
    }}
    >
        <input id='task' type='text' placeholder='Task Name' value={task} 
        onChange={(e)=>{setTask(e.target.value)}}
        ></input>
        <input id='desc' type='text' placeholder='Description' value={desc} 
        onChange={(e)=>{setDesc(e?.target?.value)}}
        ></input>
        <select id='status' value={status}
         onChange={(e)=>{setStatus(e?.target?.value)}}
         >
            <option value="TODO">Todo</option>
            <option value="DONE">Done</option>
        </select>
        <button type="submit">Update Todo</button>
    </form>
    </div>
    )
}

export default Modal;