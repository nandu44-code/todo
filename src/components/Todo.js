import React from 'react'
import './Todo.css'
import { useState } from 'react'
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";



function Todo() {
    const [Todo, setTodo] = useState('')
    const [Todos, setTodos] = useState([])
    const [editId, setEditId] =useState(0)

    const AddTodo = () => {
        if (Todo.replaceAll(' ', '') !== ''){

            setTodos([...Todos, { list : Todo, id : Date.now(), status : false }]);
            setTodo('');

        }

        if (editId){
            const editTodo =  Todos.find((Todo)=> Todo.id === editId)
            const updateTodo = Todos.map((singletodo)=> singletodo.id === editTodo.id
            ?(singletodo =   {id : singletodo.id, list : Todo})
            :(singletodo =   {id : singletodo.id, list : singletodo.list }))
            setTodos(updateTodo)
            setEditId(editTodo)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const onDelete = (id) =>{

        console.log('working fine')
        setTodos(Todos.filter((singletodo) => singletodo.id !== id))
    }

    const onComplete =(id) =>{
        
        let complete = Todos.map((list)=>{
            if(list.id === id){
                return({...list, status :!list.status })
            }
            return list
        }) 
        setTodos(complete)
    }

    const onEdit=(id) =>{
        const editTodo = Todos.find((singletodo)=> singletodo.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }

    return (
        <div >
            <div className='container'>
                <h1>
                    TODO APP
                </h1>
                <form className="form-group" onSubmit={handleSubmit}>
                    <input type='text' value={Todo} placeholder='what do you want to do ?' onChange={(event) => setTodo(event.target.value)} />
                    <button onClick={AddTodo}>{editId ? 'EDIT TODO':'+ ADD TODO'}</button>
                </form>
            </div>

            <div className='list'>
                <ul>
                    {
                        Todos.map((singletodo) => (
                            <li className='list-items' id={singletodo.status ? 'list-item':''}>{singletodo.list}
                                <span className='list-items-icons'>
                                    <MdOutlineFileDownloadDone className='list-items-icon' id='complete' title='complete' onClick={()=>onComplete(singletodo.id)}/>
                                    <GrEdit className='list-items-icon' id='edit' title='Edit' onClick={()=>onEdit(singletodo.id)}/>
                                    <RiDeleteBinLine className='list-items-icon' id='delete' title='Delete' onClick={()=>onDelete(singletodo.id)}/>

                                </span>
                            </li>
                        ))
                    }


                </ul>
            </div>
        </div>
    )
}

export default Todo