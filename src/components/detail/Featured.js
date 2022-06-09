import React from 'react'
import { useTranslation } from 'react-i18next';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../data/constants';
import Fetch from '../../lib/Fetch';
import { Fab, Checkbox } from '@mui/material';
import { ReactComponent as NotionIcon } from '../../assets/images/notion.svg';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { GetCountry, GetYear, GetRuntime, GetGenre, Providers, RatingStars, GetStatus } from '.';

const Featured = ({data, language, mediaType, id}) => {
  console.log(data)
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail.Featured'});

  const gender = data.gender;
  function getGender ({gender}){
    switch (gender) {
      case 1:
        return "Female"
      case 2:
        return "Male"
      default:
        return "undefined"
    }
  }

  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const alsoKnownAs = data.also_known_as;
  function getKoName({alsoKnownAs}){
    const koName = alsoKnownAs.filter((name) =>korean.test(name))
    return koName;
  }

  return (
    <div className="featuredArea">
      <div className='dimArea'></div>
      <img src={data.backdrop_path ? `${IMAGE_BASE_URL}w1280/${data.backdrop_path}`:(data.profile_path? `${IMAGE_BASE_URL}w500/${data.profile_path}`:null)} alt={data.title?data.title:data.name} className="background" />
      <div className="contentArea">
          <img src={data.poster_path? `${IMAGE_BASE_URL}w500/${data.poster_path}`:(data.profile_path? `${IMAGE_BASE_URL}w500/${data.profile_path}`:null)} alt="" className="poster" />
          <div className='textArea'>
            <RatingStars mediaType={mediaType} rate={data.vote_average} popular={data.popularity} />
            <div className="titleArea">
              <h1>
                {data.title?data.title:data.name}
                {mediaType !== 'person' &&
                  <span>(<GetYear mediaType={mediaType} release={data.release_date} firstAir={data.first_air_date} lastAir={data.last_air_date} />)</span>
                }
              </h1>
              {data.original_title?
                (data.original_title === data.title ?null: <p>{data.original_title}</p>)
              :
                (data.original_name === data.name ?null: <p>{data.original_name}</p>)
              }
              {alsoKnownAs &&
                <p>{getKoName({alsoKnownAs})}</p>
              }
            </div>
            {mediaType !== 'person' ?
            <>
              <ul className="basicInfo">
                <li className="status"><GetStatus status={data.status}/></li>
                <li><GetRuntime language={language} mediaType={mediaType} runTime={data.runtime} epRunTime={data.episode_run_time} /></li>
                <li className='genres'><GetGenre genres={data.genres} /></li>
                <li><GetCountry mediaType={mediaType} prodCountries={data.production_countries} language={language}/></li>
              </ul>
              <Fetch 
                uri={`${API_URL}${mediaType}/${id}/watch/providers?api_key=${API_KEY}&language=${language}`} 
                renderSuccess={providers}
              />
            </>
            :
            <ul className="basicInfo">
              <li className="">{getGender({gender})}</li>
              <li className="">{data.known_for_department}</li>
              <li className="">{data.birthday}(<GetYear mediaType={mediaType} birthday={data.birthday}/>{t('years')})</li>
              <li><GetCountry mediaType={mediaType} placeOfBirth={data.place_of_birth} language={language}/></li>
            </ul>
            }
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