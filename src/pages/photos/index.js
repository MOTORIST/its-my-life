import React, {Component} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import PhotoGallery from '../../components/photo-gallery';
import {fetchAlbumWithPhotos, fetchPhotos} from '../../actions/photos';

class Photos extends Component {
  componentWillMount() {
    this.loadAlbumWithPhotos();
  }

  loadAlbumWithPhotos() {
    const {album, match, photos, dispatch} = this.props;
    const albumId = +match.params.id;

    if (!albumId) {
      return;
    }

    if (album && photos.size === 0) {
      dispatch(fetchPhotos(albumId));
    } else if(!album && photos.size === 0) {
      dispatch(fetchAlbumWithPhotos(albumId));
    }
  }

  render() {
    const {match, photos, album} = this.props;
    //console.log('---- photos', photos);
    //console.log('---- photos arry', photos.valueSeq().toJS());

    return (
      <PhotoGallery
        albumId={+match.params.id}
        album={album}
        photos={photos.valueSeq().toJS()}
      />
    );
  }
}

const mapStateToProps = (state, ownProp) => {
  const albumId = +ownProp.match.params.id;
  return {
    album: state.albums.getIn(['entities', albumId]),
    photos: state.photos.get('entities').filter(photo => photo.albumId === albumId),
  };
};

export default compose(
  connect(mapStateToProps),
)(Photos);