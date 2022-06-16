import React, { useState } from 'react'
import { API_URL, API_KEY } from '../data/constants'
import { Featured, Popular } from '../components/main'
import Fetch from '../lib/Fetch'
import '../style/main.scss'
import { FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material'

export default function Main({language, page, setPage}) {
    const [mediaType, setMediaType] = useState('movie');

    const handleChange = (event) => {
        setMediaType(event.target.value);
      };
    

    return (
        <div className='mainPage'>
            <div className='mediaTypeTab'>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="mediaType-group-label"
                        defaultValue="movie"
                        name="radio-buttons-group"
                        mediaType={mediaType}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="movie" control={<Radio />} label="Movies" />
                        <FormControlLabel value="tv" control={<Radio />} label="TV Shows" />
                    </RadioGroup>
                </FormControl>
            </div>
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
