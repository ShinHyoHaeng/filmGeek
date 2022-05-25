import { Chip, Avatar } from '@mui/material';
import { IMAGE_BASE_URL } from '../../data/constants';

const Providers = ({data, language}) => {
  
  const locale = language.substr(-2);
  const results = data.results;
  const result = results[locale]; // 키 값을 이용해 값 가져오기
  
  const providerList = [];
  // ott 서비스 배열 생성(api에서는 구매, 구독, 대여를 분리해서 제공)
  if(result){
    if(result['rent']){ 
      const rent = result['rent']; 
      providerList.push(rent);
    }else if(result['flatrate']){ 
      const flatrate = result['flatrate']; 
      providerList.push(flatrate);
    }else if(result['buy']){ 
      const buy = result['buy']; 
      providerList.push(buy);
    }
  }

  return (
    <div className='providers'>
      { providerList[0] &&
        providerList[0].map((provider) => (
          <Chip
            key={provider.provider_id}
            avatar={<Avatar alt={provider.provider_name} src={provider.logo_path?`${IMAGE_BASE_URL}original${provider.logo_path}`:null} />}
            label={provider.provider_name}
            variant="outlined"
          />
        ))
      }
    </div>
  )
}

export default Providers