const style = (theme) => ({
  listItemText: {
    width: '70%',
    flex: '1 1 auto',
    "& span" : {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  preview: {
    width: '20%',
    height: '90px',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid gray',
    marginLeft: theme.spacing.unit * 2,
  },
  linearProgress: {
    width: '100%',
    marginTop: '3px',
  },
  greenBar: {
    backgroundColor: 'green',
  },
  redBar: {
    backgroundColor: 'red',
  }
});
export default style;