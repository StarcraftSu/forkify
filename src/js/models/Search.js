import axios from 'axios';
// const axios = require('axios');

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResult(){
        try {
            const res = await axios(`${links.proxy}${links.searchAPI}?key=${links.key}&q=${this.query}`);
            this.result = res.data.recipes;
           // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    
    }
}

const links = {
    key  : '012de08e9d801e2661940c8f6a652e6e',
    searchAPI : 'http://food2fork.com/api/search',
    getAPI : 'http://food2fork.com/api/get',
    proxy : 'https://cors-anywhere.herokuapp.com/'
}




