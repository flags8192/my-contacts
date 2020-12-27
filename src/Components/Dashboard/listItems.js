import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ContactsIcon from '@material-ui/icons/Contacts'
import HomeIcon from '@material-ui/icons/Home'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import React from 'react'
import {Link} from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/dashboard'>
      <ListItemIcon>
        <HomeIcon/>
      </ListItemIcon>
      <ListItemText primary='Главная'/>
    </ListItem>
    <ListItem button component={Link} to='/dashboard/contacts'>
      <ListItemIcon>
        <ContactsIcon/>
      </ListItemIcon>
      <ListItemText primary='Контакты'/>
    </ListItem>
    <ListItem button component={Link} to='/dashboard/contacts/add'>
      <ListItemIcon>
        <PersonAddIcon/>
      </ListItemIcon>
      <ListItemText primary='Добавить контакт'/>
    </ListItem>
  </div>
)
