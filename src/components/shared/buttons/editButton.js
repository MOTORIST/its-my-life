import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

function EditButton({handler, title, ...other}) {
  return (
    <Tooltip title={title}>
      <IconButton
        color="primary"
        onClick={handler}
        {...other}
      >
        <EditIcon/>
      </IconButton>
    </Tooltip>
  );
}

EditButton.propTypes = {
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default EditButton;