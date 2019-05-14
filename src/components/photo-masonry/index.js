import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Masonry from 'react-masonry-component';
import VisibilitySensor from 'react-visibility-sensor';
import {deletePhoto, fetchPhotos} from '../../actions/photos';
import PhotoMasonryItem from '../photo-masonry-item';
import DialogEditPhoto from '../dialog-edit-photo';
import DialogConfirmation from '../dialog-confirmation';
import config from '../../config';

const style = (theme) => ({
  root: {
    marginLeft: theme.spacing.unit * 2,
  },
});

class PhotoMasonry extends Component {
  classes = this.props.classes;

  state = {
    widthItem: config.MASONRY_ITEM_WIDTH,
    defaultWidthItem: config.MASONRY_ITEM_WIDTH,
    isOpenDialogAddAlbum: false,
    openDialogEditPhoto: false,
    editPhotoId: null,
    openDialogConfirm: false,
    deletePhotoId: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.calculateWidthItem);
    this.calculateWidthItem();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateWidthItem);
  }

  handleLoadMore = (isVisibility) => {
    const {album, dispatch} = this.props;

    if(!album.meta) {
      return;
    }

    const currentPage = album.meta.currentPage;
    const countPages = album.meta.countPages;

    if(isVisibility && currentPage < countPages) {
      const page = currentPage + 1;
      dispatch(fetchPhotos(album.id, page));
    }
  };

  handleEditPhoto = (photoId) => {
    this.setState({
      openDialogEditPhoto: true,
      editPhotoId: photoId,
    });
  };

  handleCloseDialogEditPhoto = () => {
    this.setState({
      openDialogEditPhoto: false,
    });
  };

  handleOpenDialog = (indexPhoto) => {
    this.props.handleOpenDialog(indexPhoto);
  };

  handleDeleteConfirm = (photoId) => {
    this.setState({
      openDialogConfirm: true,
      deletePhotoId: photoId,
    });
  };

  handleCloseDeleteConfirm = (isDelete) => {
    if (isDelete) {
      this.deletePhoto();
    }

    this.setState({
      openDialogConfirm: false,
      deletePhotoId: null,
    });
  };

  deletePhoto = () => {
    const {dispatch} = this.props;
    dispatch(deletePhoto(this.state.deletePhotoId));
  };

  setContainerRef = conteiner => this.containerRef = conteiner;

  calculateWidthItem = () => {
    const margin = this.props.theme.spacing.unit;
    const width = this.containerRef.clientWidth;
    const defaultWidthItem = this.state.defaultWidthItem;
    const countColumn = Math.round(width / (defaultWidthItem + margin * 2));
    const withItem = Math.floor(width / countColumn) - margin * 2;

    this.setState({
      ...this.state,
      widthItem: withItem,
    });
  };

  masonryOptions = () => ({
    transitionDuration: '0.4s',
    gutter: this.props.theme.spacing.unit * 2,
  });

  render() {
    const {photos, isAuth, classes} = this.props;
    let items = [];

    photos.forEach((photo, index) => {
      items.push(
        <PhotoMasonryItem
          key={photo.id}
          photo={photo}
          width={this.state.widthItem}
          isAuth={isAuth}
          onClick={() => this.handleOpenDialog(index)}
          handleEditPhoto={this.handleEditPhoto}
          handleDeleteConfirm={this.handleDeleteConfirm}
        />
      );
    });

    return (
      <div ref={this.setContainerRef} className={classes.root}>
        <Masonry options={this.masonryOptions()}>
          {items}
        </Masonry>

        <VisibilitySensor onChange={this.handleLoadMore}>
          <div>&nbsp;</div>
        </VisibilitySensor>

        {isAuth &&
        <DialogEditPhoto
          isOpen={this.state.openDialogEditPhoto}
          idPhoto={this.state.editPhotoId}
          handleClose={this.handleCloseDialogEditPhoto}
        />
        }

        {isAuth &&
        <DialogConfirmation
          open={this.state.openDialogConfirm}
          value={this.state.deletePhotoId}
          onClose={this.handleCloseDeleteConfirm}
          title="Are you sure?"
          text="You want to delete a photo?"
        />
        }
      </div>
    );
  }
}

PhotoMasonry.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default compose(
  connect(),
  withTheme(),
  withStyles(style),
)(PhotoMasonry);