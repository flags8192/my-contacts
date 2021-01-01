import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import {Route, useHistory} from 'react-router-dom'
import {get} from '../../api/request'
import userAvatarDefault from '../../Images/user.png'
import {useStylesDashboard} from '../../Style/styleDashboard'
import {parseJwt} from '../../utils/utils'
import {version} from '../App/App'
import Contacts from '../Contacts'
import AddContact from '../Contacts/AddContact'
import EditContact from '../Contacts/EditContact'
import Home from '../Home'
import Profile from '../Profile'
import {mainListItems} from './listItems'

export default function Dashboard() {
  let history = useHistory()
  const classes = useStylesDashboard()
  const [open, setOpen] = React.useState(true)
  const [anchorElement, setAnchorElement] = React.useState(null)
  const openMenu = Boolean(anchorElement)
  const [userData, setUserData] = useState({})
  const [ready, setReady] = useState(false)
  const [avatarImage, setAvatarImage] = useState(userAvatarDefault)

  const handleMenu = (event) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('TOKEN_KEY')
    setAnchorElement(null)
    return history.push('/login')
  }

  const handleProfile = () => {
    setAnchorElement(null)
    return history.push('/dashboard/profile')
  }

  useEffect(() => {
    let {id} = parseJwt()
    get('/api/profile/id/' + id).then((response) => {
      setUserData(response.data)
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (ready) {
      userData.avatars
        ? setAvatarImage(
        'http://127.0.0.1:5000/images/' +
        userData._id +
        '/' +
        userData.avatars
        )
        : setAvatarImage(userAvatarDefault)
    }
  }, [ready, userData.avatars, userData._id])

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {`Мои контакты `}
            <Chip label={version}/>
          </Typography>
          <div className={classes.appBarUser}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.user}
            >
              {ready ? userData.firstName + ' ' + userData.lastName : ''}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar className={classes.avatar} src={avatarImage} alt=""/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElement}
              getContentAnchorEl={null}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              transformOrigin={{vertical: 'top', horizontal: 'center'}}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Мой профиль</MenuItem>
              <Divider/>
              <MenuItem onClick={handleLogout}>Выход</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            <Route path="/dashboard" component={Home} exact/>
            <Route path="/" component={Home} exact/>
            <Route path="/dashboard/profile" component={Profile} exact/>
            <Route path="/dashboard/contacts" component={Contacts} exact/>
            <Route path="/dashboard/contacts/add" component={AddContact} exact/>
            <Route path='/dashboard/contacts/edit/:id' component={EditContact} exact/>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
