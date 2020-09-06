import React, {createContext, useReducer} from 'react'
import { SET_DATA, SET_ERROR_MESSAGES } from './actions'

const initialState = {
  data: [],
  errorMessages: []
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case SET_DATA: return { ...state, data: action.payload }

      case SET_ERROR_MESSAGES: return { ...state, errorMessages: action.payload }

      default: return state
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }