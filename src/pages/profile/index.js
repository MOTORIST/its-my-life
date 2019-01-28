import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionsTop from '../../components/card-actions-top';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import UserIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../history';

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
  }).isRequired,
};

function handleToProfileEditPage() {
  history.push('/profile-edit');
}

function Profile({user}) {
  if(!user.isAuth) {
    history.push('/sign-in');
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Profile</Typography>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={3} md={3}>
          <Card style={{position: 'relative'}}>
            <CardActionsTop show>
              <Tooltip title="Edit profile">
                <IconButton
                  color="primary"
                  onClick={handleToProfileEditPage}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </CardActionsTop>

            <CardContent style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 184, 212)',
              color: 'white',
            }}>
              <UserIcon style={{fontSize: '150px'}}/>
              <Typography variant="h5" gutterBottom style={{color: 'white'}}>
                {user.name}
              </Typography>
            </CardContent>

            <Divider />

            <CardContent>
              <Typography variant="body1">
                Description
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.toJS(),
});

export default connect(mapStateToProps)(Profile);