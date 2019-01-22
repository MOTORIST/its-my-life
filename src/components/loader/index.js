import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoader: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  isLoader: false,
};

function Loader({isLoaded, classes}) {
  return (
    <div className={classes.root}>
      <Fade in={isLoaded}>
        <LinearProgress color="secondary" />
      </Fade>
    </div>
  );
}

export default compose(
  connect((state) => ({
    isLoaded: state.common.loader,
  })),
  withStyles(styles)
)(Loader);