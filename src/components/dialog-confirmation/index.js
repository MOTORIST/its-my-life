import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

DialogConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
};

function DialogConfirmation({open, value, onClose, title, text, ...other}) {
  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  const handleOnClose = () => {
    onClose(false);
  };

  const handleOnClickDialog = (e) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      onClick={handleOnClickDialog}
      open={open}
      onClose={handleOnClose}
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleOk}>
          Ok
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmation;