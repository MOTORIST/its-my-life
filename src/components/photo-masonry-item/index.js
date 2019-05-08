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
import DeleteButton from './deleteButton';
import SetCoverButton from './setCoverButton';
import EditButton from './editButton';
import DialogEditPhoto from '../dialog-edit-photo';

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

  render() {
    const {photo, isAuth, classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={photo.thumbnail}
          title={photo.title}
          style={{height: photo.thumbHeight}}
        />

        <CardActionsTop show={isAuth}>
          <DeleteButton handler={this.handleDeleteConfirm}/>
          <SetCoverButton handler={this.handleSetAlbumCover}/>
          <EditButton handler={this.handleEditPhoto}/>
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
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  connect(),
  withStyles(style),
  pure,
)(PhotoMasonryItem);