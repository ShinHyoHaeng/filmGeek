import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../data/constants'
import { Similar, Crews, Featured, Information, Filmography } from '../components/detail';
import { Tabs, Tab, Box } from '@mui/material';
import Fetch from '../lib/Fetch'
import MultipleFetch from '../lib/MultipleFetch'
import '../style/detail.scss'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Detail({language, query, page}) {

  const { t } = useTranslation('translations', {keyPrefix:'pages.Detail'});
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 파라미터
  const params = useParams();
  const mediaType = params.mediaType;
  const id = params.id;
  
  return (
    <div className='detailPage'>
      <Fetch 
        uri={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=${language}`} 
        renderSuccess={featured}
      />
      <div className='infoArea'>
        {mediaType !== 'person' ?
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
                <Tab label={t('details')} {...a11yProps(0)} />
                <Tab label={t('casts')} {...a11yProps(1)} />
                <Tab label={t('similar')}{...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MultipleFetch 
                  uri1={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=ko-KR`} 
                  uri2={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=en-US`} 
                  renderSuccess={information}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Fetch 
                uri={`${API_URL}${mediaType}/${id}/credits?api_key=${API_KEY}&language=${language}`} 
                renderSuccess={crew}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Fetch 
                  uri={`${API_URL}${mediaType}/${id}/similar?api_key=${API_KEY}&language=${language}&page=1`} 
                  renderSuccess={similar}
                />
            </TabPanel>
        </Box>
        :
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} textColor="primary"  indicatorColor="primary">
                <Tab label={t('details')} {...a11yProps(0)} />
                <Tab label={t('filmography')} {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MultipleFetch 
                  uri1={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=ko-KR`} 
                  uri2={`${API_URL}${mediaType}/${id}?api_key=${API_KEY}&language=en-US`} 
                  renderSuccess={information}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Fetch 
                uri={`${API_URL}${mediaType}/${id}/combined_credits?api_key=${API_KEY}&language=${language}`} 
                renderSuccess={filmography}
              />
            </TabPanel>
        </Box>
        }
      </div>
    </div> 
  )

  function featured({data}){
    return (
      <>
        <Featured data={data} language={language} mediaType={mediaType} id={id} />
      </>
    )
  }

  function information({data1, data2}){
    return (
      <>
        <Information dataKo={data1} dataEn={data2} language={language} mediaType={mediaType} id={id} />
      </>
    )
  }

  function crew({data}){
    return (
      <>
        <Crews data={data} language={language} id={id} setValue={setValue} />
      </>
    )
  }

  function similar({data}){
    return (
      <>
        <Similar data={data} mediaType={mediaType} language={language} id={id} setValue={setValue} />
      </>
    )
  }

  function filmography({data}){
    return (
      <>
        <Filmography data={data} language={language} id={id} />
      </>
    )
  }
}