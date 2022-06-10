import * as React from 'react';
import { Chip, Avatar, Alert } from '@mui/material';
import { IMAGE_BASE_URL } from '../../data/constants';
import { useTranslation } from 'react-i18next';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const Providers = ({data, language}) => {
  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail'});

  const locale = language.substr(-2);
  const results = data.results;
  const result = results[locale]; // 키 값을 이용해 값 가져오기
  
  let flatrate = '';
  let rent = '';
  let buy = '';
  const providerList = [];
  if(result){
    if(result['flatrate']) {flatrate = result['flatrate']; providerList.push(flatrate)}
    else if(result['rent']) {rent = result['rent']; providerList.push(rent)}
    else if(result['buy']) {buy = result['buy']; providerList.push(buy)}
  }else{

  }
  
  return (
    providerList[0] ?
    <div className='providers'>
      {providerList[0].map((provider) => (
        <Chip
          key={provider.provider_id}
          avatar={<Avatar alt={provider.provider_name} src={provider.logo_path?`${IMAGE_BASE_URL}original${provider.logo_path}`:null} />}
          label={provider.provider_name}
          variant="outlined"
        />
      ))}
    </div>
    :
    <div className='providers noProviders'>
      <Alert
          severity="error"
          icon={<DoNotDisturbAltIcon fontSize="inherit" />}
          variant="outlined"
        >
          {t('noProvider')}
        </Alert>
    </div>
  )
}

export default Providers