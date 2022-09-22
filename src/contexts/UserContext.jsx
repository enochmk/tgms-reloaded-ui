import { createContext, useState } from 'react';

export const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    isLoggedIn,
    user,
    token,
    setIsLoggedIn,
    setUser,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
