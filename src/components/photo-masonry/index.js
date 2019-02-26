import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Masonry from 'react-masonry-component';
import VisibilitySensor from 'react-visibility-sensor';
import {fetchPhoto, fetchPhotos} from '../../actions/photos';
import PhotoMasonryItem from '../photo-masonry-item';
import DialogEditPhoto from '../dialog-edit-photo';

const style = (theme) => ({
  masonryItem: {
    margin: theme.spacing.unit,
  },
});

class PhotoMasonry extends Component {
  classes = this.props.classes;

  state = {
    widthItem: 300,
    defaultWidthItem: 300,
    isOpenDialogAddAlbum: false,
    openDialogEditPhoto: false,
    editPhotoId: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.calculateWidthItem();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  setContainerRef = conteiner => this.containerRef = conteiner;

  handleResize = () => this.calculateWidthItem();

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

  handleEditPhoto = (idPhoto) => {
    this.props.dispatch(fetchPhoto(idPhoto));

    this.setState({
      openDialogEditPhoto: true,
      editPhotoId: idPhoto,
    });
  };

  handleCloseDialogEditPhoto = () => {
    this.setState({
      openDialogEditPhoto: false,
    });
  };

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

  render() {
    const {photos, handleOpenDialog, isAuth} = this.props;
    const masonryOptions = {
      transitionDuration: 0,
      gutter: 0,
    };

    let items = [];

    photos.forEach((photo, index) => {
      items.push(
        <div
          key={photo.id}
          className={this.classes.masonryItem}
          style={{
            width: `${this.state.widthItem}px`,
            height: `${photo.thumbHeight}px`,
          }}
          onClick={(e) => handleOpenDialog(e, index)}
        >
          <PhotoMasonryItem
            photo={photo}
            handleEditPhoto={this.handleEditPhoto}
            isShowActions={isAuth}
          />
        </div>
      );
    });

    return (
        <div ref={this.setContainerRef}>
          <Masonry options={masonryOptions}>
            {items}
          </Masonry>
          <DialogEditPhoto
            isOpen={this.state.openDialogEditPhoto}
            idPhoto={this.state.editPhotoId}
            handleClose={this.handleCloseDialogEditPhoto}
          />
          <VisibilitySensor onChange={this.handleLoadMore}><div>&nbsp;</div></VisibilitySensor>
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