import { createContext, useState } from 'react';

const initialState = {
  count: {
    unique: 0,
    total: 0,
    winners: 0,
  },
  data: {
    winners: [],
    msisdn: [],
  },
};

export const DrawContext = createContext();

function DrawProvider({ children }) {
  const [statistics, setStatistics] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    ...statistics,
    updateStatistics: setStatistics,
    isLoading,
    setIsLoading,
  };

  return <DrawContext.Provider value={value}>{children}</DrawContext.Provider>;
}

export default DrawProvider;
