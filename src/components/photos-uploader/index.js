import React from 'react';
import PropTypes from 'prop-types';
import {OrderedMap} from 'immutable';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import style from './style';
import PhotosUploaderItem from '../photos-uploader-item';
import {clearPhotosInStore} from '../../actions/photos-upload';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import IconClose from '@material-ui/icons/Close';
import IconClearAll from '@material-ui/icons/ClearAll';
import IconCloudUpload from '@material-ui/icons/CloudUpload';
import Tooltip from '@material-ui/core/Tooltip';

PhotosUploader.propTypes = {
  photosUpload: PropTypes.instanceOf(OrderedMap).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleCloseDrawer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

function PhotosUploader({photosUpload, isOpen, handleCloseDrawer, classes, dispatch}) {
  const handleClearPhotos = () => {
    dispatch(clearPhotosInStore());
    //handleCloseDrawer();
  };

  const fileList = (() => {
    if(photosUpload.size === 0) {
      return null;
    }

    let list = [];

    photosUpload.reverse().forEach(file => {
      list.push(<PhotosUploaderItem key={file.id} file={file}/>);
    });

    return <List className={classes.list}>{list}</List>;
  })();

  const notPhotos = (
    <div style={{justifyContent: 'center', display: 'flex'}}>
      <IconCloudUpload style={{fontSize: '72px', padding: '10px', color: 'gray'}} />
    </div>
  );

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={handleCloseDrawer}
      classes={{
        paper: classes.paper,
      }}
    >
      <div className={classes.wrapper}>
        <Typography className={classes.title} variant="h6">
          Uploading files...
        </Typography>
        <div className={classes.actionsRight}>
          <Tooltip title="Clear uploader">
            <IconButton onClick={handleClearPhotos} aria-label="Clear uploader">
              <IconClearAll />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={handleCloseDrawer} aria-label="Close">
              <IconClose />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Divider/>
      {photosUpload.size ? fileList : notPhotos}
    </Drawer>
  );
}

const mapStateToProps = (state)=> {
  return {
    photosUpload: state.photosUpload.entities,
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(style)
)(PhotosUploader);