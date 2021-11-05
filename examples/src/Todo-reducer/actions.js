import { SET_JOB, ADD_JOB, DELETE_JOB } from './constants'

export const setJob = payload => ({ type: SET_JOB, payload })
export const addJob = payload => ({ type: ADD_JOB, payload })
export const deleteJob = payload => ({ type: DELETE_JOB, payload })