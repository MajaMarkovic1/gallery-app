import axios from 'axios'

export default class Galleries {

    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll(){
        return axios.get('galleries')
    }

    get(id){
        return axios.get(`galleries/${id}`)
    }

    getAuthor(id){
        return axios.get(`authors/${id}`)
    }

    getLoggedUser(){
        return axios.get('my-galleries');
    }

    add(gallery){
        return axios.post('galleries', gallery)
    }

    addComment(comment){
        return axios.post('comments', comment)
    }
}

export const galleries = new Galleries()