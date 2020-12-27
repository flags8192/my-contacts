import {Button, CssBaseline} from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'

class PasswordForgot extends Component {

  handleClick = () => {
    window.history.back()
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center">
            There will be a login / password recovery form here someday
          </Typography>
          <Box mt={2}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={this.handleClick}
            >
              Go Back
            </Button>
          </Box>
        </Container>
      </React.Fragment>
    )
  }
}

export default PasswordForgot
