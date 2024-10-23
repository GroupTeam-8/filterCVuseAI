import axios from "axios"

const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : ""
const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh'))  : ""

const baseUrl="http://localhost:8000/api/v1"
const axiosInstance=axios.create({
    baseURL: baseUrl,
    'Content-type':'application/json',
    headers:{ Authorization: localStorage.getItem('access') ? `Bearer ${token}` : null}
})

export default axiosInstance