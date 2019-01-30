import React from 'react';
import Typography from '@material-ui/core/Typography';
import AlbumsList from '../../components/albums-list';

function Albums() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Albums</Typography>
      <AlbumsList/>
    </div>
  );
}

export default Albums;