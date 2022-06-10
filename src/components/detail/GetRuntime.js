import React from 'react'
import { useTranslation } from 'react-i18next';

export default function GetRuntime({language, mediaType, runTime, epRunTime}) {
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail.Featured'});

  let runningTime = 0;
  if(mediaType === 'tv'){
      runningTime = epRunTime[0]
  }else if(mediaType === 'movie'){
      runningTime = runTime
  }
  const hour = Math.floor(runningTime/60);
  const min = runningTime%60;
  
  return (
      <span>
          {hour ? `${hour}${t('hour')} ${min}${t('min')}` : `${min}${t('min')}`}
      </span>
  )
}
