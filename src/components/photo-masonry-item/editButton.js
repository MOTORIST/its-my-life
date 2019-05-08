import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

function EditButton({handler}) {
  return (
    <Tooltip title="Edit photo">
      <IconButton
        color="primary"
        onClick={handler}
      >
        <EditIcon/>
      </IconButton>
    </Tooltip>
  );
}

export default EditButton;