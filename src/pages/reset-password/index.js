import React from 'react';
import ResetPasswordForm from '../../components/reset-password-form';
import {withStyles} from '@material-ui/core/styles';

const  styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ResetPassword({classes}) {
  return (
    <div className={classes.root}>
      <ResetPasswordForm />
    </div>
  );
}

export default withStyles(styles)(ResetPassword);