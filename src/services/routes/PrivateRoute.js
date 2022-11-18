import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import isAuth from '../security/isAuth';

const PrivateRoute = () => {
  return(
    isAuth() ? <Outlet/> : <Navigate to="/login"/>
  )
}
export default PrivateRoute