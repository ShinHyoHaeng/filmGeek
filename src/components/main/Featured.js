import React from 'react'
import { IMAGE_BASE_URL } from '../../data/constants';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import playYoutube from '../common/PlayYoutube'
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Featured({data, language, mediaType}) {
    console.log(data)
    const background = {
        background: `url(${IMAGE_BASE_URL}w1280/${data.backdrop_path}) no-repeat center center`,
        backgroundSize: 'cover'
    }

    return (
        <div className="featuredArea" style={background}>
            <div className='dimArea'/>
            <div className='infoArea'>
                <h2>{data.title}</h2>
                {data.title !== data.original_title &&
                    <p className="subTitle">{data.original_title}</p>
                }
                {/* <p>{data.overview}</p> */}
                <div className="buttonArea">
                    <Button variant="contained" size="large" color="error" startIcon={<PlayArrowIcon />} onClick={playYoutube}>재생</Button>
                    <Button variant="outlined" size="large" startIcon={<InfoIcon />} component={Link} to={`/detail/${mediaType}/${data.id}?language=${language}`}>상세 정보</Button>

                </div>
            </div>
        </div>
    )
}
