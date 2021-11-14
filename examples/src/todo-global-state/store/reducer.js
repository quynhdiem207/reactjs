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
            const todos = [...state.todos, action.payload]
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
            const saveTodos = [...state.todos]
            saveTodos[action.payload[0]] = action.payload[1]
            localStorage.setItem('jobs', JSON.stringify(saveTodos))
            return {
                ...state,
                todos: saveTodos
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState }
export default reducer