import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, useScrollTrigger, Box, Fab, Zoom, Badge, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ReactComponent as NotionIcon } from '../assets/images/notion.svg';
import '../style/common.scss'

function ScrollTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
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

  return (
    <>
      <CssBaseline />
      <AppBar className={location.pathname !== '/home'? 'noColor':''}>
        <Toolbar id="back-to-top-anchor">
          {location.pathname !== '/home' && 
            <IconButton size="large" className="prevPage" onClick={handleClick}>
              <ArrowBackRoundedIcon />
            </IconButton>
          }
            <Link to="/home">
              <h1>tmdb2notion</h1>
            </Link>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
               <NotionIcon />
            </Badge>
            </IconButton>
        </Toolbar>
      </AppBar>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}