import React from 'react'
import styles from './InputField.module.css'


const InputField = ({createNewTodo, input, setInput}) => {



  return (
    <form onSubmit={(e)=> createNewTodo(e)}>
         <input onChange={(e) => setInput(e.target.value)} value={input}  placeholder='write your task'  className={styles.input}/>
        <button className={styles.mainbutton}>OK</button>
    </form>
  )
}

export default InputField