import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import style from './style';
import {submit} from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddAlbumFrom from '../add-album-form';

DialogAddAlbum.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  idAlbum: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function DialogAddAlbum({isOpen, idAlbum, handleClose, classes, dispatch, width}) {
  return (
    <Dialog fullScreen={isWidthDown('xs', width)} open={isOpen}>
      <DialogTitle>{idAlbum ? 'Edit album' : 'Add album'}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <AddAlbumFrom idAlbum={idAlbum} closeDialog={handleClose}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => dispatch(submit('AddAlbum'))}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose(
  connect(),
  withStyles(style),
  withWidth(),
)(DialogAddAlbum);
