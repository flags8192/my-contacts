import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Links = React.forwardRef((properties, reference) => (
  <RouterLink ref={reference} {...properties} />
));
