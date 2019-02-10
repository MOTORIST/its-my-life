const style = () => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '3px 3px 10px -2px rgba(0, 0, 0, .5)',
    },
  },
  media: {
    backgroundColor: 'gray',
  },
  buttonRed: {
    color: 'red',
  },
});

export default style;