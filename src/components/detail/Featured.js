import React from 'react'
import { Chip, Avatar, Rating } from '@mui/material';
import { IMAGE_BASE_URL } from '../../data/constants';
import CountriesKr from '../../data/CountriesKr.json'

const Featured = ({data, language, mediaType}) => {

  const rate = data.vote_average;
  const rating = rate/2;

  const genres = data.genres;
  const originalTitle = data.original_title;
  const originalName = data.original_name;
  const title = data.title;
  const name = data.name;
  const mediaTypes = mediaType || '';
  const release = data.release_date || '';
  const firstAir = data.first_air_date || '';
  const lastAir = data.last_air_date || '';
  const prodCountries = data.production_countries;

  function releasedYear({mediaTypes, release, firstAir, lastAir}){
    const firstAirYear = firstAir.substr(0,4);
    const lastAirYear = lastAir.substr(0,4);
    switch(mediaTypes){
      case "tv":
        return  firstAirYear === lastAirYear? firstAirYear : firstAirYear+" - "+lastAirYear;
      case "movie":
        return release.substr(0,4);
      default:
        return "undefined";
    }
  }

  function subTitle({mediaTypes, originalTitle, originalName, title, name}){
    switch(mediaTypes){
      case "tv":
        return originalName === name? null:originalName;
      case "movie":
        return originalTitle === title? null:originalTitle;
      default:
        return null;
    }
  }

  function getCountryName({country, language}){
    if(language === 'ko-KR'){
      const isoCode = country.iso_3166_1 || '';
      const code = isoCode.toLowerCase();
      const filteredCode = CountriesKr.filter((Countries) =>
        Countries.alpha2.includes(code)
      )
      return filteredCode[0].name;
    }else{
      return country.name;
    }
    
  }

  return (
    <div className="featuredArea">
      <div className='dimArea'></div>
      <img src={data.backdrop_path ? `${IMAGE_BASE_URL}w1280/${data.backdrop_path}`:null} alt={data.title?data.title:data.name} className="background" />
      <div className="contentArea">
          <img src={data.poster_path? `${IMAGE_BASE_URL}w500/${data.poster_path}`:null} alt={data.title? data.title:data.name} className="poster" />
          <div className='textArea'>
            <ul className="etcInfo">
              <li className="rating"><Rating value={rating} precision={0.5} readOnly /><span className="rateLabel">{rate}</span></li> 
            </ul>
            <div className="titleArea">
              <h1>{data.title?data.title:data.name}</h1>
              <p>{subTitle({mediaTypes, originalTitle, originalName, title, name})}</p>
            </div>
            <ul className="basicInfo">
                <li>{mediaTypes.toUpperCase()}</li>
                <li>{releasedYear({mediaTypes, release, firstAir, lastAir})}</li>
                {genres &&
                  <li className="genres">
                    {genres.map((genre, index) => (
                      <span key={index}>{genre.name}</span>
                    ))}
                  </li>
                }
                <li>{data.runtime} min.</li>
                {prodCountries &&
                  <li>
                  {prodCountries.map((country, index) => (
                      <span key={index}>{getCountryName({country, language})}</span>
                  ))}
                  </li>
                }
              </ul>
          </div>
        </div>
    </div>
  )
}

export default Featured