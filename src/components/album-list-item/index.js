import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CardActionsTop from '../card-actions-top';
import history from '../../history';
import {formatDate} from '../../helpers/dates';
import {deleteAlbum} from '../../actions/albums';
import DialogConfirmation from '../dialog-confirmation';
import DeleteButton from '../shared/buttons/deleteButton';
import EditButton from '../shared/buttons/editButton';

class AlbumListItem extends Component {
  state = {
    openDialogConfirm: false,
  };

  handleToGallery = (id) => {
    history.push(`/albums/${id}`);
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleOnKeyDownEnterButton);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleOnKeyDownEnterButton);
  }

  handleOnKeyDownEnterButton = (e) => {
    if(this.state.openDialogConfirm && e.keyCode === 13) {
      this.handleDeleteAlbum();

      this.setState({
        openDialogConfirm: false,
      });
    }
  };

  handleEditAlbum = (e) => {
    e.stopPropagation();
    const {album, openDialogAddAlbum} = this.props;
    openDialogAddAlbum(e, album.id);
  };

  handleDeleteAlbum = () => {
    const {dispatch, album} = this.props;
    dispatch(deleteAlbum(album.id));
  };

  handleConfirm = (e) => {
    e.stopPropagation();
    this.setState({
      openDialogConfirm: true,
    });
  };

  handleCloseConfirm = (value) => {
    if(value) {
      this.handleDeleteAlbum(value);
    }

    this.setState({
      openDialogConfirm: false,
    });
  };

  render() {
    const {album, user, classes} = this.props;
    return (
      <Card onClick={() => this.handleToGallery(album.id)} className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={album.cover ? album.cover : '/image-not-found.jpg'}
          title={album.title}
        />
        <CardContent>
          <Typography variant="h6">
            {album.title}
          </Typography>
          <Typography color="textSecondary">
            {album.country} | {album.city}
          </Typography>
        </CardContent>
        <Divider/>
        <CardActions>
          <DateRangeIcon/><Typography color="textSecondary">{formatDate(album.date)}</Typography>
        </CardActions>

        <CardActionsTop show={user.isAuth}>
          <DeleteButton handler={this.handleConfirm} title="Delete album"/>
          <EditButton handler={this.handleEditAlbum} title="Edit album"/>
        </CardActionsTop>

        <DialogConfirmation
          open={this.state.openDialogConfirm}
          onClose={this.handleCloseConfirm}
          title="Are you sure?"
          text="You want to delete a album?"
        />
      </Card>
    );
  }
}

AlbumListItem.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    cover: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    isAuth: PropTypes.bool.isRequired,
  }).isRequired,
  openDialogAddAlbum: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  connect((state) => ({
    user: state.user.toJS(),
  })),
  withStyles(styles),
)(AlbumListItem);