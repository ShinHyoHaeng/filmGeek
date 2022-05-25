import React from 'react'
import { GetCountry, GetRuntime, GetGenre, GetCompanies } from '.';

const Information = ({data, language, mediaType}) => {
    console.log(data);

    return (
        <div className='tabArea'>
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
                        <dd><GetCountry prodCountries={data.production_countries} language={language}/></dd>
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
                </div>
            </div>
            <div className='items'>
                <h2>{language === 'ko-KR'? '줄거리':'Overview'}</h2>
                <p>{data.overview}</p>
            </div>
        </div>
    )
}

export default Information