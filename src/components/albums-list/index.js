import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {fetchAlbums} from '../../actions/albums';
import AlbumListItem from "../album-list-item";
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DialogAddAlbum from "../dialog-add-album/index";

class AlbumsList extends Component {
  classes = this.props.classes;

  constructor(props) {
    super(props);

    this.state = {
      idAlbum: null,
      isOpenDialogAddAlbum: false,
    };
  }

  componentDidMount() {
    const {isFetching, dispatch} = this.props;
    if(!isFetching) {
      dispatch(fetchAlbums());
    }
  }

  handleOpenDialogAddAlbum = (e, idAlbum = null) => {
    this.setState({
      isOpenDialogAddAlbum: true,
      idAlbum: idAlbum,
    });
  };

  handleCloseDialogAddAlbum = () => {
    this.setState({
      isOpenDialogAddAlbum: false,
    })
  };

  render () {
    const {albums, user} = this.props;

    if(albums.size === 0) {
      return null;
    }

    const list = [];

    albums.forEach(album => {
      list.push(
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={album.id}>
          <AlbumListItem album={album} openDialogAddAlbum={this.handleOpenDialogAddAlbum} />
        </Grid>
      );
    });

    const buttonAddAlbum = (() => {
      if(!user.isAuth) {
        return null;
      }

      return (
        <Fab
          className={this.classes.addAlbumButton}
          color="secondary"
          aria-label="Add"
          onClick={this.handleOpenDialogAddAlbum}
        >
          <AddIcon />
        </Fab>
      );
    })();

    const dialogAddAlbum = (()=> {
      if(!user.isAuth) {
        return null;
      }

      return (
        <DialogAddAlbum
          idAlbum={this.state.idAlbum}
          isOpen={this.state.isOpenDialogAddAlbum}
          handleClose={this.handleCloseDialogAddAlbum}
        />
      );
    })();

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          {list}
        </Grid>
        {buttonAddAlbum}
        {dialogAddAlbum}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.albums.isFetching,
    albums: state.albums.entities,
    user: state.user,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(AlbumsList);