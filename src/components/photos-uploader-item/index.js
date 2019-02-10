import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import style from './style';
import {fileSize} from '../../helpers/files';

PhotosUploaderItem.propTypes = {
  file: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    status: PropTypes.bool,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

function PhotosUploaderItem({file, classes}) {
  const errorMessage = <Typography variant="body1" color="error">{file.errorMessage}</Typography>;
  
  return (
    <ListItem style={{flexWrap: 'wrap'}}>
      <div className={classes.listItemText}>
        <ListItemText
          primary={`File name: ${file.fileName}`}
          secondary={`Size: ${fileSize(file.fileSize)} Type: ${file.type}`}
        />
        {file.error && errorMessage}
      </div>
      <div
        className={classes.preview}
        style={{backgroundImage: `url(${file.thumbnail})`,}}
      />
      <LinearProgress
        className={classes.linearProgress}
        color="primary"
        classes={{
          bar: !file.status ? classes.redBar : null,
        }}
        variant="determinate"
        value={file.progress}
      />
    </ListItem>
  );
}

export default compose(
  pure,
  withStyles(style),
)(PhotosUploaderItem);