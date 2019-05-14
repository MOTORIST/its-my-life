import React, {useEffect} from 'react';
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

function DialogConfirmation({open, onClose, title, text, ...other}) {

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  const handleOnClose = () => {
    onClose(false);
  };

  const handleOnKeyDownEnterButton = (e) => {
    if (open && e.keyCode === 13) {
      onClose(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleOnKeyDownEnterButton);

    return () => {
      window.removeEventListener('keydown', handleOnKeyDownEnterButton);
    };
  });

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth="xs"
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOk}
        >
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