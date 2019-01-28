import React, {Component} from 'react';
import {compose} from 'recompose';
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {renderTextField} from '../../helpers/form';
import {Field, reduxForm} from 'redux-form/immutable';
import {withRouter} from 'react-router-dom';
import {resetPassword} from '../../actions/user';
import styles from './styles';

const validate = (values) => {
  const password = values.get('password');
  const passwordConfirmation = values.get('password_confirmation');
  const errors = [];
  const requiredFields = [
    'token',
    'password',
    'password_confirmation',
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
  const token = values.get('token');
  const password = values.get('password');
  const password_confirmation = values.get('password_confirmation');

  dispatch(resetPassword(token, password, password_confirmation));
};

class ResetPasswordForm extends Component {
  componentDidMount() {
    const {initialize, match} = this.props;

    initialize({
      token: match.params.token,
    });
  }

  render() {
    const {handleSubmit, pristine, submitting, classes} = this.props;

    return (
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader title="Reset password" />
          <CardContent>
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
          <CardActions classes={{root: classes.actions}}>
            <Button disabled={pristine || submitting} type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}


export default compose(
  withStyles(styles),
  withRouter,
  reduxForm({
    form: 'ResetPasswordForm',
    validate,
    onSubmit: submit,
  }),
)(ResetPasswordForm);