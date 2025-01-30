// In PreloadContext.jsx
import { createContext, useState, useContext } from 'react';

const PreloadContext = createContext();

export const usePreload = () => {
  return useContext(PreloadContext);
};

const PreloadProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <PreloadContext.Provider value={{ loading, setLoading }}>
      {children}
    </PreloadContext.Provider>
  );
};

export default PreloadProvider;
