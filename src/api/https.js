import Axios from 'axios'

export const defaultConnector = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

defaultConnector.interceptors.request.use(config => {
  config.headers.authorization = process.env.REACT_APP_TOKEN
  return config
}, error => error)

export default defaultConnector
