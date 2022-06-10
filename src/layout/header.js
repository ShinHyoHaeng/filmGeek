import * as React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Fab, Zoom, Badge, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ReactComponent as NotionIcon } from '../assets/images/notion.svg';
import '../style/common.scss'


export default function Header(props) {
  
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    const destination = location.search;
    console.log(destination)
    return navigate({
      pathname: '/home',
      search: destination
    });
  }

  function ScrollTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
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

  function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    className: trigger? "scrollHeader":"",
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? "#fff" : location.pathname.includes('/detail')? "transparent":"#3700b3",
      transition: trigger ? "0.3s" : "0.3s",
    }
  });
  }

  ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired
  };  
  
  const handleLanguage = (event, newLanguage) => {
    if (newLanguage.length) {
      props.setLanguage(newLanguage);
      i18next.changeLanguage(newLanguage);
    }
  };
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            {location.pathname.includes('/detail') && 
              <IconButton size="large" className="prevPage" onClick={handleClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            }
            {!location.pathname.includes('/detail') && 
              <Link to={`/`}>
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
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor"/>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" id="goToTopButton" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}