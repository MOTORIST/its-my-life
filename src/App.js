import React, { Component } from 'react';
import Router from './router';
import withRoot from './theme';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ContentBlock from './components/content-block';
import Loader from './components/loader';
import TopMenu from './components/top-menu';
import CommonSnackbar from './components/common-snackbar';
import styles from './styles';

class App extends Component {
  classes = this.props.classes;

  render() {
    return (
      <div className={this.classes.root}>
        <Loader/>
        <AppBar className={this.classes.appBar}>
          <Toolbar>
            <Typography className={this.classes.logo} variant="h6" color="inherit">
              It's my life!
            </Typography>
            <TopMenu/>
          </Toolbar>
        </AppBar>
        <ContentBlock>
          <Router/>
        </ContentBlock>
        <CommonSnackbar/>
      </div>
    );
  }
}

export default withRoot(
  compose(
    withStyles(styles),
  )(App)
);
