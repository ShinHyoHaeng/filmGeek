import React, { useState } from "react";
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zoom, Box, useScrollTrigger, ToggleButton, ToggleButtonGroup, Fab, Drawer, CssBaseline, AppBar, Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { makeStyles, useTheme, ThemeProvider, unstable_createMuiStrictModeTheme, styled, alpha } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { ReactComponent as NotionIcon } from '../assets/images/notion.svg';
import '../style/common.scss'

const strictModeTheme = unstable_createMuiStrictModeTheme();

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const data = [
  {
    name: "Home",
    //icon: <HomeOutlined />,
  },
  { 
    name: "Inbox", 
    //icon: <InboxOutlined /> 
  }
];

export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  function handleClick() {
    const destination = location.search;
    console.log(destination)
    return navigate(
      -1
      // {
      //   pathname: '/home',
      //   search: destination
      // }
    );
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
      backgroundColor: trigger ? "#fff" : location.pathname.includes('/detail')? "transparent":"#fff",
      //backgroundColor: trigger ? "#fff" : "transparent",
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

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const getList = () => (
    <div style={{ width: 240 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button key={index}>
          {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <ThemeProvider theme={strictModeTheme}>
      <CssBaseline />
      <ElevationScroll {...props}>
      <AppBar 
        // position="fixed" 
        className={classes.appBar}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={`${classes.menuButton} showMobile`}
          >
            <MenuIcon />
          </IconButton>
          {location.pathname.includes('/detail') && 
              <IconButton size="large" className="prevPage" onClick={handleClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            }
            <Link to={`/`}>
              <h1>filmGeek</h1>
            </Link>
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
            {/* <IconButton size="large" aria-label="you choose 4 contents for notion" color="inherit" onClick={() => alert("준비중입니다")}>
              <Badge badgeContent={4} color="error">
                <NotionIcon />
              </Badge>
            </IconButton> */}
            </div> 
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Toolbar variant="dense"/>
        <Divider />
        <div className="menuWrapper">
          
          <Divider />
          {getList()}
        </div>
      </Drawer>
      <Toolbar id="back-to-top-anchor"/>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" id="goToTopButton" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
}
