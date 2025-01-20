
import { createContext, useState, useContext } from 'react';

const PreloadContext = createContext();

export const usePreload = () => {
  return useContext(PreloadContext);
};

export const PreloadProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <PreloadContext.Provider value={{ loading, setLoading }}>
      {children}
    </PreloadContext.Provider>
  );
};
