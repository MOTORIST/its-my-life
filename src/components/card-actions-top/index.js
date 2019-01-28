import React from 'react';
import TypeProps from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import style from './style';
import CardActions from '@material-ui/core/CardActions';

CardActionsTop.propTypes = {
  show: TypeProps.bool.isRequired,
  classes: TypeProps.object.isRequired,
  children: TypeProps.node.isRequired,
};

function CardActionsTop({show, classes, children}) {
  if(!show) {
    return null;
  }
  
  return (
    <CardActions className={classes.actions}>
      {children}
    </CardActions>
  );
}

export default compose(
  withStyles(style),
  pure
)(CardActionsTop);