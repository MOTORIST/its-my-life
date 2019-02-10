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
import Tooltip from '@material-ui/core/Tooltip';
import history from '../../history';
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

function handleToProfileEditPage() {
  history.push('/profile-edit');
}

function Profile({user, classes}) {
  if (!user.isAuth) {
    history.push('/sign-in');
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={3} md={3}>
          <Card classes={{root: classes.card}}>
            <CardActionsTop show>
              <Tooltip title="Edit profile">
                <IconButton
                  color="primary"
                  onClick={handleToProfileEditPage}
                >
                  <EditIcon/>
                </IconButton>
              </Tooltip>
            </CardActionsTop>

            <CardContent classes={{
              root: classes.cardContent,
            }}>
              <UserIcon className={classes.userIcon}/>
              <Typography className={classes.textUserName} variant="h5" gutterBottom>
                {user.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Profile);