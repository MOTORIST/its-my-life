import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import uniqid from 'uniqid';
import {addPhotoToList, uploadPhotos} from '../../actions/photos-upload';

PhotosUploaderButton.propTypes = {
  albumId: PropTypes.number.isRequired,
  handleLoadFile: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  maxFileSizeKb: PropTypes.number,
  className: PropTypes.string,
};

PhotosUploaderButton.defaultProps = {
  maxFileSizeKb: 3000,
};

function PhotosUploaderButton({albumId, maxFileSizeKb, handleLoadFile, className, dispatch}) {
  const handleOnChange = (e) => {
    const files =  e.target.files;
    const data = filesData(files);
    dispatch(uploadPhotos(data));
    handleLoadFile();
  };

  const createThumbnail = (file) => {
    let binaryData = [];
    binaryData.push(file);
    return window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
  };

  const formattedPhoto = (id, file) => {
    const thumbnail = createThumbnail(file);

    let data = {
      id: id,
      fileName: file.name,
      type: file.type,
      fileSize: file.size,
      thumbnail: thumbnail,
      error: false,
    };

    if(!isValidateSize(file.size, maxFileSizeKb)) {
      data = {
        ...data,
        error: true,
        errorMessage: `The file size must not exceed ${maxFileSizeKb} kb.`,
      }
    }

    return data;
  };

  const setFormData = (albumId, file) => {
    const data = new FormData();
    data.append('photo', file);
    data.append('albumId', albumId);
    return data;
  };

  const isValidateSize = (sizeFile, maxSizeKb) => sizeFile < maxSizeKb * 1024;

  const filesData = (files) => {
    let uploadFiles = [];

    for(let i = 0; i < files.length; i++) {
      const id = uniqid();
      const photo = formattedPhoto(id, files[i]);

      dispatch(addPhotoToList(photo));

      if(!photo.error) {
        uploadFiles.push({
          id: id,
          formData: setFormData(albumId, files[i]),
        });
      }
    }

    return uploadFiles;
  };


  return (
    <div className={className}>
      <input
        id="button-load-files"
        style={{display: 'none'}}
        accept="image/*"
        type="file"
        onChange={handleOnChange}
        multiple
      />
      <label htmlFor="button-load-files">
        <Fab component="span" color="secondary">
          <AddIcon/>
        </Fab>
      </label>
    </div>
  );
}

export default compose(connect(), pure)(PhotosUploaderButton);