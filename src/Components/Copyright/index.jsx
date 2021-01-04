import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="https://listratenkov.com/">
        https://listratenkov.com
      </Link>
      {' 2016-'}
      {new Date().getFullYear()}
    </Typography>
  );
}
