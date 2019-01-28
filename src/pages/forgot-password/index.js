import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ForgotPasswordForm from '../../components/forgot-password-form';

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ForgotPassword({classes}) {
  return (
    <div className={classes.root}>
      <ForgotPasswordForm/>
    </div>
  );
}

export default withStyles(styles)(ForgotPassword);