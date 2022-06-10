import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../data/constants';
import { Avatar, Chip } from '@mui/material';
import { SeasonsDetail } from '.';
import Fetch from '../../lib/Fetch';

export default function Seasons({data, language, mediaType}) {
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail'});
  const [seasonNo, setSeasonNo] = useState(1)
  const results = data.seasons;

  return (
    <div className='seasons'>
      <div className='items'>
        <h2>{t('seasons')}</h2>
        <div className='seasonListArea'>
          {
            results.map((result) => (
              <Chip
                key={result.id}
                avatar={<Avatar alt="" src={result.poster_path? `${IMAGE_BASE_URL}w500/${result.poster_path}`:null}/>}
                label={result.name}
                variant="outlined"
                component="a"
                onClick={() => setSeasonNo(result.season_number)}
                clickable
              />
            ))
          }
        </div>
        <Fetch 
          uri={`${API_URL}${mediaType}/${data.id}/season/${seasonNo}?api_key=${API_KEY}&language=${language}`} 
          renderSuccess={seasonsDetail}
        />
      </div>
    </div>
  )
          
  function seasonsDetail({data}){
    return (
        <SeasonsDetail data={data} language={language} />
    )
  }
}
