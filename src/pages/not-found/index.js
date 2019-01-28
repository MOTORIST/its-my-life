import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

function NotFound({classes}) {
  return (
    <div className={classes.messageBox}>
      <div className={classes.message}>Error 404, <br /> page not found!</div>
    </div>
  );
}

export default withStyles(styles)(NotFound);