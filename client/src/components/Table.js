import React, { useContext, useEffect } from 'react'
import tableIcons from '../utils/tableIcons'
import tableColumns from '../utils/tableColumns'
import MaterialTable from 'material-table'
import { store } from '../store'
import { SET_DATA, SET_ERROR_MESSAGES } from '../store/actions'
import { usersEndpoint, headers } from '../config'

export const Table = () => {
  const { state: {data}, dispatch } = useContext(store)

  const handleError = (error) => {
    dispatch({ type: SET_ERROR_MESSAGES, payload: [error.message] })
  }

  const onRowUpdate = async (newUser) => {
    const { _id, ...userData } = newUser
    try {
      const response = await fetch(`${usersEndpoint}/${newUser._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(userData)
      })
      const responseJson = await response.json()
      if(responseJson.error) throw new Error(responseJson.error)

      const users = data.reduce((acc, user) => {
        if(user._id === newUser._id) return [ ...acc, newUser ]
        return [ ...acc, user ]
      }, [])
      dispatch({ type: SET_DATA, payload: users })
    } catch(error) {
      handleError(error)
    }
  }
  
  const onRowAdd = async (newUser) => {
    try {
      const response = await fetch(usersEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(newUser)
      })
      const responseJson = await response.json()
      if(responseJson.error) throw new Error(responseJson.error)

      dispatch({ type: SET_DATA, payload: [ ...data, { _id: responseJson, ...newUser }] })
    } catch(error) {
      handleError(error)
    }
  }

  const onRowDelete = async (oldUser) => {
    try {
      const response = await fetch(`${usersEndpoint}/${oldUser._id}`, { method: 'DELETE', headers })
      const responseJson = await response.json()
      if(responseJson.error) throw new Error('Something went wrong. Please try again!')

      const users = data.filter(u => u._id !== oldUser._id)
      dispatch({ type: SET_DATA, payload: users })
    } catch(error) {
      handleError(error)
    }
  }

  useEffect(() => {
    dispatch({ type: SET_ERROR_MESSAGES, payload: [] })
  }, [data])
  
  return (
    <MaterialTable
      title=""
      columns={tableColumns}
      data={data}
      icons={tableIcons}
      options={{ 
        pageSize: 10,
        sorting: true,
        search: true
      }}
      editable={{ onRowUpdate, onRowAdd, onRowDelete }}
    />
  )
}