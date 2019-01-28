import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import history from '../../history';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {logout} from '../../actions/user';
import Button from '@material-ui/core/Button/Button';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';

class SignInMenu extends Component {
  state = {
    anchorEl: null,
    path: history.location.pathname,
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleToProfile = () => {
    history.push('/profile');
    this.handleClose();
  };

  handleLogout = () => {
    const {dispatch} = this.props;
    this.handleClose();
    dispatch(logout());
  };

  render() {
    const {user: {name, isAuth}} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    history.listen(location => {
      this.setState({path: location.pathname})
    });

    const signIn = (
      <Button
        disabled={this.state.path === '/sign-in'}
        component={({...props}) => <Link to='/sign-in' {...props} />}
        color="inherit">Sign in</Button>
    );

    const logout = (
      <div>
        <Button
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
          {name}
        </Button>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleToProfile}>
            <ListItemIcon >
              <AccountCircle />
            </ListItemIcon>
            <ListItemText inset primary="Profile"/>
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>
            <ListItemIcon >
              <ExitToApp />
            </ListItemIcon>
            <ListItemText inset primary="Logout"/>
          </MenuItem>
        </Menu>
      </div>
    );

    const content = isAuth ? logout : signIn;

    return (
      <div>{content}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.toJS(),
  }
};

SignInMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    isAuth: PropTypes.bool.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps),
)(SignInMenu);