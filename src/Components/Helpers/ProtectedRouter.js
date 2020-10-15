import React from 'react';
import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const ProtectedRouter = (props) => {
  const { login } = useContext(UserContext)

  if (login === true) return <Route {...props} />
  else if (login === false) return <Navigate to="/login" />
  else return null
}

export default ProtectedRouter;