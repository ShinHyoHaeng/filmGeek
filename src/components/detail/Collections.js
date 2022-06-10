import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid } from "@material-ui/core"
import { IMAGE_BASE_URL } from "../../data/constants";
import Item from '../common/Item'

export default function Collections({data,mediaType,language}) {
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail'});
  const results = data.parts;

  function sortByDate() {
    // 개봉일 기준 정렬(null값의 경우 가장 마지막에 출력)
    return (
        function (a, b) {
        const distantFuture = new Date(8640000000000000)
        const x = a.release_date;
        const y = b.release_date;
        
        let xDate = x ? new Date(x) : distantFuture
        let yDate = y ? new Date(y) : distantFuture
        return xDate.getTime() - yDate.getTime()
      }
    )
  }
  
  return (
    <div className='collections'>
      <div className='items'>
        <h2>{t('collections')}: {data.name}</h2>
        <div className='itemList'>
            <Grid container spacing={2}>
              {results
                .sort(sortByDate())
                .map((result) => (
                  <Item 
                    key={result.id}
                    id={result.id}
                    image={result.poster_path ? `${IMAGE_BASE_URL}w500${result.poster_path}`:null}
                    profile={result.profile_path ? `${IMAGE_BASE_URL}w500${result.profile_path}`:null}
                    mediaType={result.media_type? result.media_type:mediaType}
                    title={result.title? result.title:result.name}
                    language={language}
                  />
              ))}
            </Grid>
          </div>
        </div>
    </div>
  )
}
