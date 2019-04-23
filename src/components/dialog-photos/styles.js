const colorText = 'white';

const styles = theme => ({
  wrapperPhoto: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    height: '100%',
    textAlign: 'center',
    userSelect: 'none',
  },
  prevButton: {
    color: colorText,
    alignSelf: 'stretch',
  },
  nextButton: {
    color: colorText,
    alignSelf: 'stretch',
  },
  closeButton: {
    color: colorText,
  },
  topSideBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
  },
  title: {
    margin: '0 auto',
    color: colorText,
    justifyContent: 'center',
  },
  counter: {
    color: colorText,
    margin: `auto ${theme.spacing.unit * 2}px`,
  },
  photoExif: {
    color: colorText,
  },
  preLoaderImage: {
    textAlign: 'center',
  },
  swipe: {
    width: '100%',
  },
});
export default styles;