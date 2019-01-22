import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

ContentBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function ContentBlock({classes, children}) {
  return (
    <div className={classes.content}>
      {children}
    </div>
  );
}

export default compose(
  connect(),
  withStyles(styles),
)(ContentBlock);