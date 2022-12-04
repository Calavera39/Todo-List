import { useState, useEffect } from 'react';
import styles from './App.module.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import {db} from './firebase'
import {query, collection, onSnapshot, QuerySnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'



function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [url, setUrl] = useState('')



  const createNewTodo = async (e) => {
    e.preventDefault(e)
    if(input === '') {
      alert('Please enter something')
      return
    }
    await addDoc(collection(db, 'todos'), {
      description: input,
      completed: false,
      date: new Date(),
      title: `Task #${todos.length + 1}`,
    })
    setInput('')
  }


  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  


    useEffect(() => {
      const q = query(collection(db, 'todos'))
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let todosArr = []
        QuerySnapshot.forEach((doc) => {
          todosArr.push({...doc.data(), id: doc.id})
        })
        
        setTodos(todosArr)
        console.log(todosArr)
      }
      
      )

     return () => unsubscribe()

    }, [])


    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed
      })
    }


  return (
    <div className={styles.app}>
      <header>
        <h1 className={styles.title}>Todo List</h1>
      </header>
      <InputField input={input} setInput={setInput} createNewTodo={createNewTodo}/>
      <ul>
        
       {todos.map((todo, index) => (
        <TodoList url={url} setUrl={setUrl} deleteTodo={deleteTodo}  key={index} todo={todo} toggleComplete={toggleComplete}/>
       ))}
          
      </ul>
      <p className={styles.length}>You have {todos.length} todo</p>
    </div>
  );
}

export default App;
