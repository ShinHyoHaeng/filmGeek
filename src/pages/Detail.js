import React from 'react'
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../data/constants'
import { Collections, Crew, Featured, Information, Providers } from '../components/detail';
import Fetch from '../lib/Fetch'

export default function Detail() {
  // 파라미터
  const params = useParams();
  const mediaType = params.mediaType;
  const id = params.id;
  
  // 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const language = searchParams.get('language');
  const query = searchParams.get('query');

  const location = useLocation();
  console.log(location.search);
  return (
    <div className='container detailPage'>
      <Fetch 
        uri={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=${language}`} 
        renderSuccess={information}
      />
      <Fetch 
        uri={`${API_URL}${mediaType}/${id}/watch/providers?api_key=${API_KEY}&language=${language}`} 
        renderSuccess={providers}
      />
    </div> 
  )
  
  function providers({data}){
    return (
      <Providers data={data} />
    )
  }
  
  function information({data}){
    return <Featured data={data}/>
  }

}
