import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Masonry from 'react-masonry-component';
import VisibilitySensor from 'react-visibility-sensor';
import {fetchPhotos} from '../../actions/photos';
import PhotoMasonryItem from '../photo-masonry-item';
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
  };

  componentDidMount() {
    window.addEventListener("resize", this.calculateWidthItem);
    this.calculateWidthItem();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateWidthItem);
  }

  setContainerRef = conteiner => this.containerRef = conteiner;

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
    const {photos, handleOpenDialog, isAuth, classes} = this.props;
    let items = [];

    photos.forEach((photo, index) => {
      items.push(
        <PhotoMasonryItem
          key={photo.id}
          photo={photo}
          width={this.state.widthItem}
          isAuth={isAuth}
          onClick={(e) => handleOpenDialog(e, index)}
        />
      );
    });

    return (
      <div ref={this.setContainerRef} className={classes.root}>
        <Masonry options={this.masonryOptions()}>
            {items}
          </Masonry>
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