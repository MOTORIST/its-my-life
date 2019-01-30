import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Field, reduxForm} from 'redux-form/immutable';
import {withStyles} from '@material-ui/core/styles';
import style from './style';
import {renderSwitch, renderTextField} from '../../helpers/form';
import {addAlbum, editAlbum} from '../../actions/albums';
import {AlbumRecord} from '../../reducers/albums';

const validate = (values) => {
  const errors = [];
  const requiredFields = [
    'title',
    'active',
    'date',
    'country',
    'city',
  ];

  requiredFields.forEach((field) => {
    if(!values.get(field)) {
      errors[field] = 'Field is required.';
    }
  });

  return errors;
};

const submit = (values, dispatch, props) => {
  if(values) {
    if(props.idAlbum) {
      const album = values.toJS();
      const albumMap = (new Map(album)).delete('cover');
      dispatch(editAlbum(props.idAlbum, albumMap));
    } else {
      dispatch(addAlbum(values));
    }

    props.reset();
    props.closeDialog();
  }
};

class AddAlbumFrom extends Component {
  classes = this.props.classes;

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          component={renderTextField}
          label="Title"
          margin="normal"
          className={this.classes.textField}
          required
          fullWidth
        />
        <Field
          name="status"
          label="Active"
          component={renderSwitch}
        />
        <div className={this.classes.rowForm}>
          <Field
            name="date"
            component={renderTextField}
            label="Date"
            type="date"
            margin="normal"
            pattern="0-9]{4}-[0-9]{2}-[0-9]{2}"
            className={this.classes.textField}
            required
            fullWidth
          />
          <Field
            name="country"
            component={renderTextField}
            label="Country"
            margin="normal"
            className={this.classes.textField}
            required
            fullWidth
          />
          <Field
            name="city"
            component={renderTextField}
            label="City"
            margin="normal"
            className={this.classes.textField}
            required
            fullWidth
          />
        </div>
        <Field
          label="Description"
          component={renderTextField}
          name="description"
          rowsMax="4"
          margin="normal"
          className={this.classes.textField}
          multiline
          fullWidth
        />
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let album = new AlbumRecord();

  if(ownProps.idAlbum) {
    album = state.albums.getIn(['entities', ownProps.idAlbum]);
  }

  return {
    initialValues: album,
  };
};

AddAlbumFrom.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'AddAlbum',
    enableReinitialize: true,
    validate,
    onSubmit: submit,
  }),
  withStyles(style)
)(AddAlbumFrom);
