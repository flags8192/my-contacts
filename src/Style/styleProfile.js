export const StylesProfile = (theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: 0,
    fontWeight: 500,
  },
  description: {
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 5,
  },
  quote: {
    marginTop: 10,
  },
  card: {
    borderRadius: 12,
    textAlign: 'center',
    margin: theme.spacing(2, 2),
  },
  cardEdit: {
    borderRadius: 12,
    textAlign: 'center',
    margin: theme.spacing(2, 2),
  },
  cardEditHeader: {
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 'auto',
    border: '3px solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: 'white',
  },
  inputUploadAvatar: {
    display: 'none',
  },
  errorSpan: {
    color: 'red',
    marginBottom: '10px',
  },
  author: {
    marginTop: '-177px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
