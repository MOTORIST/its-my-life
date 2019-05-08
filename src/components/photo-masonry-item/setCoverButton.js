import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/PhotoLibrary';

function SetCoverButton({handler}) {
  return (
    <Tooltip title="Set album cover">
      <IconButton
        color="primary"
        onClick={handler}
      >
        <CheckIcon/>
      </IconButton>
    </Tooltip>
  );
}

export default SetCoverButton;