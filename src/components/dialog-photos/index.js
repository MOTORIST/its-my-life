import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Swipe from '../swipe';
import {isMobileOrTablet} from '../../helpers/mobile-detect';
import PreloadImage from '../preload-image';

class DialogPhotos extends Component {
  isMobile = false;

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDownRightButton);
    window.addEventListener('keydown', this.handleOnKeyDownLeftButton);
    this.isMobile = isMobileOrTablet();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDownRightButton);
    window.removeEventListener('keydown', this.handleOnKeyDownLeftButton);
  }

  handleOnKeyDownRightButton = (e) => {
    const {handleNextPhoto, isNextPhoto} = this.props;

    if (isNextPhoto && e.keyCode === 39) {
      handleNextPhoto();
    }
  };

  handleOnKeyDownLeftButton = (e) => {
    const {handlePrevPhoto, isPrevPhoto} = this.props;

    if (isPrevPhoto && e.keyCode === 37) {
      handlePrevPhoto();
    }
  };

  handleOnSwipeLeft = () => {
    const {handleNextPhoto, isNextPhoto} = this.props;

    if (isNextPhoto) {
      handleNextPhoto();
    }
  };

  handleOnSwipeRight = () => {
    const {handlePrevPhoto, isPrevPhoto} = this.props;

    if (isPrevPhoto) {
      handlePrevPhoto();
    }
  };

  handleOnSwipeDown = () => {
    this.props.handleClose();
  };

  render() {
    const {isOpen, currentPhoto, handleClose, handlePrevPhoto, handleNextPhoto, isPrevPhoto, isNextPhoto, classes} = this.props;

    const renderButtonPrev = !this.isMobile ? (
      <Button
        disabled={!isPrevPhoto}
        onClick={handlePrevPhoto}
        className={classes.prevButton}
      >
        Prev
      </Button>
    ) : null;

    const renderButtonNext = !this.isMobile ? (
      <Button
        disabled={!isNextPhoto}
        onClick={handleNextPhoto}
        className={classes.nextButton}
      >
        Next
      </Button>
    ) : null;

    const renderButtonClose = !this.isMobile ? (
      <Button onClick={handleClose}>Close</Button>
    ) : null;

    const renderDataPhoto = (() => {
      if (!currentPhoto) {
        return null;
      }

      return (
        <Swipe
          onLeft={this.handleOnSwipeLeft}
          onRight={this.handleOnSwipeRight}
          onDown={this.handleOnSwipeDown}
          className={classes.swipe}
        >
          <PreloadImage image={currentPhoto.image} alt={currentPhoto.title}/>
          <Typography variant="body2" align="center">
            {currentPhoto.title}
          </Typography>
        </Swipe>
      );
    })();

    return (
      <Dialog open={isOpen} onClose={handleClose} fullScreen>
        {renderButtonClose}

        <div className={classes.wrapperPhoto}>
          {renderButtonPrev}
          {renderDataPhoto}
          {renderButtonNext}
        </div>
      </Dialog>
    );
  }
}

const photoPropType = PropTypes.shape({
  id: PropTypes.number,
  albumId: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  thumbWidth: PropTypes.number,
  thumbHeight: PropTypes.number,
});

DialogPhotos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentPhoto: photoPropType,
  handleClose: PropTypes.func.isRequired,
  handlePrevPhoto: PropTypes.func.isRequired,
  handleNextPhoto: PropTypes.func.isRequired,
  isPrevPhoto: PropTypes.bool.isRequired,
  isNextPhoto: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogPhotos);