import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
  colorIcon: {
    color: 'red',
  },
});

function DeleteButton({handler, title, classes}) {
  return (
    <Tooltip title={title}>
      <IconButton onClick={handler}>
        <DeleteIcon className={classes.colorIcon}/>
      </IconButton>
    </Tooltip>
  );
}

DeleteButton.propTypes = {
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteButton);