import axios from 'axios'

export default class Galleries {

    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getAll(term = ''){
        return axios.get(`galleries?term=${term}`)
    }

    get(id){
        return axios.get(`galleries/${id}`)
    }

    getAuthor(id, term = ''){
        return axios.get(`authors/${id}?term=${term}`)
    }

    getLoggedUser(term = ''){
        return axios.get(`my-galleries?term=${term}`);
    }

    add(gallery){
        return axios.post('galleries', gallery)
    }

    addComment(comment){
        return axios.post('comments', comment)
    }

    deleteComment(id){
        return axios.delete(`comments/${id}`, id)
    }

    deleteGallery(id){
        return axios.delete(`galleries/${id}`, id)
    }

    getGallery(page){
        return axios.get(`galleries?page=${page}`)
    }

    getMyGalleries(page){
        return axios.get(`my-galleries?page=${page}`)
    }

    getAuthorsGalleries(page, id){
        return axios.get(`authors/${id}?page=${page}`)
    }

    edit(gallery){
        return axios.put(`galleries/${gallery.id}`, gallery)
    }

}

export const galleries = new Galleries()