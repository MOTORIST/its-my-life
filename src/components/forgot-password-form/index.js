import React, {Component} from 'react';
import {compose} from 'recompose';
import history from '../../history';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {renderTextField} from '../../helpers/form';
import {Field, reduxForm} from 'redux-form/immutable';
import {forgotPassword} from '../../actions/user';
import styles from './styles';

const validate = (values) => {
  const errors = [];
  const email = values.get('email');
  const reg =  /\S+@\S+\.\S+/;

  if(!email) {
    errors['email'] = 'Field email is required.';
  }

  if(email && !reg.test(String(email).toLowerCase())) {
    errors['email'] = 'Email is not valid.';
  }

  return errors;
};

const  submit = (values, dispatch) => {
  dispatch(forgotPassword(values.get('email')));
};

class ForgotPasswordForm extends Component {
  handleCancel = () => {
    history.goBack();
  };

  render() {
    const {handleSubmit, pristine, submitting, valid, classes} = this.props;

    return (
      <Card classes={{root: classes.root}}>
        <CardHeader title="Forgot password" />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              margin="normal"
              autoFocus
              required
              fullWidth
            />
          </CardContent>
          <CardActions classes={{root: classes.actions}}>
            <Button onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button disabled={pristine || submitting || !valid} type="submit" variant="contained" color="primary">
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
  reduxForm({
    form: 'ForgotPasswordForm',
    validate,
    onSubmit: submit,
  }),
)(ForgotPasswordForm);
