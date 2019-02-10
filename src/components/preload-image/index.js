import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

class PreloadImage extends Component {
  state = {
    imageLoaded: false,
    imageError: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({
        imageError: false,
        imageLoaded: false
      })
    }
  }

  handleLoadImage = () => {
    this.setState({
      imageLoaded: true,
    });
  };

  render() {
    const {image, title, classes} = this.props;
    const renderPreloader = (<CircularProgress size={48} color="inherit"/>);

    return (
      <div>
        <img
          style={{display: this.state.imageLoaded ? 'initial' : 'none'}}
          className={classes.img}
          src={image}
          alt={title}
          onLoad={this.handleLoadImage}
        />
        <div className={classes.preloader}>
          {!this.state.imageLoaded && renderPreloader}
        </div>
      </div>
    );
  }
}

PreloadImage.propTypes = {
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(PreloadImage);