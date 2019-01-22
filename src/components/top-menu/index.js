import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button/Button';
import SignInMenu from '../sign-in-menu';

TopMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

function TopMenu({classes}) {
  return (
    <div className={classes.root}>
      <Button disabled={window.location.pathname === '/'}  component={({...props}) => <Link to='/' {...props} />} color="inherit">Albums</Button>
      <div className={classes.rightBlock}>
        <SignInMenu/>
      </div>
    </div>
  );
}

export default withStyles(styles)(TopMenu);