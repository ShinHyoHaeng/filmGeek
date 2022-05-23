import React from 'react'
import axios from 'axios'
import { API_KEY, API_URL } from './constants'


//https://foamless.tistory.com/617
//https://github.com/lviit/themoviedb-react/blob/master/src/js/services/ApiConnect.ts

export default {

    Search: ({language: string, query: string}) => axios.get(`${API_URL}/3/search/multi`, {
        params: {
            language, 
            query, 
            api_key: API_KEY
        }
    })
    .then(res => res.data)
    .catch(error => console.log(error)),

    getDetail: ({type: string, id: string}) => axios.get(`${API_URL}/3/${type}/${id}`, {
        params: {
            type,
            id,
            api_key: API_KEY
        }
    })
    .then(res => res.data)
    .catch(error => console.log(error)),

    getCredits: ({type: string, id: string}) => axios.get(`${API_URL}/3/${type}/${id}/credits`,{
        params: {
            type,
            id,
            api_key: API_KEY
        }
    })



    
}
