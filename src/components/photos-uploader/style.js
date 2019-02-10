const style = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    maxHeight: '500px',
    overflowY: 'auto',
  },
  paper: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
  },
  actionsRight: {
    marginLeft: 'auto',
    marginRight: theme.spacing.unit,
  }
});
export default style;