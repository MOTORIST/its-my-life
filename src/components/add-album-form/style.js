const style = (theme) => ({
  rowForm: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  textField: {
    marginRight: theme.spacing.unit,
    '&:last-child': {
      marginRight: 0,
    },
  },
});
export default style;