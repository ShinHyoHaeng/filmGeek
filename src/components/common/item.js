import { useState } from 'react'
import { Link } from "react-router-dom";
import { Grid, Card, Chip } from "@material-ui/core"
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import TheatersIcon from '@mui/icons-material/Theaters';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const Item = ({id, image, profile, title, mediaType, query, language, page}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);

    function getMediaType({mediaType}) {
        switch (mediaType) {
            case "tv":
            return <Chip icon={<LiveTvIcon />} color="secondary"/>;
            case "movie":
            return <Chip icon={<TheatersIcon />} color="primary"/>;
            case "person":
            return <Chip icon={<PersonIcon />} color="default"/>;
            default:
            return <Chip icon={<QuestionMarkIcon />}/>;;
        }
    }

    return (
        <Grid item>
          <Card 
            onMouseOver={() => setIsHovering(true)} 
            onMouseOut={() => setIsHovering(false)} 
            onTouchStart={() => setIsActive(true)} 
            onTouchEnd={() => setIsActive(false)}
          >
            <Link to={`/detail/${mediaType}/${id}?language=${language}&query=${query}&page=${page}`}>
                {!image ?
                    (profile ?
                        <>
                            {getMediaType({mediaType})}
                            <img src={profile} alt={title} className={isHovering? "hoverActive":(isActive? "hoverActive":"")} />  
                        </>
                    :
                        <div className="noImg">
                            {getMediaType({mediaType})}
                            <div className="wrapper">
                            <ImageNotSupportedIcon fontSize="large"/>
                            <span>{title}</span>
                            </div>
                        </div>
                    )
                    :
                    (
                        <>
                            {getMediaType({mediaType})}
                            <img src={image} alt={title} className={isHovering? "hoverActive":(isActive? "hoverActive":"")} />
                        </>
                    )
                }
            </Link>
          </Card>
      </Grid>
    )
}

export default Item