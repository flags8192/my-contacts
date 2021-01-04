import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const isLoggedIn = () => localStorage.getItem('TOKEN_KEY') !== null;

export const SecuredRoute = ({ component: Component }) => (
  <Route
    render={(properties) => {
      if (!isLoggedIn()) {
        return <Redirect to="/login" />;
      }
      return <Component {...properties} />;
    }}
  />
);

SecuredRoute.propTypes = {
  component: PropTypes.elementType,
};
