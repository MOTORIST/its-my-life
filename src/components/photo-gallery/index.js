import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import style from './style';
import {fetchPhotos} from '../../actions/photos';
import Typography from '@material-ui/core/Typography';
import PhotoMasonry from '../photo-masonry';
import DialogPhotos from '../dialog-photos';
import PhotosUploader from '../photos-uploader';
import PhotosUploaderButton from '../photos-uploader-button';
import config from '../../config';

class PhotoGallery extends Component {
  classes = this.props.classes;

  state = {
    isOpenDialog: false,
    isOpenDrawer: false,
    currentPhoto: {},
    currentPhotoIndex: null,
    prevPhoto: null,
    nextPhoto: null,
    isLoadedNextPage: false,
  };

  componentWillReceiveProps(nextProps) {
    const currentPhotoIndex = this.state.currentPhotoIndex;
    const photos = nextProps.photos;

    if (currentPhotoIndex && photos.length > this.props.photos.length) {

      const nextPhotoIndex = currentPhotoIndex + 1;

      this.setState({
        ...this.state,
        ...this.setCurrentPhoto(nextPhotoIndex, photos),
        isLoadedNextPage: false,
      });
    }
  }

  isNextPhoto = () => this.state.nextPhoto !== null || this.isNextPage();
  isPrevPhoto = () => this.state.prevPhoto !== null;

  handleOpenDialog = (e, currentPhotoIndex) => {
    const {photos} = this.props;

    this.setState({
      ...this.state,
      ...this.setCurrentPhoto(currentPhotoIndex, photos),
      isOpenDialog: true,
    });
  };

  handleNextPhoto = () => {
    const {dispatch, album, photos} = this.props;
    const nextPhotoIndex = this.state.nextPhoto;

    if (this.state.isLoadedNextPage) {
      return;
    }

    if (nextPhotoIndex === null && this.isNextPage()) {
      const nextPage = album.meta.currentPage + 1;

      this.setState({
        isLoadedNextPage: true,
      });

      dispatch(fetchPhotos(album.id, nextPage));

      return;
    }

    this.setState({
      ...this.state,
      ...this.setCurrentPhoto(nextPhotoIndex, photos),
    });
  };

  handlePrevPhoto = () => {
    const {photos} = this.props;
    const prevPhotoIndex = this.state.prevPhoto;

    this.setState({
      ...this.state,
      ...this.setCurrentPhoto(prevPhotoIndex, photos),
    });
  };

  handleCloseDialog = () => {
    this.setState({
      ...this.state,
      isOpenDialog: false,
    });
  };

  handleLoadFile = () => {
    this.setState({
      ...this.state,
      isOpenDrawer: true,
    });
  };

  handleCloseDrawer = () => {
    this.setState({
      ...this.state,
      isOpenDrawer: false,
    });
  };

  setCurrentPhoto(currentPhotoIndex, photos) {
    return {
      currentPhoto: photos[currentPhotoIndex],
      currentPhotoIndex: currentPhotoIndex,
      prevPhoto: currentPhotoIndex !== 0 ? currentPhotoIndex - 1 : null,
      nextPhoto: currentPhotoIndex < photos.length - 1 ? currentPhotoIndex + 1 : null,
    }
  }

  isNextPage = () => {
    const {meta} = this.props.album;

    if (!meta) {
      return false;
    }

    return meta.currentPage < meta.countPages;
  };

  render() {
    const {album, photos, user} = this.props;

    if (!album) {
      return null;
    }

    const title = (<Typography variant="h4" gutterBottom>{album.title}</Typography>);

    const dialogPhotos = (
      <DialogPhotos
        isOpen={this.state.isOpenDialog}
        handleClose={this.handleCloseDialog}
        handlePrevPhoto={this.handlePrevPhoto}
        handleNextPhoto={this.handleNextPhoto}
        isPrevPhoto={this.isPrevPhoto()}
        isNextPhoto={this.isNextPhoto()}
        currentPhoto={this.state.currentPhoto}
        currentPhotoIndex={this.state.currentPhotoIndex}
      />
    );

    const photosUploader = (
      <PhotosUploader
        isOpen={this.state.isOpenDrawer}
        handleCloseDrawer={this.handleCloseDrawer}
      />
    );

    const photosUploaderButton = (
      <PhotosUploaderButton
        albumId={album.id}
        maxFileSizeKb={config.MAX_SIZE_UPLOAD_FILE}
        className={this.classes.uploadButton}
        handleLoadFile={this.handleLoadFile}
      />
    );

    const photoMasonry = (() => {
      if (photos.length === 0) {
        return;
      }

      return (
        <PhotoMasonry
          album={album}
          photos={photos}
          isAuth={user.isAuth}
          handleOpenDialog={this.handleOpenDialog}
        />
      );
    })();

    const body = (() => {
      if (photos.length === 0 && album.isFetchPhotos) {
        return <Typography variant="body2" gutterBottom>There are no photos in this album.</Typography>;
      }

      return (
        <React.Fragment>
          {photoMasonry}
          {dialogPhotos}
        </React.Fragment>
      );
    })();

    return (
      <React.Fragment>
        {title}
        {body}
        {user.isAuth && photosUploaderButton}
        {photosUploader}
      </React.Fragment>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    loader: state.common.loader,
    user: state.user,
  }
};

const albumPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

const photoPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  albumId: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  thumbWidth: PropTypes.number.isRequired,
  thumbHeight: PropTypes.number.isRequired,
  title: PropTypes.string,
});

PhotoGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  albumId: PropTypes.number.isRequired,
  album: PropTypes.oneOfType([PropTypes.number, albumPropType]),
  photos: PropTypes.arrayOf(photoPropType),
  //totalPhotos: PropTypes.number.isRequired,
};

export default compose(
  connect(mapStateTopProps),
  withStyles(style)
)(PhotoGallery);
