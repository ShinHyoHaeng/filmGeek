import React from 'react'
import { GetCountry, GetRuntime, GetGenre, GetCompanies, Providers } from '.';
import { API_URL, API_KEY } from '../../data/constants';
import Fetch from '../../lib/Fetch';

const Information = ({data, language, mediaType}) => {
    console.log(data);
    return (
        <div className='tabArea'>
            {mediaType !== 'person' &&
            <div className='items'>
                <div className='tableArea'>
                    <dl>
                        <dt>{language === 'ko-KR'? '원제':'Original Title'}</dt>
                        <dd>{data.original_title? data.original_title:data.original_name}</dd>
                    </dl>
                    <dl>
                        <dt>{language === 'ko-KR'? '개봉일/공개일':'Release Date'}</dt>
                        <dd>{data.release_date? data.release_date:data.first_air_date}</dd>
                    </dl>
                    <dl>
                        <dt>{language === 'ko-KR'? '제작 국가':'Production Countries'}</dt>
                        <dd><GetCountry mediaType={mediaType} prodCountries={data.production_countries} language={language}/></dd>
                    </dl>
                    <dl>
                        <dt>{language === 'ko-KR'? '장르':'Genres'}</dt>
                        <dd><GetGenre genres={data.genres} /></dd>
                    </dl>
                    <dl>
                        <dt>{language === 'ko-KR'? '상영시간':'Running Time'}</dt>
                        <dd><GetRuntime language={language} mediaType={mediaType} runTime={data.runtime} epRunTime={data.episode_run_time} /></dd>
                    </dl>
                    <dl>
                        <dt>{language === 'ko-KR'? '제작사':'Production Companies'}</dt>
                        <dd><GetCompanies prodCompanies={data.production_companies}/></dd>
                    </dl>
                    <dl className='showMobile'>
                        <dt>{language === 'ko-KR'? 'OTT 서비스':'Providers'}</dt>
                        <dd>
                            <Fetch 
                                uri={`${API_URL}${mediaType}/${data.id}/watch/providers?api_key=${API_KEY}&language=${language}`} 
                                renderSuccess={providers}
                            />
                        </dd>
                    </dl>
                </div>
            </div>
            }
            {data.overview ?
                <div className='items'>
                    <h2>{language === 'ko-KR'? '줄거리':'Overview'}</h2>
                    <p>{data.overview}</p>
                </div>
                :(data.biography ?
                    <div className='items'>
                        <h2>{language === 'ko-KR'? '약력':'Biography'}</h2>
                        <p>{data.biography}</p>
                    </div>
                    : null
                )
            }
        </div>
    )
    function providers({data}){
        return (
          <Providers data={data} language={language} />
        )
      }
}


export default Information