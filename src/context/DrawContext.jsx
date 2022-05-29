import { createContext, useState } from 'react';

const initialState = {
  count: {
    unique: 0,
    total: 0,
    winners: 0,
  },
  data: {
    winners: [],
    msisdns: [],
  },
};

export const DrawContext = createContext();

function DrawProvider({ children }) {
  const [statistics, setStatistics] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    isLoading,
    data: statistics.data,
    count: statistics.count,
    setStatistics,
    setIsLoading,
  };

  return <DrawContext.Provider value={value}>{children}</DrawContext.Provider>;
}

export default DrawProvider;
