import axios from "axios";

export const api = axios.create({
    baseURL: "https://get-away.onrender.com/api",
    withCredentials: true
    
})