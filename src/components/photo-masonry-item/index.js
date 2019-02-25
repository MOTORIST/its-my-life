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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/PhotoLibrary';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {deletePhoto} from '../../actions/photos';
import {setCover} from '../../actions/albums';

class PhotoMasonryItem extends Component {
  state = {
    openDialogConfirm: false,
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

  handleConfirm = (e) => {
    e.stopPropagation();
    this.setState({
      openDialogConfirm: true,
    });
  };

  handleCloseConfirm = (value) => {
    if(value) {
      this.deletePhoto();
    }

    this.setState({
      openDialogConfirm: false,
    });
  };

  deletePhoto = () => {
    const {photo, dispatch} = this.props;
    dispatch(deletePhoto(photo.id));
  };

  handleEditPhoto = (e) => {
    e.stopPropagation();
    const {handleEditPhoto, photo} = this.props;
    handleEditPhoto(photo.id);
  };

  render() {
    const {photo, isShowActions, classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={photo.thumbnail}
          title={photo.title}
          style={{
            height: photo.thumbHeight,
          }}
        />
        <CardActionsTop show={isShowActions}>
          <Tooltip title="Delete photo">
            <IconButton onClick={this.handleConfirm}>
              <DeleteIcon className={classes.buttonRed}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Set album cover">
            <IconButton
              color="primary"
              onClick={this.handleSetAlbumCover}
            >
            <CheckIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit photo">
            <IconButton
              color="primary"
              onClick={this.handleEditPhoto}
            >
              <EditIcon/>
            </IconButton>
          </Tooltip>
        </CardActionsTop>
        <DialogConfirmation
          open={this.state.openDialogConfirm}
          onClose={this.handleCloseConfirm}
          title="Are you sure?"
          text="You want to delete a photo?"
        />
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
  isShowActions: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  connect(),
  withStyles(style),
  pure,
)(PhotoMasonryItem);