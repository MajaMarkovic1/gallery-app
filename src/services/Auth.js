import axios from 'axios'

export default class Auth {

    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api/'
        this.setAuthorizationHeader()
    }

    isAuthenticated(){
        return !!localStorage.getItem('token')
    }

    getUserId(){
        return localStorage.getItem('user_id')
    }

    logout(){
        localStorage.removeItem('token')
    }

    login(email, password){
        return axios.post('auth/login', {email, password})
            .then((response) => {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('user_id', response.data.user_id)                
                this.setAuthorizationHeader()
            })
          
    }

    setAuthorizationHeader(){
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    register(user){
        return axios.post('auth/register', user)
    }
}

export const authService = new Auth();