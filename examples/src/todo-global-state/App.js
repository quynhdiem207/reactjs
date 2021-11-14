import { useEffect, useRef, useState } from 'react'
import { useStore } from './store'
import { actions } from './store'

function App() {
    const [state, dispatch] = useStore()
    const { todos, todoInput } = state

    let [repairIndex, setRepairIndex] = useState()
    const prevIndex = useRef()

    const inputRef = useRef()
    const todoList = useRef()

    useEffect(() => {
        todoList.current = document.getElementById('todo')
    }, [])

    useEffect(() => {
        if (repairIndex !== undefined) {
            const todo = todoList.current.querySelector(`#todo-${repairIndex}`)
            todo.style.color = '#f00'
        }
        if (prevIndex.current !== undefined) {
            const prevTodo = todoList.current.querySelector(`#todo-${prevIndex.current}`)
            prevTodo.style.color = '#000'
        }
    }, [repairIndex])

    const removeIndex = () => {
        prevIndex.current = repairIndex
        setRepairIndex(undefined)
    }

    const removeInput = () => {
        dispatch(actions.setTodoInput(''))
        inputRef.current.focus()
    }

    const handleAdd = () => {
        const trimInput = todoInput.trim()
        if (trimInput === '') {
            return alert('Please enter a job to add...')
        }
        dispatch(actions.addTodo(trimInput))
        repairIndex !== undefined && removeIndex()
        removeInput()
    }

    const handleDelete = (e, index) => {
        e.stopPropagation()
        dispatch(actions.deleteTodo(index))
        if (repairIndex !== undefined) {
            prevIndex.current = repairIndex === todos.length - 1 ?
                undefined : repairIndex
            setRepairIndex(undefined)
            removeInput()
        }
    }

    const handleClick = (todo, index) => {
        dispatch(actions.setTodoInput(todo))
        inputRef.current.focus()
        prevIndex.current = repairIndex
        setRepairIndex(index)
    }

    const handleRepair = () => {
        if (repairIndex === undefined) {
            return alert('Please choose a job to repair...')
        }
        const trimInput = todoInput.trim()
        if (trimInput === '') {
            return alert('Please enter a job to repair...')
        }
        if (state.todos[repairIndex] !== trimInput) {
            dispatch(actions.saveTodo([repairIndex, trimInput]))
        }
        removeIndex()
        removeInput()
    }

    return (
        <div style={{ padding: 20 }}>
            <input
                ref={inputRef}
                value={todoInput}
                placeholder="Enter todo..."
                onChange={e => dispatch(actions.setTodoInput(e.target.value))}
            />
            <button onClick={handleAdd}>Add</button>
            {repairIndex !== undefined && (<button onClick={handleRepair}>Repair</button>)}
            <ul id="todo">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        id={`todo-${index}`}
                        onClick={() => handleClick(todo, index)}
                    >
                        {todo}
                        <span onClick={e => handleDelete(e, index)}>&times;</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App