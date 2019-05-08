import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = () => ({
  colorIcon: {
    color: 'red',
  },
});

function DeleteButton({handler, classes}) {
  return (
    <Tooltip title="Delete photo">
      <IconButton onClick={handler}>
        <DeleteIcon className={classes.colorIcon}/>
      </IconButton>
    </Tooltip>
  );
}

export default withStyles(styles)(DeleteButton);