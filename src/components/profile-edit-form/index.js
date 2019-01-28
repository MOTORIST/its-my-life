import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import history from '../../history';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {renderTextField} from '../../helpers/form';
import {Field, reduxForm} from 'redux-form/immutable';
import {editUser, fetchUser} from '../../actions/user';
import styles from './styles';

const validate = (values) => {
  const password = values.get('password');
  const passwordConfirmation = values.get('password_confirmation');
  const errors = [];
  const requiredFields = [
    'name',
    'email',
  ];

  requiredFields.forEach((field) => {
    if(!values.get(field)) {
      errors[field] = 'Field is required.';
    }
  });

  if(password && !passwordConfirmation) {
    errors['password_confirmation'] = 'Field "Password confirm" is required.';
  }

  if(password && passwordConfirmation && password !== passwordConfirmation) {
    errors['password_confirmation'] = 'Please check that you\'ve entered and confirmed your password.';
  }

  return errors;
};

const submit = (values, dispatch) => {
  dispatch(editUser(values));
};

class ProfileEditForm extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchUser());
  }

  handleCancel = () => {
    history.goBack();
  };

  render() {
    const {handleSubmit, pristine, submitting, classes} = this.props;

    return (
      <Card className={classes.root}>
        <form onSubmit={handleSubmit}>
          <CardContent>
              <Field
                name="name"
                component={renderTextField}
                label="Name"
                margin="normal"
                required
                fullWidth
              />
              <Field
                name="email"
                component={renderTextField}
                label="Email"
                margin="normal"
                required
                fullWidth
              />
              <Field
                name="password"
                component={renderTextField}
                label="Password"
                type="password"
                margin="normal"
                fullWidth
              />
              <Field
                name="password_confirmation"
                component={renderTextField}
                label="Password confirm"
                type="password"
                margin="normal"
                fullWidth
              />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button disabled={pristine || submitting} type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.user,
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({
    form: 'EditProfileForm',
    enableReinitialize: true,
    validate,
    onSubmit: submit,
  })
)(ProfileEditForm);