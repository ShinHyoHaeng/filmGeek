import React from 'react'
import { API_URL, API_KEY } from '../data/constants'
import { Featured, Popular } from '../components/main'
import Fetch from '../lib/Fetch'
import '../style/main.scss'

export default function Main({language, page, setPage}) {
    const mediaType = 'movie';
    return (
        <div className='mainPage'>
            <Fetch 
            uri={`${API_URL}${mediaType}/popular?api_key=${API_KEY}&language=${language}&page=${page}`} 
            renderSuccess={featured}
            /> 
            <Fetch 
            uri={`${API_URL}${mediaType}/popular?api_key=${API_KEY}&language=${language}&page=${page}`} 
            renderSuccess={popular}
            /> 
        </div>
    )
    function featured({data}){
        return (
        <Featured 
            data={data.results[0]} 
            mediaType={mediaType} 
            language={language}
            page={page}
            setPage={setPage}
        />
        )
    }
    function popular({data}){
        return (
        <Popular 
            data={data} 
            mediaType={mediaType} 
            language={language}
            page={page}
            setPage={setPage}
        />
        )
    }
}
