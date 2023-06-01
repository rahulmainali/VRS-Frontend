import axios from 'axios'

const commonAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https:sadhan.com.np'
      : 'http://localhost:5000/api',

  timeout: 10000,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default commonAxios
