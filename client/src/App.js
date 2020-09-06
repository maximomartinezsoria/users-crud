import React, { useState, useEffect, useContext } from 'react'
import { apiEndpoint } from './config'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import { Table } from './components/Table'
import { store } from './store'
import { SET_DATA, SET_ERROR_MESSAGES } from './store/actions'

const App = () => {
  const { state: {errorMessages}, dispatch } = useContext(store)

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch(`${apiEndpoint}/users`)
      const users = await usersResponse.json()
      dispatch({ type: SET_DATA, payload: users })
    } catch (usersRequestError) {
      dispatch({ type: SET_ERROR_MESSAGES, payload: ["We weren't able to load the user data."] })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <main>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={8}>
          <div>
            { !!errorMessages.length && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
          <Table />
        </Grid>
      </Grid>
    </main>
  );
}

export default App;
