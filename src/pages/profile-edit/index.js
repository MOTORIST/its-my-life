import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProfileEditForm from '../../components/profile-edit-form';

const styles = () => ({
  root: {
    maxWidth: '650px',
  },
});

function ProfileEdit({classes}) {
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>Profile edit</Typography>
      <ProfileEditForm />
    </div>
  );
}

export default withStyles(styles)(ProfileEdit);