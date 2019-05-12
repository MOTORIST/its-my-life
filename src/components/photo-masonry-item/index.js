import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionsTop from '../card-actions-top';
import DialogConfirmation from '../dialog-confirmation';
import {deletePhoto} from '../../actions/photos';
import {setCover} from '../../actions/albums';
import DeleteButton from '../shared/buttons/deleteButton';
import EditButton from '../shared/buttons/editButton';
import SetCoverButton from './setCoverButton';
import DialogEditPhoto from '../dialog-edit-photo';
import withTheme from '@material-ui/core/styles/withTheme';

class PhotoMasonryItem extends Component {
  state = {
    openDialogConfirm: false,
    openDialogEditPhoto: false,
    editPhotoId: null,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDownEnterButton);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDownEnterButton);
  }

  handleOnKeyDownEnterButton = (e) => {
    if(this.state.openDialogConfirm && e.keyCode === 13) {
      this.deletePhoto();

      this.setState({
        openDialogConfirm: false,
      });
    }
  };

  handleSetAlbumCover = (e) => {
    e.stopPropagation();
    const {photo, dispatch} = this.props;
    dispatch(setCover(photo.albumId, photo.id));
  };

  handleDeleteConfirm = (e) => {
    e.stopPropagation();
    this.setState({
      openDialogConfirm: true,
    });
  };

  handleCloseDeleteConfirm = (value) => {
    if(value) {
      this.deletePhoto();
    }

    this.setState({
      openDialogConfirm: false,
    });
  };

  handleEditPhoto = (e) => {
    e.stopPropagation();

    this.setState({
      openDialogEditPhoto: true,
      editPhotoId: this.props.photo.id,
    });
  };

  handleCloseDialogEditPhoto = () => {
    this.setState({
      openDialogEditPhoto: false,
    });
  };

  deletePhoto = () => {
    const {photo, dispatch} = this.props;
    dispatch(deletePhoto(photo.id));
  };

  styleItem = () => {
    const {width, theme, photo} = this.props;

    return {
      width: `${width}px`,
      height: `${photo.thumbHeight}px`,
      marginBottom: theme.spacing.unit * 2,
    };
  };

  render() {
    const {photo, isAuth, classes, onClick} = this.props;

    return (
      <Card
        className={classes.card}
        style={this.styleItem()}
        onClick={onClick}
      >
        <CardMedia
          className={classes.media}
          image={photo.thumbnail}
          title={photo.title}
          style={{height: photo.thumbHeight}}
        />

        <CardActionsTop show={isAuth}>
          <DeleteButton handler={this.handleDeleteConfirm} title="Delete photo"/>
          <SetCoverButton handler={this.handleSetAlbumCover} title="Set album cover"/>
          <EditButton handler={this.handleEditPhoto} title="Edit photo"/>
        </CardActionsTop>

        {isAuth &&
        <DialogConfirmation
          open={this.state.openDialogConfirm}
          onClose={this.handleCloseDeleteConfirm}
          title="Are you sure?"
          text="You want to delete a photo?"
        />
        }

        {isAuth &&
        <DialogEditPhoto
          isOpen={this.state.openDialogEditPhoto}
          idPhoto={this.state.editPhotoId}
          handleClose={this.handleCloseDialogEditPhoto}
        />
        }
      </Card>
    );
  }
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
  isAuth: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default compose(
  connect(),
  withTheme(),
  withStyles(style),
  pure,
)(PhotoMasonryItem);