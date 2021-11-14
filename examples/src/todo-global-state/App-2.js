import { useEffect, useRef, useState } from 'react'
import { useStore } from './store'
import { actions } from './store'

function App() {
    const [state, dispatch] = useStore()
    const { todos, todoInput } = state

    let [repairIndex, setRepairIndex] = useState()

    const inputRef = useRef()
    const todoList = useRef()

    useEffect(() => {
        todoList.current = document.getElementById('todo')
    }, [])

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
        repairIndex !== undefined && setRepairIndex(undefined)
        removeInput()
    }

    const handleDelete = (e, index) => {
        e.stopPropagation()
        dispatch(actions.deleteTodo(index))
        repairIndex !== undefined && setRepairIndex(undefined)
    }

    const placeCaretAtEnd = (el) => {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    const handleRepair = () => {
        if (repairIndex === undefined) {
            return alert('Please choose a job to repair...')
        }
        const todo = todoList.current.querySelector(`#todo-${repairIndex}`)
        const trimInput = todo.firstElementChild.innerText.trim()
        if (trimInput === '') {
            todo.firstElementChild.innerText = todos[repairIndex]
            return alert('Please enter a job to repair...')
        }
        if (state.todos[repairIndex] !== trimInput) {
            dispatch(actions.saveTodo([repairIndex, trimInput]))
        }
        setRepairIndex(undefined)
        removeInput()
    }

    const handleCancel = () => {
        if (repairIndex !== undefined) {
            const todo = todoList.current.querySelector(`#todo-${repairIndex}`)
            todo.firstElementChild.contentEditable = false
            setRepairIndex(undefined)
            removeInput()
        }
    }

    const handleClick = (e, index) => {
        setRepairIndex(index)
        if (e.target.tagName === 'SPAN') {
            e.target.contentEditable = true
            placeCaretAtEnd(e.target)
        } else {
            const first = e.target.firstElementChild
            first.contentEditable = true
            placeCaretAtEnd(first)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <input
                ref={inputRef}
                value={todoInput}
                placeholder="Enter todo..."
                onChange={e => dispatch(actions.setTodoInput(e.target.value))}
            />
            {repairIndex !== undefined ? (
                <span>
                    <button onClick={handleRepair}>Repair</button>
                    <button onClick={handleCancel}>Cancel</button>
                </span>
            ) : <button onClick={handleAdd}>Add</button>}
            <ul id="todo">
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        id={`todo-${index}`}
                        onClick={e => handleClick(e, index)}
                        onBlur={e => e.target.contentEditable = false}
                    >
                        <span style={{ minWidth: 160, display: 'inline-block' }}>{todo}</span>
                        <span onClick={e => handleDelete(e, index)}>&times;</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App