import React from 'react'

export default function GetRuntime({language, mediaType, runTime, epRunTime}) {
    
    let runningTime = 0;
    if(mediaType === 'tv'){
        runningTime = epRunTime
    }else if(mediaType === 'movie'){
        runningTime = runTime
    }
    const hour = Math.floor(runningTime/60);
    const min = runningTime%60;
    
  return (
      <span>
          {language === 'ko-KR' ? 
            hour ? `${hour}시간 ${min}분` : `${min}분`
            :
            hour ? `${hour}hr ${min}min` : `${min}min`
          }
          
      </span>

    // data.runtime? data.runtime:data.episode_run_time[0]
    // language === 'ko-KR'? '분':' min.'
  )
}
