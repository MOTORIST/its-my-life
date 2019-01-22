import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {snackbarClose} from '../../actions/common';
import Snackbar from '@material-ui/core/Snackbar';
import CommonSnackbarContent from '../common-snackbar-content';

CommonSnackbar.propTypes = {
  snackbar: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      vertical: PropTypes.string.isRequired,
      horizontal: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']).isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function CommonSnackbar({snackbar: {open, settings}, dispatch}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(snackbarClose());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: settings.vertical,
        horizontal: settings.horizontal,
      }}
      open={open}
      autoHideDuration={settings.duration}
      onClose={handleClose}
    >
      <CommonSnackbarContent
        onClose={handleClose}
        variant={settings.variant}
        message={settings.message}
      />
    </Snackbar>
  );
}

export default compose(
  connect((state) => ({
    snackbar: state.common.snackbar.toJS(),
  })),
)(CommonSnackbar);