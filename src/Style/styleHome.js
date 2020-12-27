import {makeStyles} from '@material-ui/core/styles'

export const useStylesHome = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  heroContent: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))
