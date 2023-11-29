import { useQuery, useMutation } from '@apollo/client';
import { ALL_TODO_DATA } from '../queries';
import { CREATE_TODO } from '../mutations';
import { useState } from 'react';
import {Link } from "react-router-dom";
const Todo = () =>{

    const {loading, data}  = useQuery(ALL_TODO_DATA);
    const [task,setTask] = useState('')
    const [desc,setDesc] = useState('')
    const [status,setStatus] = useState('TODO')
    const [createTodo, {loading:todoLoading,data:createTodoData,error:createTodoError}] = useMutation(CREATE_TODO
        , {
            refetchQueries: [
                ALL_TODO_DATA
            ],
          });
  if (loading) return (<div className="loader"/>);

  return (
    <div>
    <div>
    { data?.allTodoData?.map((e) => (
      e.status === 'TODO' ? <div key={e.id}>
        <Link to= "/edit" state={{stateId:e.id,stateTask:e.task,stateDesc:e.desc,stateStatus:e.status}} >{e.task}</Link>
      </div> : <div key={e.id}>
      <Link to= "/edit" state={{stateId:e.id,stateTask:e.task,stateDesc:e.desc,stateStatus:e.status}}><s>{e.task}</s></Link>
      </div>
    ))}
    </div>
    <form onSubmit={(e)=>{
      e.preventDefault();
      ((task!=='') 
      // & desc!=='') 
      ? createTodo({variables:{task:task, desc:desc,status:status}}):alert("data cannot be empty"))
        if(!createTodoError){
            setTask('')
            setDesc('')
            setStatus('TODO')
        }
    }}>
        <input id='task' type='text' placeholder='Task Name' value={task} onChange={(e)=>{setTask(e.target.value)}}></input>
        <input id='desc' type='text' placeholder='Description' value={desc} onChange={(e)=>{setDesc(e?.target?.value)}}></input>
        <select id='status' value={status} onChange={(e)=>{setStatus(e?.target?.value)}}>
            <option value="TODO">Todo</option>
            <option value="DONE">Done</option>
        </select>
        <button type="submit">Add Todo</button>
    </form>
    </div>
    
  );
}

export default Todo