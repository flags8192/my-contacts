import {Avatar, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import {lighten, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import {Edit} from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import MUIDataTable from 'mui-datatables'
import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import {get, remove} from '../../api/request'
import {declOfNumber} from '../../utils/utils'
import Loading from '../Loading'

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MUIDataTable: {
      paper: {
        width: '100%'
      }
    },
    MUIDataTableToolbarSelect: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      title: {
        display: 'none'
      }
    },
  }
})

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  let selected = []

  const newContacts = contacts.map((item, index) =>
    [item._id, index + 1, item.avatars, item.firstName, item.lastName, item.email, item.phone, item.address, item.jobName, `/dashboard/contacts/edit/${item._id}`]
  )

  const columns = [
    {name: '_id', options: {filter: false, display: false, viewColumns: false}},
    {name: '№', options: {filter: true}},
    {
      name: 'Фото',
      options:
        {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (
              value
                ? <Avatar src={'http://localhost:5000/images/' + tableMeta.rowData[0] + '/' + tableMeta.rowData[2]}/>
                :
                <Avatar>{tableMeta.rowData[3].slice(0, 1).toUpperCase()}{tableMeta.rowData[4].slice(0, 1).toUpperCase()}</Avatar>
            )
          }
        }
    },
    {name: 'Имя', options: {filter: true}},
    {name: 'Фамилия', options: {filter: true}},
    {name: 'E-mail', options: {filter: true}},
    {name: 'Телефон', options: {filter: true}},
    {name: 'Место работы', options: {filter: true}},
    {name: 'Должность', options: {filter: true}},
    {
      name: 'Редактировать',
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <Link to={`${value}`}><Edit/></Link>
          )
        },
      }
    }]

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    searchInput: {
      width: '75%'
    },
    title: {
      flex: '1 1 100%',
    },
  }))

  const classes = useToolbarStyles()

  const handleRowClick = async (currentRowsSelected, allRowsSelected, rowsSelected) => {
    const rows = newContacts.map((contacts) => {
      return ({_id: contacts[0], id: contacts[1] - 1})
    })
    selected = rows.filter((element) => rowsSelected.includes(element.id)).map(element => element._id)
  }

  const options = {
    onRowSelectionChange: handleRowClick,
    filterType: 'multiselect',
    responsive: 'vertical',
    setTableProps: () => {
      return {
        padding: 'none',
        size: 'medium',
      }
    },
    textLabels: {
      body: {
        noMatch: 'Извините, подходящих записей не найдено',
        toolTip: 'Сортировка',
        columnHeaderTooltip: column => `Сортировать по ${column.label}`
      },
      pagination: {
        next: 'Следующая',
        previous: 'Предыдущая',
        rowsPerPage: 'Контактов на странице:',
        displayRows: 'из',
      },
      toolbar: {
        search: 'Поиск',
        downloadCsv: 'Скачать CSV',
        print: 'Печать',
        viewColumns: 'Показывать столбцы',
        filterTable: 'Фильтр',
      },
      filter: {
        title: 'Фильтр',
        reset: 'Сброс',
      },
      viewColumns: {
        title: 'Показывать столбцы',
        titleAria: 'Show/Hide Table Columns',
      },
    },
    customToolbarSelect: (selectedRows) => (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: selectedRows.data.length > 0,
        })}
      >
        {selectedRows.data.length > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {selectedRows.data.length + ' ' + declOfNumber(selectedRows.data.length, ['контакт выбран', 'контакта выбрано', 'контактов выбрано'])}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" component="div">
            Мои контакты
          </Typography>
        )}

        {selectedRows.data.length > 0 ? (
          <Tooltip title="Удалить">
            <IconButton
              aria-label="delete"
              onClick={() => deleteContacts(selected)}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (''
        )}
      </Toolbar>
    )


  }

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true)
      await get('/api/contacts').then((response) => {
        setContacts(response.data)
        setLoading(false)
      })
    } catch {
      setLoading(false)
    }
  }, [])

  const deleteContacts = async (selected) => {
    try {
      await remove(`/api/contacts/${selected}`).then((response) => {
        if (response.data.result === 'success') {
          swal('Успешно!', response.data.message, 'success')
        } else if (response.data.result === 'error') {
          swal('Ошибка!', response.data.message, 'error')
        }
      })
      await fetchContacts()
    } catch (error) {
      await swal('Ошибка!', error.messages, 'error')
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  if (loading) {
    return <Loading/>
  }

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={'Список контактов'}
          data={newContacts}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </>
  )
}

export default Contacts
