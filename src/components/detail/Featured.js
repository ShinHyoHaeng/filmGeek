import React from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../data/constants';
import { Fab, Checkbox } from '@mui/material';
import Fetch from '../../lib/Fetch';
import { ReactComponent as NotionIcon } from '../../assets/images/notion.svg';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { GetCountry, GetYear, GetRuntime, GetGenre, Providers, RatingStars } from '.';

const Featured = ({data, language, mediaType, id}) => {

  return (
    <div className="featuredArea">
      <div className='dimArea'></div>
      <img src={data.backdrop_path ? `${IMAGE_BASE_URL}w1280/${data.backdrop_path}`:null} alt={data.title?data.title:data.name} className="background" />
      <div className="contentArea">
          <img src={data.poster_path? `${IMAGE_BASE_URL}w500/${data.poster_path}`:null} alt="" className="poster" />
          <div className='textArea'>
            <RatingStars rate={data.vote_average} />
            <div className="titleArea">
              <h1>
                {data.title?data.title:data.name}
                <GetYear mediaType={mediaType} release={data.release_date} firstAir={data.first_air_date} lastAir={data.last_air_date} />
              </h1>
              {data.original_title?
                (data.original_title === data.title ?null: <p>{data.original_title}</p>)
              :
                (data.original_name === data.name ?null: <p>{data.original_name}</p>)
              }
            </div>
            <ul className="basicInfo">
                <li className="mediaType">{mediaType.toUpperCase()}</li>
                <li><GetRuntime language={language} mediaType={mediaType} runTime={data.runtime} epRunTime={data.episode_run_time} /></li>
                <li className='genres'><GetGenre genres={data.genres} /></li>
                <li><GetCountry prodCountries={data.production_countries} language={language}/></li>
              </ul>
              <Fetch 
                uri={`${API_URL}${mediaType}/${id}/watch/providers?api_key=${API_KEY}&language=${language}`} 
                renderSuccess={providers}
              />
          </div>
          <Fab size="large" color="secondary" className="addNotion">
            <Checkbox icon={<NotionIcon />} aria-label="add" checkedIcon={<CheckRoundedIcon />} />
          </Fab>
        </div>
    </div>
  )
  function providers({data}){
    return (
      <Providers data={data} language={language} />
    )
  }
}



export default Featured