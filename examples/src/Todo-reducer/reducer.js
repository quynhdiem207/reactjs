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