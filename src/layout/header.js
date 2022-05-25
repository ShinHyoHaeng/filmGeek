import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Fab, Zoom, Badge, IconButton, Slide, ToggleButton, ToggleButtonGroup } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { ReactComponent as NotionIcon } from '../assets/images/notion.svg';
import '../style/common.scss'

function ScrollTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 50,
    });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: "2.75rem", right: "2.75rem" }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired
};

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};


export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  function handleClick() {
    const destination = location.search;
    return navigate({
      pathname: '/home',
      search: destination
    });
  }

  const handleLanguage = (event, newLanguage) => {
    if (newLanguage.length) {
      props.setLanguage(newLanguage);
    }
  };
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={location.pathname.includes('/detail')? 'noColor':''}>
          <Toolbar>
            {location.pathname.includes('/detail') && 
              <IconButton size="large" className="prevPage" onClick={handleClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            }
            {location.pathname.includes('/home') && 
              <Link to={`/home`}>
                <h1>tmdb2notion</h1>
              </Link>
            }
              <div className='menu'>
                <ToggleButtonGroup
                  value={props.language}
                  size="large"
                  onChange={handleLanguage}
                  aria-label="language"
                  exclusive
                >
                  <ToggleButton value="ko-KR" aria-label="Korean">KR</ToggleButton>
                  <ToggleButton value="en-US" aria-label="English">EN</ToggleButton>
                </ToggleButtonGroup>
                <IconButton size="large" aria-label="you choose 4 contents for notion" color="inherit" onClick={() => alert("준비중입니다")}>
                  <Badge badgeContent={4} color="error">
                    <NotionIcon />
                  </Badge>
                </IconButton>
              </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor"/>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}