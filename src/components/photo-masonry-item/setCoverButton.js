import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/PhotoLibrary';

function SetCoverButton({handler, title}) {
  return (
    <Tooltip title={title}>
      <IconButton
        color="primary"
        onClick={handler}
      >
        <CheckIcon/>
      </IconButton>
    </Tooltip>
  );
}

SetCoverButton.propTypes = {
  handler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default SetCoverButton;