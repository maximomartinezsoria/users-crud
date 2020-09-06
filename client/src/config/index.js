const host = process.env.API_HOST || 'http://localhost'
const port = process.env.API_PORT || '8080'

export const apiEndpoint = `${host}:${port}/api`

export const usersEndpoint = `${apiEndpoint}/users`
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}