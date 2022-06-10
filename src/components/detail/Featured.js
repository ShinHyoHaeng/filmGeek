import React from 'react'
import { useTranslation } from 'react-i18next';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../data/constants';
import Fetch from '../../lib/Fetch';
import { Fab, Checkbox, Avatar } from '@mui/material';
import { ReactComponent as NotionIcon } from '../../assets/images/notion.svg';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { GetCountry, GetYear, GetRuntime, GetGenre, Providers, RatingStars, GetStatus } from '.';

const Featured = ({data, language, mediaType, id}) => {
  console.log(data)
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail.Featured'});

  const gender = data.gender;
  function getGender ({gender}){
    switch (gender) {
      case 0:
        return t('notSpecified')
      case 1:
        return t('female')
      case 2:
        return t('male')
      default:
        return "undefined"
    }
  }

  const department = data.known_for_department;
  function getDepartment({department}){
    switch (department) {
      case "Acting":
        return t('acting')
      case "Directing":
        return t('directing')
      case "Writing":
        return t('writing')
      case "Production":
        return t('production')
      default:
        return department;
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
      {data.backdrop_path ?
        <img src={data.backdrop_path ? `${IMAGE_BASE_URL}w1280/${data.backdrop_path}`:(data.profile_path? `${IMAGE_BASE_URL}w500/${data.profile_path}`:null)} alt={data.title?data.title:data.name} className="background" />
        :
        <div className='noBg'/>
      }
      <div className="contentArea">
        {data.poster_path || data.profile_path ?
          <img src={data.poster_path? `${IMAGE_BASE_URL}w500/${data.poster_path}`:(data.profile_path? `${IMAGE_BASE_URL}w500/${data.profile_path}`:null)} alt="" className="poster" />
          :
          <div className='noPoster'><Avatar src="/broken-image.jpg" variant="rounded"/></div>
        }
          
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
              {language === 'ko-KR' &&
                alsoKnownAs && <p>{getKoName({alsoKnownAs})}</p>
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
              {data.known_for_department && <li className="">{getDepartment({department})}</li>}
              {data.birthday && <li className="">{data.birthday}(<GetYear mediaType={mediaType} birthday={data.birthday}/>{t('years')})</li>}
              {data.place_of_birth && <li><GetCountry mediaType={mediaType} placeOfBirth={data.place_of_birth} language={language}/></li>}
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