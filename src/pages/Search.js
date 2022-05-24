import React, { useState } from 'react';
import { API_URL, API_KEY } from '../data/constants'
import { SearchData, ResultList } from '../components/search'
import Fetch from '../lib/Fetch'
import '../style/search.scss'

export default function Search() {    
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('ko-KR');
  const [mediaType, setMediaType] = useState('movie');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='container searchPage'>
      <SearchData 
        setQuery={setQuery} 
        setLanguage={setLanguage}
        setCurrentPage={setCurrentPage}
      />
      {query ?
        // 검색어가 있을 때
        <Fetch 
          uri={`${API_URL}search/multi?api_key=${API_KEY}&language=${language}&query=${query}&page=${currentPage}&include_adult=false`} 
          renderSuccess={searchResult}
        /> 
        :
        // 검색어가 없을 때
        <Fetch 
          uri={`${API_URL}${mediaType}/popular?api_key=${API_KEY}&language=${language}&page=${currentPage}`} 
          renderSuccess={searchResult}
        /> 
      }
    </div>
  )

  function searchResult({data}){
    return (
      <ResultList 
        data={data} 
        mediaType={mediaType} 
        query={query} 
        language={language}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    )
  }
}
