import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import SignInForm from '../../components/sign-in-form';

const  styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SignIn({classes}) {
  return (
    <div className={classes.root}>
      <SignInForm/>
    </div>
  );
}

export default withStyles(styles)(SignIn);