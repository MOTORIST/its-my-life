import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login as loginAction, logoutSuccess} from '../../actions/user';
import {compose} from 'recompose';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';
import history from '../../history';
import {renderTextField} from '../../helpers/form';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Field, reduxForm} from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const submit = (values, dispatch) => {
  const email = values.get('email');
  const password = values.get('password');
  dispatch(loginAction(email, password));
};

const validate = (values) =>  {
  const email = values.get('email');
  const reg =  /\S+@\S+\.\S+/;
  const errors = [];
  const requiredFields = [
    'email',
    'password',
  ];

  if(!email) {
    errors['email'] = 'Field email is required.';
  }

  if(email && !reg.test(String(email).toLowerCase())) {
    errors['email'] = 'Email is not valid.';
  }

  requiredFields.forEach((field) => {
    if(!values.get(field)) {
      errors[field] = 'Field is required.';
    }
  });

  return errors;
};

class SignInForm extends Component {
  classes = this.props.classes;

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(logoutSuccess());
  }

  handleGoToForgetPassword = () => {
    history.push('/forgot-password');
  };

  render() {
    const {handleSubmit, pristine, submitting, valid} = this.props;

    return (
      <Card className={this.classes.card}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <CardHeader title="Sign In" />
          <CardContent>
              <Field
                name="email"
                component={renderTextField}
                label="Email"
                type="email"
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
                required
                fullWidth
              />
            <div className={this.classes.linkForgotPassword}>
              <Link component="button" type="button" variant="body1" onClick={this.handleGoToForgetPassword}>Forgot password?</Link>
            </div>
          </CardContent>
          <CardActions>
            <Button
              disabled={pristine || submitting || !valid}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth>
              Sign in
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

SignInForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'SignInForm',
    validate,
    onSubmit: submit,
  }),
  withStyles(styles)
)(SignInForm);