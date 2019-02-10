const styles = theme => ({
  wrapperPhoto: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    height: '100%',
    textAlign: 'center',
  },
  photo: {
    maxWidth: '100%',
    userSelect: 'none',
    maxHeight: '90vh',
  },
  prevButton: {
    alignSelf: 'stretch',
  },
  nextButton: {
    alignSelf: 'stretch',
  },
  preLoaderImage: {
    textAlign: 'center',
  },
  swipe: {
    width: '100%',
  }
});
export default styles;