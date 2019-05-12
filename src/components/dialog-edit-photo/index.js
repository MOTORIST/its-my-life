import React, {Component} from 'react';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import style from './style';
import withWidth, {isWidthDown} from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {renderSwitch, renderTextField} from '../../helpers/form';
import {Field, reduxForm} from 'redux-form/immutable';
import {editPhoto} from '../../actions/photos';

const submit = (values, dispatch, props) => {
  dispatch(editPhoto(props.idPhoto, values));
  props.handleClose();
};

class DialogEditPhoto extends Component{

  handleOnClickDialog = (e) => {
    e.stopPropagation();
  };

  render() {
    const {isOpen, handleClose, width, handleSubmit, pristine, submitting, classes} = this.props;

    return (
      <Dialog
        fullScreen={isWidthDown('xs', width)}
        open={isOpen}
        onClose={handleClose}
        onClick={this.handleOnClickDialog}
      >
        <form onSubmit={handleSubmit} className={classes.formEditPhoto}>
          <DialogTitle>Edit photo</DialogTitle>
          <DialogContent>
            <Field
              name="status"
              label="Active"
              component={renderSwitch}
            />
            <Field
              name="title"
              component={renderTextField}
              label="Title"
              margin="normal"
              multiline
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={pristine || submitting}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: state.photos.getIn(['entities', ownProps.idPhoto]),
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'EditPhoto',
    onSubmit: submit,
    enableReinitialize: true,
  }),
  withStyles(style),
  withWidth(),
)(DialogEditPhoto);