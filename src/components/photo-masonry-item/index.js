import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionsTop from '../card-actions-top';
import {setCover} from '../../actions/albums';
import DeleteButton from '../shared/buttons/deleteButton';
import EditButton from '../shared/buttons/editButton';
import SetCoverButton from './setCoverButton';
import withTheme from '@material-ui/core/styles/withTheme';

function PhotoMasonryItem({photo, width, isAuth, handleEditPhoto, handleDeleteConfirm, onClick, dispatch, theme, classes}) {

  const handleSetAlbumCover = (e) => {
    e.stopPropagation();
    dispatch(setCover(photo.albumId, photo.id));
  };

  const handleEditPhotoDialog = (e) => {
    e.stopPropagation();
    handleEditPhoto(photo.id);
  };

  const handleDeleteConfirmDialog = (e) => {
    e.stopPropagation();
    e.currentTarget.blur();
    handleDeleteConfirm(photo.id);
  };

  const styleItem = () => {
    return {
      width: `${width}px`,
      height: `${photo.thumbHeight}px`,
      marginBottom: theme.spacing.unit * 2,
    };
  };

  return (
    <Card
      className={classes.card}
      style={styleItem()}
      onClick={onClick}
    >
      <CardMedia
        className={classes.media}
        image={photo.thumbnail}
        title={photo.title}
        style={{height: photo.thumbHeight}}
      />

      <CardActionsTop show={isAuth}>
        <DeleteButton handler={handleDeleteConfirmDialog} title="Delete photo"/>
        <SetCoverButton handler={handleSetAlbumCover} title="Set album cover"/>
        <EditButton handler={handleEditPhotoDialog} title="Edit photo"/>
      </CardActionsTop>
    </Card>
  );
}

PhotoMasonryItem.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    albumId: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbWidth: PropTypes.number.isRequired,
    thumbHeight: PropTypes.number.isRequired,
    title: PropTypes.string,
  }).isRequired,
  width: PropTypes.number.isRequired,
  isAuth: PropTypes.bool.isRequired,
  handleEditPhoto: PropTypes.func.isRequired,
  handleDeleteConfirm: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  connect(),
  withTheme(),
  withStyles(style),
)(PhotoMasonryItem);