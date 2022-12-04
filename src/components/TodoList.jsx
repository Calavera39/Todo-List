import React, {useState} from 'react'
import styles from './TodoList.module.css'
import { updateDoc, doc} from 'firebase/firestore'
import {db, storage} from '../firebase'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import {AiOutlineUpload} from 'react-icons/ai'
import { useEffect } from 'react';




const TodoList = ({todo, toggleComplete, deleteTodo, url, setUrl}) => {
  
  
  

  
  const [file, setFile] = useState(null)
  const [editTodos, setIsEditTodos] = useState(todo.description)
  const [edit, setIsEdit] = useState(false)


  

  const uploadHandler = (e) => {
    setFile(e.target.files[0])
    
  }



  const UploadtoFireBase = (e) => {
    e.preventDefault(e)
    if(!file) {
      return
    }
    const uploadRef = ref(storage, `files/${file.name}`)
    uploadBytes(uploadRef, file).then((snapshot) => {
      alert('Uploaded!')
      getDownloadURL(snapshot.ref)
                    .then(url => {
                      addURL(e, todo, url)
                        setUrl(url);
                        
                    })
    })
    setFile(null)
    


    return url
  }

  const editTodo = async (e, todo) => {
    e.preventDefault(e)
    if(editTodos === '') {
      alert('Please enter something')
      return
    } else {
    await updateDoc(doc(db, 'todos', todo.id), {
      description: editTodos
    })
    setIsEdit(false)
    }}


    const addURL = async(e, todo, url) => {
      e.preventDefault(e)
      await updateDoc(doc(db, 'todos', todo.id), {
        url: url
      })
    }

  const dateTransformToTime = new Date(todo.date.seconds*1000).toLocaleTimeString()
  const dateTransformToDate = new Date(todo.date.seconds*1000).toLocaleDateString()
  const nowDate = `${dateTransformToDate} ${dateTransformToTime}`
  
  return (
    <li className={todo.completed ? styles.list_completed : styles.list}>
        <div className={styles.row}>
          <div className={styles.title_wrapper}>
            <input onChange={() => toggleComplete(todo)} checked={todo.completed ? 'checked' : ''} type='checkbox'/>
            <h2>{todo.title}</h2>
          </div>
            <div>
                <p onClick={() => toggleComplete(todo)} className={todo.completed ? styles.descr_completed : ''}>{todo.description}</p>
                 {edit && (<form onSubmit={(e) => editTodo(e, todo)}>
                  <input autoFocus className={styles.edit} value={editTodos} onChange={(e) => setIsEditTodos(e.target.value)}/>
                </form>)}
                <p>{nowDate}</p>
                <div className={styles.buttons}>
                  <button onClick={() => setIsEdit(prev => !prev)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <form onSubmit={UploadtoFireBase}>
                    <button type='submit'><AiOutlineUpload /></button>
                    <input onChange={uploadHandler} type='file'/> 
                  </form>
                  
                </div>
               {todo.url && <a target='_blank' rel='noreferrer' href={todo.url} className={styles.url}>URL to the uploaded file</a>}
            </div>
            
        </div>
    </li>
    
  )
}

export default TodoList