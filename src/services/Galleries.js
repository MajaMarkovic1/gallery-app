import axios from 'axios'

export default class Galleries {

    constructor(){
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }
}

export const galleries = new Galleries()