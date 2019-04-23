import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

/**
 *
 * @param data
 * @param otherProps
 * @returns {*}
 * @constructor
 */
function PhotoExifMeta({data, ...otherProps}) {
  if (!data) {
    return null;
  }

  const camera = (() => {
    if (!data.camera) {
      return '';
    }

    return `Camera ${data.camera}`;
  })();

  const aperture = (() => {
    if (!data.aperture) {
      return '';
    }

    return data.aperture;
  })();

  const focalLength = (() => {
    if (!data.focalLength) {
      return '';
    }

    return `${data.focalLength}mm`;
  })();

  const exposure = (() => {
    if (!data.exposure) {
      return '';
    }

    return `${data.exposure}s`;
  })();

  const iso = (() => {
    if (!data.iso) {
      return '';
    }

    return `ISO ${data.iso}`;
  })();

  const meta = (() => {
    return `${camera} ${aperture} ${focalLength} ${exposure} ${iso}`;
  })();

  return (
    <Typography variant="body2" align="center" {...otherProps}>
      {meta}
    </Typography>
  );
}

const exifPropType = PropTypes.shape({
  camera: PropTypes.string,
  aperture: PropTypes.string,
  focalLength: PropTypes.number,
  exposure: PropTypes.string,
  iso: PropTypes.number,
});

PhotoExifMeta.propTypes = {
  data: exifPropType,
};

export default PhotoExifMeta;