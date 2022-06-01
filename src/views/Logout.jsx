import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Logout = () => {
  const userContext = useContext(UserContext);

  if (userContext.isLoggedIn) {
    localStorage.removeItem('token');
    userContext.setToken(null);
    userContext.setUser(null);
    userContext.setLoggedIn(false);
  }

  return <Navigate to="/login" />;
};

export default Logout;
