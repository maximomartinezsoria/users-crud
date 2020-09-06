import React, { useState, useEffect } from 'react'
import { apiEndpoint } from './config'
import { onRowAdd, onRowDelete, onRowUpdate } from './utils/tableFunctions'
import tableIcons from './utils/tableIcons'
import tableColumns from './utils/tableColumns'
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table'
import Alert from '@material-ui/lab/Alert';

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch(`${apiEndpoint}/users`)
      const users = await usersResponse.json()
      setData(users)
    } catch (usersRequestError) {
      setErrorMessages(["We weren't able to load the user data."])
      setError(true)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <main>
      <Grid container>
        <Grid item xs={12} xl={8}>
          <div>
            { error && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title=""
              columns={tableColumns}
              data={data}
              icons={tableIcons}
              editable={{ onRowUpdate, onRowAdd, onRowDelete }}
            />
        </Grid>
      </Grid>
    </main>
  );
}

export default App;
