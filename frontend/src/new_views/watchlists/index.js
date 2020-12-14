import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
  InputAdornment,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  medium: {
    background: theme.palette.background.default,
    minWidth: 300
  },
  background: {
    background: theme.palette.background.default
  },
  inactiveButton: {
    background: theme.palette.background.default,
    color: theme.palette.text.secondary
  },
  iconButton: {
    padding: 8,
    minWidth: 32,
    position: "absolute",
    right: 15
  },
  startIcon: {
    margin: 0
  }
}));
const COLUMNS_ICON = '/static/images/columns.svg';
const COLUMNS_ICON_WHITE = '/static/images/columns_white.svg';

const Header = ({ className, frequency, setFrequency, setSortOrder, sortOrder, showColumns, toggleShowColumns, ...rest }) => {
  const classes = useStyles();

  return (
    <Box display="flex"
      alignItems="center" justifyContent="center">
      <Button
        variant={showColumns ? "contained" : "text"}
        color="primary"
        startIcon={showColumns ? <img src={COLUMNS_ICON_WHITE} /> : <img src={COLUMNS_ICON} />}
        onClick={() => toggleShowColumns(showColumns)}
        classes={{ root: classes.iconButton, startIcon: classes.startIcon }}
      >
      </Button>
      <Box mr={1} display="flex"
        alignItems="center">
        <Box mr={1}>
          <InputLabel htmlFor="outlined-age-native-simple" mr={1}>Watchlist</InputLabel>
        </Box>
        <Box mr={1}>
          <FormControl variant="outlined" size="small" classes={{ root: classes.medium }}>
            <Select
              native
              value={10}
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value={10}>Penny Crusher</option>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box mr={1} display="flex"
        alignItems="center">
        <Button variant="contained" color={sortOrder ? "primary" : "default"} classes={{ root: !sortOrder && classes.inactiveButton }} onClick={() => setSortOrder(!sortOrder)}>
          Rising
        </Button>
        <Button variant="contained" color={!sortOrder ? "primary" : "default"} classes={{ root: sortOrder && classes.inactiveButton }} onClick={() => setSortOrder(!sortOrder)}>
          Falling
        </Button>
      </Box>
    
  
    </Box>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
