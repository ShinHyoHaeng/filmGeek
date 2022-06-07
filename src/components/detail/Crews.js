import { useState } from 'react';
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from '../../data/constants';
import { Button, Avatar } from '@mui/material';

const Crews = ({data, language, id}) => {
  const [all, isAll] = useState(false);

  const casts = data.cast;
  const crewsList = data.crew;

  const crews = crewsList.filter((arr, index, callback) => 
    index === callback.findIndex((crew) => crew.id === arr.id) // 중복 제거
  ).filter((crew)=> // 감독, 총괄 프로듀서, 작가만 조회
    crew.job === "Director" || crew.job === "Executive Producer" || crew.job === "Story" || crew.job === "Screenplay"
  ).sort(function(i, j) { // crew.job을 기준으로 정렬
    let x = i.job.toLowerCase();
    let y = j.job.toLowerCase();
    if(x < y) return -1;
    if(x > y) return 1;
    return 0;
  })

  console.log(casts)
  
  function getCasts(all){
    if(all){
      return casts.map((cast) => (
        <li key={cast.order}>
          <Link to={`/detail/person/${cast.id}?language=${language}`}>
            <div className='imageArea'>
              <Avatar
                src={cast.profile_path? `${IMAGE_BASE_URL}w500/${cast.profile_path}`:null}
                alt=""
                sx={{ width: 75, height: 75}}
              />
            </div>
            <div className="textArea">
              <h3>{cast.name? cast.name:cast.original_name}</h3>
              <p>{cast.character}</p>
            </div>
          </Link>
        </li>
      ))
    }else{
      return casts.slice(0,10).map((cast) => (
        <li key={cast.order}>
          <Link to={`/detail/person/${cast.id}?language=${language}`}>
            <div className='imageArea'>
              <Avatar
                src={cast.profile_path? `${IMAGE_BASE_URL}w500/${cast.profile_path}`:null}
                alt=""
                sx={{ width: 75, height: 75}}
              />
            </div>
            <div className="textArea">
              <h3>{cast.name? cast.name:cast.original_name}</h3>
              <p>{cast.character}</p>
            </div>
          </Link>
        </li>
      ))
    } 
  }

  return (
    <div className='tabArea'>
        <div className='items'>
        {crews &&
        <>
          <div className='titleArea'>
            <h2>{language === 'ko-KR'? '감독/제작자':'Crews'}</h2>
          </div>
          <ul className="crewArea">
            {crews.map((crew) => (
              <li key={crew.id}>
                <Link to={`/detail/person/${crew.id}?language=${language}`}>
                  <div className='imageArea'>
                  <Avatar
                    src={crew.profile_path? `${IMAGE_BASE_URL}w500/${crew.profile_path}`:null}
                    alt=""
                    sx={{ width: 75, height: 75}}
                  />
                  </div>
                  <div className="textArea">
                    <h3>{crew.name? crew.name:crew.original_name}</h3>
                    <p>{crew.job}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>    
        </>
        }
        {casts &&
        <>
          <div className='titleArea'>
            <h2>{language === 'ko-KR'? '출연진':'Casts'}</h2>
            <Button 
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => {isAll(true)}}
            >
              {language === 'ko-KR'? '모두 보기':'Show All'}
            </Button>
          </div>
          
          <ul className="crewArea">
            {getCasts(all)}
          </ul>    
        </>
        }
        </div>
    </div>
  )
}

export default Crews