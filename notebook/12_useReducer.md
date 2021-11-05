## 1. React.useReducer() hook  

1. **Sử dụng**: Cung cấp thêm 1 sự lựa chọn để sử dụng state cho function component.  
    - *useState()*: Trong hầu hết trường hợp có thể sử dụng để tạo trạng thái cho component, phù hợp với các component có state đơn giản (primitive data type or complex data type with simple object & array) hoặc số lượng state trong component ít.  
    - *useReducer()*: phù hợp với các component có state phức tạp (object & array lồng nhiều tầng, nhiều cấp) hoặc có rất nhiều state hay các state phụ thuộc nhau.  
2. **Đầu vào**: useReducer() nhận 3 đối số: reducer, initState & init.  
    ```jsx
    useReducer(reducer, initState, init)
    ```
    - *reducer*: function sử dụng để set lại state,  
        - reducer() nhận 2 đối số: state & action.  
            - state: giá trị state hiện tại.  
            - action: hành động được kích hoạt.  
        - return giá trị state mới.  
        ```jsx
        (state, action) => { 
            switch(action) {
                case value: return ...
                ...
                default: throw new Error('Invalid action')
            }
        }
        ```  
    - *initState*: giá trị khởi tạo cho state.  
    - *init*: function giúp set initState.  
        - init() nhận 1 đối số: initValue.  
            - initValue là giá trị được sử dụng để return initState.  
        - return value sẽ là initState.  
        ```jsx
        (initValue) => { return ... }
        ```
3. **Đầu ra**: useReducer() return array gồm 2 phần tử: state & dispatch.  
    ```jsx
    const [state, dispatch] = useReducer(reducer, initState, init)
    ```  
    - *dispatch*: function sử dụng để kích hoạt một action.  
        - dispatch() nhận 1 đối số là action,  
            - action có thể chỉ là action_name, hay mang theo cả payload để update state.  
        ```jsx
        dispatch(action)
        ```
4. Nguyên lý hoạt động của useReducer():  
    - Lần đầu tiên khi component mounted, nó nhận các đối số, đem initState gán cho state, nhưng sẽ không gọi reducer.  
    - Khi dispatch được gọi, một action sẽ được kích hoạt, useReducer sẽ gọi reducer truyền vào state hiện tại & action được kích hoạt để update state.  
    - Sau khi update state component sẽ được re-render.  

**Note**: Component phức tạp có thể chia nhỏ, bóc tách logic ra thành nhiều file js như:  
>- constants.js (action_names)  
>- actions.js (action functions)  
>- reducer.js (initial + reducer)  


## 2. Ví dụ

**Bài toán**: Tăng & giảm số.  

- **useState()**:  
    1. Init state: 0  
    2. Actions: Up (state + 1) / Down (state - 1)  

    ```jsx
    import { useState, useRef } from 'react'

    function App() {
        const [count, setCount] = useState(0)

        return (
            <div className="App" style={{ padding: '0 20px' }}>
                <h1>{count}</h1>
                <button onClick={() => setCount(count - 1)}>Down</button>
                <button onClick={() => setCount(count + 1)}>Up</button>
            </div>
        )
    }

    export default App;
    ```
- **useReducer()**:  
    1. Init state: 0  
    2. Actions: Up (state + 1) / Down (state - 1)  
    3. Reducer  
    4. Dispatch  

    ```jsx
    import { useReducer } from 'react'

    // Init state
    const initState = 0

    // Actions
    const UP_ACTION = 'up'
    const DOWN_ACTION = 'down'

    // Reducer
    const reducer = (state, action) => {
        switch (action) {
            case UP_ACTION:
                return state + 1
            case DOWN_ACTION:
                return state - 1
            default:
                throw new Error('Invalid action')
        }
    }

    // Dispatch
    function App() {
        const [count, dispatch] = useReducer(reducer, initState)

        return (
            <div className="App" style={{ padding: '0 20px' }}>
                <h1>{count}</h1>
                <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
                <button onClick={() => dispatch(UP_ACTION)}>Up</button>
            </div>
        )
    }

    export default App;
    ```  

**Bài toán**: Todo app with useReducer(), Khi điền tên công việc & bấm "Add", tên công việc sẽ được hiển thị, khi bấm x công việc sẽ bị xóa.  

Cấu trúc thư mục:  
>- Todo
>   - logger.js
>   - constants.js
>   - actions.js
>   - reducer.js
>   - index.js
>- App.js

**Note**: logger.js wrap lại reducer.js giúp logger state nhưng vẫn return result như cũ.  

```jsx
// Todo/logger.js
function logger(reducer) {
    return (prevState, action) => {
        console.group(action.type)
        console.log('Action: ', action)
        console.log('Prev state: ', prevState)
        const newState = reducer(prevState, action)
        console.log('Next state: ', newState)
        console.groupEnd()

        return newState
    }
}

export default logger

// Todo/constants.js
export const SET_JOB = 'set_job'
export const ADD_JOB = 'add_job'
export const DELETE_JOB = 'delete_job'

// Todo/actions.js
import { SET_JOB, ADD_JOB, DELETE_JOB } from './constants'

export const setJob = payload => ({ type: SET_JOB, payload })
export const addJob = payload => ({ type: ADD_JOB, payload })
export const deleteJob = payload => ({ type: DELETE_JOB, payload })

// Todo/reducer.js
import { SET_JOB, ADD_JOB, DELETE_JOB } from './constants'

export const initState = {
    job: '',
    jobs: JSON.parse(localStorage.getItem('jobs')) ?? []
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_JOB:
            return {
                ...state,
                job: action.payload
            }
        case ADD_JOB:
            const _newJobs = [...state.jobs, action.payload]
            localStorage.setItem('jobs', JSON.stringify(_newJobs))
            return {
                ...state,
                jobs: _newJobs
            }
        case DELETE_JOB:
            const newJobs = [...state.jobs]
            newJobs.splice(action.payload, 1)
            localStorage.setItem('jobs', JSON.stringify(newJobs))
            return {
                ...state,
                jobs: newJobs
            }
        default:
            throw new Error('Invalid action')
    }
}

export default reducer

// Todo/index.js
import { useReducer, useRef } from 'react'
import reducer, { initState } from './reducer'
import { setJob, addJob, deleteJob } from './actions'
import logger from './logger'

function App() {
    const [state, dispatch] = useReducer(logger(reducer), initState)
    const { job, jobs } = state
    const inputRef = useRef()

    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))
        inputRef.current.focus()
    }

    return (
        <div className="App" style={{ padding: '0 20px' }}>
            <h1>Todo</h1>
            <input
                ref={inputRef}
                value={job}
                onChange={(e) => { dispatch(setJob(e.target.value)) }}
                placeholder="Enter todo..."
            />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span onClick={() => dispatch(deleteJob(index))}>
                            &times;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App

// App.js
import TodoApp from './Todo'

function App() {
    return <TodoApp />
}

export default App;
```