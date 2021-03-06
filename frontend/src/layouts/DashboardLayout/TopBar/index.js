import React from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon
} from '@material-ui/core';
import { Settings as SettingsIcon, Info as InfoIcon } from 'react-feather';
import { THEMES } from 'src/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.ONE_DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  },
  marginRight: {
    marginRight: 10
  }
}));

const TopBar = ({
  className,
  expanded,
  setExpanded,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        {/* <RouterLink to="/">
          <Logo />
        </RouterLink>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <img src={"/static/images/hamburger_menu.svg"} />
        </IconButton> */}
        <Box
          ml={2}
          flexGrow={1}
        />
        <Button
          color="primary"
          className={classes.marginRight}
          startIcon={<SettingsIcon />}
        >
          Setup
        </Button>
        <Button
          variant={expanded ? "contained" : "text"}
          color="primary"
          className={classes.marginRight}
          startIcon={<InfoIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          Info dash
        </Button>
        {/* <Search />
        <Contacts />
        <Notifications />
        <Settings />
        <Box ml={2}>
          <Account />
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  setExpanded: PropTypes.func,
  expanded: PropTypes.bool
};

TopBar.defaultProps = {
  onMobileNavOpen: () => { }
};

export default TopBar;
