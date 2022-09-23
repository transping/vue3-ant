import axios from 'axios'

export default axios.create({
  baseURL: '/mock/',
  timeout: 5000
})