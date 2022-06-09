import React from 'react'
import { useTranslation } from 'react-i18next';
import { GetCountry, GetRuntime, GetGenre, GetCompanies, Providers } from '.';
import { API_URL, API_KEY } from '../../data/constants';
import Fetch from '../../lib/Fetch';

const Information = ({data, language, mediaType}) => {
    const { t } = useTranslation('translations', {keyPrefix:'pages.Detail.Information'});
    return (
        <div className='tabArea'>
            {mediaType !== 'person' &&
            <div className='items'>
                <div className='tableArea'>
                    <dl>
                        <dt>{t('originalTitle')}</dt>
                        <dd>{data.original_title? data.original_title:data.original_name}</dd>
                    </dl>
                    <dl>
                        <dt>{t('release')}</dt>
                        <dd>{data.release_date? data.release_date:data.first_air_date}</dd>
                    </dl>
                    <dl>
                        <dt>{t('prodCountries')}</dt>
                        <dd><GetCountry mediaType={mediaType} prodCountries={data.production_countries} language={language}/></dd>
                    </dl>
                    <dl>
                        <dt>{t('genres')}</dt>
                        <dd><GetGenre genres={data.genres} /></dd>
                    </dl>
                    <dl>
                        <dt>{t('runTime')}</dt>
                        <dd><GetRuntime language={language} mediaType={mediaType} runTime={data.runtime} epRunTime={data.episode_run_time} /></dd>
                    </dl>
                    <dl>
                        <dt>{t('prodCompanies')}</dt>
                        <dd><GetCompanies prodCompanies={data.production_companies}/></dd>
                    </dl>
                    <dl className='showMobile'>
                        <dt>{t('providers')}</dt>
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
                    <h2>{t('overview')}</h2>
                    <p>{data.overview}</p>
                </div>
                :(data.biography ?
                    <div className='items'>
                        <h2>{t('biography')}</h2>
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