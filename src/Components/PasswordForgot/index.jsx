import { Button, CssBaseline } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

class PasswordForgot extends React.PureComponent {
  handleClick = () => {
    window.history.back();
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography variant="h4" align="center">
            There will be a login / password forgot form here someday
          </Typography>
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              Go Back
            </Button>
          </Box>
        </Container>
      </>
    );
  }
}

export default PasswordForgot;
