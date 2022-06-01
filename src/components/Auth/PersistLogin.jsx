import { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (accessToken && user) {
      userContext.setIsLoggedIn(true);
      userContext.setToken(accessToken);
      userContext.setUser(user);
    }

    setIsLoading(false);
  }, [userContext]);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
