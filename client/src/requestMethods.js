import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODM2ZDVmYmU4ODk3NjUwYTVmNzYyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mjg2NjM4NSwiZXhwIjoxNjUzMTI1NTg1fQ.EYnHS-SXOog8Tj2NRjhxACCnL111IqarTrwgA-LoEQo"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})