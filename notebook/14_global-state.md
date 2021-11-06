## 1. Global state  

Tạo global state với mục đích để cho tất cả các Children components đều có thể sử dụng & tương tác được với state.  
-> Cần truyền cho Child Components state & dispatch.  

-> Sử dụng **Context** + **useReducer**.  


## 2. Ví dụ: Todo App

Cấu trúc thư mục:  
>- todo-global-state
>   - store
>       - Context.js  
>       - Provider.js  
>       - constants.js  
>       - actions.js  
>       - reducer.js  
>       - hooks.js  
>       - logger.js  
>       - index.js  
>   - App.js
>   - index.js (entry point)  

1. Định nghĩa các actions:  

```jsx
// store/constants.js
export const SET_TODO_INPUT = 'set_todo_input'
export const ADD_TODO = 'add_todo'
export const DELETE_TODO = 'delete_todo'
export const SAVE_TODO = 'save_todo'

// store/actions.js
import { SET_TODO_INPUT, ADD_TODO, DELETE_TODO, SAVE_TODO } from './constants'

export const setTodoInput = payload => ({
    type: SET_TODO_INPUT,
    payload
})

export const addTodo = () => ({
    type: ADD_TODO
})

export const deleteTodo = payload => ({
    type: DELETE_TODO,
    payload
})

export const saveTodo = payload => ({
    type: SAVE_TODO,
    payload
})
```  

2. Reducer giúp update global state  

```jsx
// store/reducer.js
import { SET_TODO_INPUT, ADD_TODO, DELETE_TODO, SAVE_TODO } from './constants'

const initState = {
    todos: JSON.parse(localStorage.getItem('jobs')) ?? [],
    todoInput: ''
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TODO:
            const todos = [...state.todos, state.todoInput]
            localStorage.setItem('jobs', JSON.stringify(todos))
            return {
                ...state,
                todos: todos
            }
        case DELETE_TODO:
            const _todos = [...state.todos]
            _todos.splice(action.payload, 1)
            localStorage.setItem('jobs', JSON.stringify(_todos))
            return {
                ...state,
                todos: _todos
            }
        case SAVE_TODO:
            if (state.todos[action.payload] === state.todoInput) {
                return state
            } else {
                const saveTodos = [...state.todos]
                saveTodos[action.payload] = state.todoInput
                localStorage.setItem('jobs', JSON.stringify(saveTodos))
                return {
                    ...state,
                    todos: saveTodos
                }
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer
```

3. logger in ra trạng thái của state & action  

```jsx
// store/logger.js
function logger(reducer) {
    return (prevState, action) => {
        console.group(action.type)
        console.log('Action: ', action)
        console.log('Prev state: ', prevState)

        const nextState = reducer(prevState, action)

        console.log('Next state: ', nextState)
        console.groupEnd()

        return nextState
    }
}

export default logger
```

4. Định nghĩa Context & Provider truyền dữ liệu  

```jsx
// store/Context.js
import { createContext } from 'react'

const Context = createContext()

export default Context

// store/Provider.js
import { useReducer } from 'react'
import Context from './Context'
import reducer, { initState } from './reducer'
import logger from './logger'

function Provider({ children }) {
    const [state, dispatch] = useReducer(logger(reducer), initState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider
```

5. Định nghĩa custom hooks  

```jsx
// store/hooks.js
import { useContext } from 'react'
import Context from './Context'

export const useStore = () => {
    const [state, dispatch] = useContext(Context)
    return [state, dispatch]
}
```

6. Export dữ liệu của store directory giúp dễ dàng import  

```jsx
// store/index.js
export { default as StoreProvider } from './Provider'
export { default as StoreContext } from './Context'
export * from './hooks'
export * as actions from './actions'
```

7. Component App  

```jsx
// App.js
import { useEffect, useRef, useState } from 'react'
import { useStore } from './store'
import { actions } from './store'

function App() {
    const [state, dispatch] = useStore()
    const { todos, todoInput } = state

    let [repairIndex, setRepairIndex] = useState()

    const inputRef = useRef()
    const todoList = useRef()
    const prevIndex = useRef()

    useEffect(() => {
        todoList.current = document.getElementById('todo')
    }, [])

    useEffect(() => {
        console.log(repairIndex, prevIndex.current);
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
        dispatch(actions.addTodo(todoInput))
        repairIndex !== undefined && removeIndex()
        removeInput()
    }

    const handleDelete = (e, index) => {
        e.stopPropagation()
        dispatch(actions.deleteTodo(index))
        repairIndex !== undefined && removeIndex()
        removeInput()
    }

    const handleClick = (todo, index) => {
        dispatch(actions.setTodoInput(todo))
        inputRef.current.focus()
        prevIndex.current = repairIndex
        setRepairIndex(index)
    }

    const handleRepair = () => {
        dispatch(actions.saveTodo(repairIndex))
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
                        <span onClick={(e) => handleDelete(e, index)}>&times;</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
```

8. Entry point  

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './store'

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
```


## 3. Redux vs React-context  

- Ưu điểm của Redux:  
    - Debug capabilities: Có thể dễ dàng triển khai về Debug hơn, vì Redux có thư viện Redux-debug giúp debug theo kiểu inspect ra từng element, dễ quan sát state thay đổi trong ứng dụng.  
    - Middleware: Cung cấp sẵn 1 kiến trúc để sẵn sàng apply middleware.  
    - Addons and extensibility: Có những addons & dễ dàng mở rộng hơn.  
    - Cross-platform and cross-framework usage: Đa nền tảng có thể sử dụng với tất cả các project JS, không bị phụ thuộc vào react.  
    - Dễ dàng cấu hình tùy thuộc vào cách cấu hình của dự án, performance hơn hẳn việc sử dụng Context.  

- Yếu điểm của Context: Vì khi thêm Provider ở cấp cao nhất, wrap toàn bộ ứng dụng nên khi dispatch thay đổi state sẽ re-render tất cả các components, performance không được tối ưu -> sử dụng cho project vừa & nhỏ, các trường hợp set lại global state không nhiều.  

Redux đã được thiết kế chỉ re-render các component có state thay đổi nên performance tốt hơn -> thích hợp sử dụng trong trường hợp global state được update lại nhiều lần.  